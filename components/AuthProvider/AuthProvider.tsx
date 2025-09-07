'use client';

import { checkSession, getMe } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';
import { useEffect, useState } from 'react';

interface AuthProviderProps {
  children: React.ReactNode;
}

const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const setUser = useAuthStore((state) => state.setUser);
  const clearIsAuthenticated = useAuthStore((state) => state.clearIsAuthenticated);

  useEffect(() => {
    const fetchUser = async () => {
      const IsAuthenticated = await checkSession();

      if (IsAuthenticated) {
        const user = await getMe();
        if (user) {
          setUser(user);
        }
      } else {
        clearIsAuthenticated();
      }
      setIsLoading(false);
    };
    fetchUser();
  }, [setUser, clearIsAuthenticated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return children;
};

export default AuthProvider;
