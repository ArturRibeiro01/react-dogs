import React from 'react';

import { useAuthStore } from '@/stores/authStore';

const AuthInitializer = () => {
  const autoLogin = useAuthStore((state) => state.autoLogin);

  React.useEffect(() => {
    autoLogin();
  }, [autoLogin]);

  return null;
};

export default AuthInitializer;
