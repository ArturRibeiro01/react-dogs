export const API_URL =
  import.meta.env.VITE_API_URL || 'https://dogsapi.origamid.dev/json';

const TOKEN_KEY = 'token';

export class ApiError extends Error {
  constructor(message, { response, data } = {}) {
    super(message);
    this.name = 'ApiError';
    this.response = response;
    this.data = data;
  }
}

function getStoredToken() {
  return window.localStorage.getItem(TOKEN_KEY);
}

function setStoredToken(token) {
  window.localStorage.setItem(TOKEN_KEY, token);
}

function removeStoredToken() {
  window.localStorage.removeItem(TOKEN_KEY);
}

function resolveUrl(path) {
  if (path.startsWith('http')) return path;
  return `${API_URL}${path}`;
}

function createHeaders({ body, token, headers }) {
  const requestHeaders = new Headers(headers);

  if (!(body instanceof FormData) && !requestHeaders.has('Content-Type')) {
    requestHeaders.set('Content-Type', 'application/json');
  }

  if (token) {
    requestHeaders.set('Authorization', `Bearer ${token}`);
  }

  return requestHeaders;
}

async function parseResponse(response) {
  const contentType = response.headers.get('content-type');
  if (!contentType || !contentType.includes('application/json')) return null;
  return response.json();
}

export async function apiRequest(path, options = {}) {
  const { body, token, headers, ...fetchOptions } = options;
  const isFormData = body instanceof FormData;

  const response = await fetch(resolveUrl(path), {
    ...fetchOptions,
    headers: createHeaders({ body, token, headers }),
    body: isFormData || typeof body === 'string' ? body : JSON.stringify(body),
  });

  const data = await parseResponse(response);

  if (!response.ok) {
    throw new ApiError(data?.message || 'Erro ao comunicar com a API.', {
      response,
      data,
    });
  }

  return { response, data };
}

export const tokenStorage = {
  get: getStoredToken,
  set: setStoredToken,
  remove: removeStoredToken,
};

export const authApi = {
  login: (body) =>
    apiRequest('/jwt-auth/v1/token', {
      method: 'POST',
      body,
    }),

  validateToken: (token) =>
    apiRequest('/jwt-auth/v1/token/validate', {
      method: 'POST',
      token,
    }),
};

export const userApi = {
  get: (token) =>
    apiRequest('/api/user', {
      method: 'GET',
      token,
    }),

  create: (body) =>
    apiRequest('/api/user', {
      method: 'POST',
      body,
    }),
};

export const photoApi = {
  create: (formData, token) =>
    apiRequest('/api/photo', {
      method: 'POST',
      body: formData,
      token,
    }),

  list: ({ page, total, user }) => {
    const params = new URLSearchParams({
      _page: page,
      _total: total,
      _user: user,
    });

    return apiRequest(`/api/photo/?${params.toString()}`, {
      method: 'GET',
      cache: 'no-store',
    });
  },
};

export const healthApi = {
  photos: () => photoApi.list({ page: 1, total: 1, user: 0 }),
};
