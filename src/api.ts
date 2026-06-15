import type {
  ApiResponse,
  AuthSessionUser,
  Breed,
  PasswordLostInput,
  PasswordResetInput,
  Dog,
  DogCreateInput,
  DogMembership,
  DogsListParams,
  DogsUser,
  DogsUserUpdateInput,
  DogUpdateInput,
  Media,
  MediaUploadInput,
  Photo,
  PhotoDetails,
  PhotoListParams,
  PhotoStats,
  Post,
  PostCreateInput,
  PostsListParams,
  PostUpdateInput,
  User,
  UserCreateInput,
} from './types';
import { IS_SUPABASE_CONFIGURED, supabase } from './supabase';
import {
  mockAuthApi,
  mockHealthApi,
  mockPasswordApi,
  mockPhotoApi,
  mockBreedsApi,
  mockDogApi,
  mockDogsAuthApi,
  mockDogsUserApi,
  mockMediaApi,
  mockPostsApi,
  mockStatsApi,
  mockUserApi,
} from './mockApi';

export const API_URL = import.meta.env.VITE_API_URL || 'https://dogsapi.origamid.dev/json';
export const DOGS_API_URL = import.meta.env.VITE_DOGS_API_URL || 'http://localhost:3333';

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
  auth?: boolean;
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

export function getSupabaseAuthErrorMessage(error: unknown): string {
  const fallback = 'Não foi possível concluir a autenticação. Tente novamente.';
  if (!error || typeof error !== 'object') return fallback;

  const message = 'message' in error && typeof error.message === 'string' ? error.message : '';
  const code = 'code' in error && typeof error.code === 'string' ? error.code : '';
  const normalizedError = `${code} ${message}`.toLowerCase();

  if (
    normalizedError.includes('email rate limit') ||
    normalizedError.includes('over_email_send_rate_limit')
  ) {
    return 'O limite temporário de envio de e-mails foi atingido. Aguarde alguns minutos e tente novamente.';
  }

  return message || fallback;
}

function throwSupabaseAuthError(error: unknown): never {
  throw new Error(getSupabaseAuthErrorMessage(error));
}

function resolveUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
}

function resolveDogsUrl(path: string): string {
  if (path.startsWith('http')) return path;
  return `${DOGS_API_URL}${path}`;
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
  if (data && typeof data === 'object' && 'error' in data) {
    const error = data.error;
    if (error && typeof error === 'object' && 'message' in error) {
      const message = error.message;
      if (typeof message === 'string') return message;
    }
  }

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

function createQueryString(params: Record<string, string | number | boolean | undefined>): string {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === '') return;
    searchParams.set(key, String(value));
  });

  const query = searchParams.toString();
  return query ? `?${query}` : '';
}

export async function dogsApiRequest<TData>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<ApiResponse<TData>> {
  const { body, token, headers, auth = false, ...fetchOptions } = options;
  const isFormData = body instanceof FormData;
  const authToken = token ?? (auth ? getStoredToken() : null);
  let response;

  try {
    response = await fetch(resolveDogsUrl(path), {
      ...fetchOptions,
      headers: createHeaders({ body, token: authToken, headers }),
      body: isFormData || typeof body === 'string' ? body : JSON.stringify(body),
    });
  } catch (error) {
    throw new ApiError('Nao foi possivel conectar com a Dogs API. Tente novamente em instantes.', {
      cause: error,
      isNetworkError: true,
    });
  }

  const payload = await parseResponse<{
    data?: TData;
    pagination?: ApiResponse<TData>['pagination'];
  }>(response);

  if (!response.ok) {
    throw new ApiError(getErrorMessage(payload) || 'Erro ao comunicar com a Dogs API.', {
      response,
      data: payload,
    });
  }

  return {
    response,
    data: payload?.data as TData,
    pagination: payload?.pagination,
  };
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
    if (error) throwSupabaseAuthError(error);
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
    if (error) throwSupabaseAuthError(error);
    return createAuthSessionUser(data.session?.access_token || null, data.user);
  },

  getSession: async () => {
    ensureSupabaseConfigured();
    const { data, error } = await supabase.auth.getSession();
    if (error) throwSupabaseAuthError(error);
    return createAuthSessionUser(data.session?.access_token || null, data.session?.user);
  },

  logout: async () => {
    ensureSupabaseConfigured();
    const { error } = await supabase.auth.signOut();
    if (error) throwSupabaseAuthError(error);
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
    if (error) throwSupabaseAuthError(error);
    return {
      response: createOkResponse(),
      data: null,
    };
  },

  reset: async ({ password }: PasswordResetInput) => {
    ensureSupabaseConfigured();
    const { error } = await supabase.auth.updateUser({ password });
    if (error) throwSupabaseAuthError(error);
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

const realDogsAuthApi = {
  me: () =>
    dogsApiRequest<DogsUser>('/v1/auth/me', {
      method: 'GET',
      auth: true,
      cache: 'no-store',
    }),

  sync: () =>
    dogsApiRequest<DogsUser>('/v1/auth/sync', {
      method: 'POST',
      auth: true,
    }),
};

const realDogsUserApi = {
  me: () =>
    dogsApiRequest<DogsUser>('/v1/users/me', {
      method: 'GET',
      auth: true,
      cache: 'no-store',
    }),

  updateMe: (body: DogsUserUpdateInput) =>
    dogsApiRequest<DogsUser>('/v1/users/me', {
      method: 'PATCH',
      auth: true,
      body,
    }),
};

const realBreedsApi = {
  list: () =>
    dogsApiRequest<Breed[]>('/v1/breeds', {
      method: 'GET',
      cache: 'no-store',
    }),

  get: (slug: string) =>
    dogsApiRequest<Breed>(`/v1/breeds/${slug}`, {
      method: 'GET',
      cache: 'no-store',
    }),
};

const realDogApi = {
  list: (params: DogsListParams = {}) =>
    dogsApiRequest<Dog[]>(`/v1/dogs${createQueryString(params)}`, {
      method: 'GET',
      cache: 'no-store',
    }),

  get: (slug: string) =>
    dogsApiRequest<Dog>(`/v1/dogs/${slug}`, {
      method: 'GET',
      cache: 'no-store',
    }),

  create: (body: DogCreateInput) =>
    dogsApiRequest<Dog>('/v1/dogs', {
      method: 'POST',
      auth: true,
      body,
    }),

  update: (dogId: string, body: DogUpdateInput) =>
    dogsApiRequest<Dog>(`/v1/dogs/${dogId}`, {
      method: 'PATCH',
      auth: true,
      body,
    }),

  remove: (dogId: string) =>
    dogsApiRequest<null>(`/v1/dogs/${dogId}`, {
      method: 'DELETE',
      auth: true,
    }),

  members: (dogId: string) =>
    dogsApiRequest<DogMembership[]>(`/v1/dogs/${dogId}/members`, {
      method: 'GET',
      auth: true,
      cache: 'no-store',
    }),
};

const realPostsApi = {
  list: (params: PostsListParams = {}) =>
    dogsApiRequest<Post[]>(`/v1/posts${createQueryString(params)}`, {
      method: 'GET',
      cache: 'no-store',
    }),

  get: (postId: string) =>
    dogsApiRequest<Post>(`/v1/posts/${postId}`, {
      method: 'GET',
      cache: 'no-store',
    }),

  create: (body: PostCreateInput) =>
    dogsApiRequest<Post>('/v1/posts', {
      method: 'POST',
      auth: true,
      body,
    }),

  update: (postId: string, body: PostUpdateInput) =>
    dogsApiRequest<Post>(`/v1/posts/${postId}`, {
      method: 'PATCH',
      auth: true,
      body,
    }),

  remove: (postId: string) =>
    dogsApiRequest<null>(`/v1/posts/${postId}`, {
      method: 'DELETE',
      auth: true,
    }),
};

const realMediaApi = {
  create: ({ postId, file }: MediaUploadInput) => {
    const formData = new FormData();
    formData.append('postId', postId);
    formData.append('file', file);

    return dogsApiRequest<Media>('/v1/media', {
      method: 'POST',
      auth: true,
      body: formData,
    });
  },
};

export const authApi = IS_DEMO_MODE ? mockAuthApi : realAuthApi;
export const userApi = IS_DEMO_MODE ? mockUserApi : realUserApi;
export const passwordApi = IS_DEMO_MODE ? mockPasswordApi : realPasswordApi;
export const photoApi = IS_DEMO_MODE ? mockPhotoApi : realPhotoApi;
export const healthApi = IS_DEMO_MODE ? mockHealthApi : realHealthApi;
export const statsApi = IS_DEMO_MODE ? mockStatsApi : realStatsApi;
export const dogsAuthApi = IS_DEMO_MODE ? mockDogsAuthApi : realDogsAuthApi;
export const dogsUserApi = IS_DEMO_MODE ? mockDogsUserApi : realDogsUserApi;
export const breedsApi = IS_DEMO_MODE ? mockBreedsApi : realBreedsApi;
export const dogApi = IS_DEMO_MODE ? mockDogApi : realDogApi;
export const postsApi = IS_DEMO_MODE ? mockPostsApi : realPostsApi;
export const mediaApi = IS_DEMO_MODE ? mockMediaApi : realMediaApi;
