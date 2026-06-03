import { create } from 'zustand';

import { authApi, tokenStorage, userApi } from '@/api';
import type { User } from '@/types';

type AuthState = {
  data: User | null;
  login: boolean | null;
  loading: boolean;
  error: string | null;
  autoLogin: () => Promise<void>;
  clearError: () => void;
  userLogin: (username: string, password: string) => Promise<boolean>;
  userLogout: () => void;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'Ocorreu um erro inesperado.';
};

async function fetchCurrentUser(token: string): Promise<User> {
  const { data } = await userApi.get(token);
  return data;
}

export const useAuthStore = create<AuthState>((set) => ({
  data: null,
  login: null,
  loading: false,
  error: null,

  autoLogin: async () => {
    const token = tokenStorage.get();
    if (!token) {
      set({ data: null, login: false, loading: false, error: null });
      return;
    }

    try {
      set({ error: null, loading: true });
      await authApi.validateToken(token);
      const data = await fetchCurrentUser(token);
      set({ data, login: true });
    } catch (error) {
      tokenStorage.remove();
      set({
        data: null,
        login: false,
        error: getErrorMessage(error),
      });
    } finally {
      set({ loading: false });
    }
  },

  clearError: () => set({ error: null }),

  userLogin: async (username, password) => {
    try {
      set({ error: null, loading: true });
      const { data: authData } = await authApi.login({ username, password });
      tokenStorage.set(authData.token);
      const data = await fetchCurrentUser(authData.token);
      set({ data, login: true });
      return true;
    } catch (error) {
      set({
        data: null,
        login: false,
        error: getErrorMessage(error),
      });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  userLogout: () => {
    tokenStorage.remove();
    set({
      data: null,
      login: false,
      loading: false,
      error: null,
    });
  },
}));
