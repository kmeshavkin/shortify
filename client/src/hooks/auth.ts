import { useState, useCallback } from 'react';
import { IAuthContext } from '../context/AuthContext';

export const useAuth = (): IAuthContext => {
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
