import React from 'react';

import { useAuthStore } from '@/stores/authStore';

const AuthInitializer = () => {
  const autoLogin = useAuthStore((state) => state.autoLogin);
  const subscribeToAuthChanges = useAuthStore((state) => state.subscribeToAuthChanges);

  React.useEffect(() => {
    autoLogin();
    return subscribeToAuthChanges();
  }, [autoLogin, subscribeToAuthChanges]);

  return null;
};

export default AuthInitializer;
