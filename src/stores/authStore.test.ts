import { beforeEach, describe, expect, it, vi } from 'vitest';

import { authApi, dogsAuthApi, dogsUserApi, tokenStorage } from '@/api';

import { useAuthStore } from './authStore';

vi.mock('@/api', () => ({
  authApi: {
    getSession: vi.fn(),
    login: vi.fn(),
    signUp: vi.fn(),
    logout: vi.fn(),
    onAuthStateChange: vi.fn(() => ({ unsubscribe: vi.fn() })),
  },
  dogsAuthApi: {
    sync: vi.fn(),
  },
  dogsUserApi: {
    me: vi.fn(),
    updateMe: vi.fn(),
  },
  tokenStorage: {
    get: vi.fn(),
    set: vi.fn(),
    remove: vi.fn(),
  },
}));

const mockedAuthApi = vi.mocked(authApi);
const mockedDogsAuthApi = vi.mocked(dogsAuthApi);
const mockedDogsUserApi = vi.mocked(dogsUserApi);
const mockedTokenStorage = vi.mocked(tokenStorage);

const dogsUser = {
  id: 'dogs-user-id',
  username: 'demo',
  name: 'Demo',
  email: 'demo@dogs.local',
};

describe('authStore', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    useAuthStore.setState({
      data: null,
      login: null,
      loading: false,
      error: null,
    });
  });

  it('syncs the Dogs API profile after Supabase login', async () => {
    mockedAuthApi.login.mockResolvedValue({
      accessToken: 'supabase-token',
      user: {
        id: 'supabase-user-id',
        username: 'demo',
        email: 'demo@dogs.local',
      },
    });
    mockedDogsAuthApi.sync.mockResolvedValue({
      response: new Response(null, { status: 200 }),
      data: dogsUser,
    });
    mockedDogsUserApi.me.mockResolvedValue({
      response: new Response(null, { status: 200 }),
      data: dogsUser,
    });

    const success = await useAuthStore.getState().userLogin('demo@dogs.local', 'Demo1234');

    expect(success).toBe(true);
    expect(mockedTokenStorage.set).toHaveBeenCalledWith('supabase-token');
    expect(mockedDogsAuthApi.sync).toHaveBeenCalledTimes(1);
    expect(mockedDogsUserApi.me).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().data).toEqual(dogsUser);
    expect(useAuthStore.getState().login).toBe(true);
  });

  it('clears auth state when Dogs API profile sync fails', async () => {
    mockedAuthApi.login.mockResolvedValue({
      accessToken: 'supabase-token',
      user: {
        id: 'supabase-user-id',
        username: 'demo',
        email: 'demo@dogs.local',
      },
    });
    mockedDogsAuthApi.sync.mockRejectedValue(new Error('Falha ao sincronizar perfil.'));

    const success = await useAuthStore.getState().userLogin('demo@dogs.local', 'Demo1234');

    expect(success).toBe(false);
    expect(mockedTokenStorage.remove).toHaveBeenCalledTimes(1);
    expect(useAuthStore.getState().data).toBeNull();
    expect(useAuthStore.getState().login).toBe(false);
    expect(useAuthStore.getState().error).toBe('Falha ao sincronizar perfil.');
  });
});
