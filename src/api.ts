import type {
  ApiResponse,
  AuthSessionUser,
  PasswordLostInput,
  PasswordResetInput,
  Photo,
  PhotoDetails,
  PhotoListParams,
  PhotoStats,
  User,
  UserCreateInput,
} from './types';
import { IS_SUPABASE_CONFIGURED, supabase } from './supabase';
import {
  mockAuthApi,
  mockHealthApi,
  mockPasswordApi,
  mockPhotoApi,
  mockStatsApi,
  mockUserApi,
} from './mockApi';

export const API_URL = import.meta.env.VITE_API_URL || 'https://dogsapi.origamid.dev/json';

const TOKEN_KEY = 'supabase-access-token';
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

function createOkResponse(status = 200): Response {
  return new Response(null, { status });
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

function ensureSupabaseConfigured(): void {
  if (!IS_SUPABASE_CONFIGURED) {
    throw new Error('Configure VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY para autenticar.');
  }
}

function mapSupabaseUser(user: NonNullable<AuthSessionUser['user']>): AuthSessionUser['user'] {
  return user;
}

function createLocalUserFromSupabase(user: {
  id: string;
  email?: string;
  user_metadata?: Record<string, unknown>;
}): NonNullable<AuthSessionUser['user']> {
  const username =
    typeof user.user_metadata?.username === 'string'
      ? user.user_metadata.username
      : user.email?.split('@')[0] || 'usuario';
  const name =
    typeof user.user_metadata?.name === 'string'
      ? user.user_metadata.name
      : typeof user.user_metadata?.nome === 'string'
        ? user.user_metadata.nome
        : username;

  return {
    id: user.id,
    username,
    nome: name,
    email: user.email,
  };
}

function createAuthSessionUser(
  accessToken: string | null,
  user: Parameters<typeof createLocalUserFromSupabase>[0] | null | undefined,
): AuthSessionUser {
  return {
    accessToken,
    user: user ? mapSupabaseUser(createLocalUserFromSupabase(user)) : null,
  };
}

const realAuthApi = {
  login: async ({ email, password }: { email: string; password: string }) => {
    ensureSupabaseConfigured();
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) throw new Error(error.message);
    return createAuthSessionUser(data.session?.access_token || null, data.user);
  },

  signUp: async ({ username, email, password }: UserCreateInput) => {
    ensureSupabaseConfigured();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          username,
          name: username,
        },
      },
    });
    if (error) throw new Error(error.message);
    return createAuthSessionUser(data.session?.access_token || null, data.user);
  },

  getSession: async () => {
    ensureSupabaseConfigured();
    const { data, error } = await supabase.auth.getSession();
    if (error) throw new Error(error.message);
    return createAuthSessionUser(data.session?.access_token || null, data.session?.user);
  },

  logout: async () => {
    ensureSupabaseConfigured();
    const { error } = await supabase.auth.signOut();
    if (error) throw new Error(error.message);
  },

  onAuthStateChange: (callback: (sessionUser: AuthSessionUser) => void) => {
    if (!IS_SUPABASE_CONFIGURED) {
      return { unsubscribe: () => undefined };
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      callback(createAuthSessionUser(session?.access_token || null, session?.user));
    });

    return { unsubscribe: () => subscription.unsubscribe() };
  },
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
  lost: async ({ login, url }: PasswordLostInput) => {
    ensureSupabaseConfigured();
    const { error } = await supabase.auth.resetPasswordForEmail(login, {
      redirectTo: url,
    });
    if (error) throw new Error(error.message);
    return {
      response: createOkResponse(),
      data: null,
    };
  },

  reset: async ({ password }: PasswordResetInput) => {
    ensureSupabaseConfigured();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throw new Error(error.message);
    return {
      response: createOkResponse(),
      data: null,
    };
  },
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
