import { useState, useCallback } from 'react';
import { IAuthContext } from '../context/AuthContext';

export const useAuth = (): IAuthContext => {
  // TODO: currently it doesn't work like session because it's always false after page refresh
  const [isLogged, setIsLogged] = useState<boolean>(false);

  const login = useCallback(() => {
    setIsLogged(true);
  }, []);

  const logout = useCallback(() => {
    setIsLogged(false);
  }, []);

  return {
    isLogged, login, logout,
  };
};
