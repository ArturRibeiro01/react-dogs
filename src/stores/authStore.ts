import { create } from 'zustand';

import { authApi, dogsAuthApi, dogsUserApi, tokenStorage } from '@/api';
import type { AuthSessionUser, DogsUser, DogsUserUpdateInput, UserCreateInput } from '@/types';

type AuthState = {
  data: DogsUser | null;
  login: boolean | null;
  loading: boolean;
  error: string | null;
  autoLogin: () => Promise<void>;
  subscribeToAuthChanges: () => () => void;
  clearError: () => void;
  userLogin: (email: string, password: string) => Promise<boolean>;
  userSignup: (body: UserCreateInput) => Promise<boolean>;
  updateProfile: (body: DogsUserUpdateInput) => Promise<boolean>;
  userLogout: () => Promise<void>;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'Ocorreu um erro inesperado.';
};

async function syncDogsUser({ accessToken, user }: AuthSessionUser): Promise<DogsUser | null> {
  if (!accessToken || !user) {
    tokenStorage.remove();
    return null;
  }

  tokenStorage.set(accessToken);
  await dogsAuthApi.sync();
  const { data } = await dogsUserApi.me();
  return data;
}

async function persistSession(sessionUser: AuthSessionUser): Promise<void> {
  const profile = await syncDogsUser(sessionUser);

  useAuthStore.setState({
    data: profile,
    login: Boolean(profile),
  });
}

export const useAuthStore = create<AuthState>((set) => ({
  data: null,
  login: null,
  loading: false,
  error: null,

  autoLogin: async () => {
    try {
      set({ error: null, loading: true });
      const sessionUser = await authApi.getSession();
      await persistSession(sessionUser);
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

  subscribeToAuthChanges: () => {
    const subscription = authApi.onAuthStateChange((sessionUser) => {
      persistSession(sessionUser).catch((error) => {
        tokenStorage.remove();
        useAuthStore.setState({
          data: null,
          login: false,
          loading: false,
          error: getErrorMessage(error),
        });
      });
    });

    return subscription.unsubscribe;
  },

  clearError: () => set({ error: null }),

  userLogin: async (email, password) => {
    try {
      set({ error: null, loading: true });
      const sessionUser = await authApi.login({ email, password });
      await persistSession(sessionUser);
      return true;
    } catch (error) {
      tokenStorage.remove();
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

  userSignup: async (body) => {
    try {
      set({ error: null, loading: true });
      const sessionUser = await authApi.signUp(body);
      await persistSession(sessionUser);
      return true;
    } catch (error) {
      tokenStorage.remove();
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

  updateProfile: async (body) => {
    try {
      set({ error: null, loading: true });
      const { data } = await dogsUserApi.updateMe(body);
      set({ data, login: true });
      return true;
    } catch (error) {
      set({ error: getErrorMessage(error) });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  userLogout: async () => {
    try {
      set({ loading: true });
      await authApi.logout();
    } finally {
      tokenStorage.remove();
      set({
        data: null,
        login: false,
        loading: false,
        error: null,
      });
    }
  },
}));
