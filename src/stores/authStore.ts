import { create } from 'zustand';

import { authApi, tokenStorage } from '@/api';
import type { AuthSessionUser, User, UserCreateInput } from '@/types';

type AuthState = {
  data: User | null;
  login: boolean | null;
  loading: boolean;
  error: string | null;
  autoLogin: () => Promise<void>;
  subscribeToAuthChanges: () => () => void;
  clearError: () => void;
  userLogin: (email: string, password: string) => Promise<boolean>;
  userSignup: (body: UserCreateInput) => Promise<boolean>;
  userLogout: () => Promise<void>;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) return error.message;
  return 'Ocorreu um erro inesperado.';
};

function persistSession({ accessToken, user }: AuthSessionUser): void {
  if (accessToken) tokenStorage.set(accessToken);
  else tokenStorage.remove();

  useAuthStore.setState({
    data: user,
    login: Boolean(user && accessToken),
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
      persistSession(sessionUser);
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
      persistSession(sessionUser);
    });

    return subscription.unsubscribe;
  },

  clearError: () => set({ error: null }),

  userLogin: async (email, password) => {
    try {
      set({ error: null, loading: true });
      const sessionUser = await authApi.login({ email, password });
      persistSession(sessionUser);
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

  userSignup: async (body) => {
    try {
      set({ error: null, loading: true });
      const sessionUser = await authApi.signUp(body);
      persistSession(sessionUser);
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
