import { afterEach, describe, expect, it, vi } from 'vitest';

import { dogsApiRequest, tokenStorage } from './api';

function jsonResponse(body: unknown, status = 200): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

describe('dogsApiRequest', () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    window.localStorage.clear();
  });

  it('unwraps data and pagination from Dogs API responses', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse({
        data: [{ id: 'breed-1', name: 'Golden Retriever', slug: 'golden-retriever' }],
        pagination: {
          page: 1,
          perPage: 12,
          total: 1,
          totalPages: 1,
        },
      }),
    );
    vi.stubGlobal('fetch', fetchMock);

    const result = await dogsApiRequest('/v1/breeds');

    expect(fetchMock.mock.calls[0][0]).toBe('http://localhost:3333/v1/breeds');
    expect(result.data).toEqual([
      { id: 'breed-1', name: 'Golden Retriever', slug: 'golden-retriever' },
    ]);
    expect(result.pagination).toEqual({
      page: 1,
      perPage: 12,
      total: 1,
      totalPages: 1,
    });
  });

  it('sends the stored Supabase token when auth is required', async () => {
    const fetchMock = vi.fn().mockResolvedValue(jsonResponse({ data: { id: 'user-1' } }));
    vi.stubGlobal('fetch', fetchMock);
    tokenStorage.set('supabase-token');

    await dogsApiRequest('/v1/users/me', {
      auth: true,
      method: 'GET',
    });

    const [, requestInit] = fetchMock.mock.calls[0];
    expect(requestInit.headers.get('Authorization')).toBe('Bearer supabase-token');
  });

  it('throws the Dogs API error message', async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      jsonResponse(
        {
          error: {
            code: 'UNAUTHORIZED',
            message: 'Token de autenticação ausente.',
            details: [],
          },
        },
        401,
      ),
    );
    vi.stubGlobal('fetch', fetchMock);

    await expect(dogsApiRequest('/v1/users/me', { auth: true })).rejects.toThrow(
      'Token de autenticação ausente.',
    );
  });
});
