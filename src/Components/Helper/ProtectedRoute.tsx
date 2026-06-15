import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuthStore } from '@/stores/authStore';

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const login = useAuthStore((state) => state.login);

  if (login === true) return children;
  else if (login === false) return <Navigate to="/login" />;
  else return null;
};

export default ProtectedRoute;
