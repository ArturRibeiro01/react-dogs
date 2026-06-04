import type {
  ApiResponse,
  AuthTokenResponse,
  PasswordLostInput,
  PasswordResetInput,
  Photo,
  PhotoDetails,
  PhotoListParams,
  PhotoStats,
  User,
  UserCreateInput,
} from './types';
import {
  mockAuthApi,
  mockHealthApi,
  mockPasswordApi,
  mockPhotoApi,
  mockStatsApi,
  mockUserApi,
} from './mockApi';

export const API_URL = import.meta.env.VITE_API_URL || 'https://dogsapi.origamid.dev/json';

const TOKEN_KEY = 'token';
export const IS_DEMO_MODE = import.meta.env.VITE_DEMO_MODE === 'true';

type ApiErrorOptions = {
  response?: Response;
  data?: unknown;
  cause?: unknown;
  isNetworkError?: boolean;
};

type JsonBody = Record<string, unknown>;

type ApiRequestOptions = Omit<RequestInit, 'body' | 'headers'> & {
  body?: BodyInit | JsonBody;
  token?: string | null;
  headers?: HeadersInit;
};

export class ApiError extends Error {
  response?: Response;
  data?: unknown;
  cause?: unknown;
  isNetworkError: boolean;

  constructor(
    message: string,
    { response, data, cause, isNetworkError = false }: ApiErrorOptions = {},
  ) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
    this.data = data;
    this.cause = cause;
    this.isNetworkError = isNetworkError;
  }
}

function getStoredToken(): string | null {
  return window.localStorage.getItem(TOKEN_KEY);
}

function setStoredToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token);
}

function removeStoredToken(): void {
  window.localStorage.removeItem(TOKEN_KEY);
}

function resolveUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
}

function createHeaders({
  body,
  token,
  headers,
}: Pick<ApiRequestOptions, 'body' | 'token' | 'headers'>): Headers {
  const requestHeaders = new Headers(headers);

  if (!(body instanceof FormData) && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  return requestHeaders;
}

async function parseResponse<TData>(response: Response): Promise<TData | null> {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) return null;
  return response.json();
}

function getErrorMessage(data: unknown): string | null {
  if (data && typeof data === 'object' && 'message' in data) {
    const message = data.message;
    if (typeof message === 'string') return message;
  }

  return null;
}

export async function apiRequest<TData>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<TData>> {
  const { body, token, headers, ...fetchOptions } = options;
  const isFormData = body instanceof FormData;
  let response;

  try {
    response = await fetch(resolveUrl(path), {
      ...fetchOptions,
      headers: createHeaders({ body, token, headers }),
      body: isFormData || typeof body === 'string' ? body : JSON.stringify(body),
    });
  } catch (error) {
    throw new ApiError('Nao foi possivel conectar com a API. Tente novamente em instantes.', {
      cause: error,
      isNetworkError: true,
    });
  }

  const data = await parseResponse<TData>(response);

  if (!response.ok) {
    throw new ApiError(getErrorMessage(data) || 'Erro ao comunicar com a API.', {
      response,
      data,
    });
  }

  return { response, data: data as TData };
}

export const tokenStorage = {
  get: getStoredToken,
  set: setStoredToken,
  remove: removeStoredToken,
};

const realAuthApi = {
  login: (body: { username: string; password: string }) =>
    apiRequest<AuthTokenResponse>('/jwt-auth/v1/token', {
      method: 'POST',
      body,
    }),

  validateToken: (token: string) =>
    apiRequest<unknown>('/jwt-auth/v1/token/validate', {
      method: 'POST',
      token,
    }),
};

const realUserApi = {
  get: (token: string) =>
    apiRequest<User>('/api/user', {
      method: 'GET',
      token,
    }),

  create: (body: UserCreateInput) =>
    apiRequest<User>('/api/user', {
      method: 'POST',
      body,
    }),
};

const realPasswordApi = {
  lost: (body: PasswordLostInput) =>
    apiRequest<unknown>('/api/password/lost', {
      method: 'POST',
      body,
    }),

  reset: (body: PasswordResetInput) =>
    apiRequest<unknown>('/api/password/reset', {
      method: 'POST',
      body,
    }),
};

const realPhotoApi = {
  create: (formData: FormData, token: string | null) =>
    apiRequest<Photo>('/api/photo', {
      method: 'POST',
      body: formData,
      token,
    }),

  get: (id: number | string) =>
    apiRequest<PhotoDetails>(`/api/photo/${id}`, {
      method: 'GET',
      cache: 'no-store',
    }),

  list: ({ page, total, user }: PhotoListParams) => {
    const params = new URLSearchParams({
      _page: String(page),
      _total: String(total),
      _user: String(user),
    });

    return apiRequest<Photo[]>(`/api/photo/?${params.toString()}`, {
      method: 'GET',
      cache: 'no-store',
    });
  },
};

const realHealthApi = {
  photos: () => realPhotoApi.list({ page: 1, total: 1, user: 0 }),
};

const realStatsApi = {
  list: (token: string | null) =>
    apiRequest<PhotoStats[]>('/api/stats', {
      method: 'GET',
      token,
      cache: 'no-store',
    }),
};

export const authApi = IS_DEMO_MODE ? mockAuthApi : realAuthApi;
export const userApi = IS_DEMO_MODE ? mockUserApi : realUserApi;
export const passwordApi = IS_DEMO_MODE ? mockPasswordApi : realPasswordApi;
export const photoApi = IS_DEMO_MODE ? mockPhotoApi : realPhotoApi;
export const healthApi = IS_DEMO_MODE ? mockHealthApi : realHealthApi;
export const statsApi = IS_DEMO_MODE ? mockStatsApi : realStatsApi;
