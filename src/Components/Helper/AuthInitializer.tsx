import { useEffect } from 'react';

import { useAuthStore } from '@/stores/authStore';

const AuthInitializer = () => {
  const autoLogin = useAuthStore((state) => state.autoLogin);
  const subscribeToAuthChanges = useAuthStore((state) => state.subscribeToAuthChanges);

  useEffect(() => {
    autoLogin();
    return subscribeToAuthChanges();
  }, [autoLogin, subscribeToAuthChanges]);

  return null;
};

export default AuthInitializer;
