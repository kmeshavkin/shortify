import { useState, useCallback } from 'react';

export interface IUseAuth {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

export const useAuth = (): IUseAuth => {
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
