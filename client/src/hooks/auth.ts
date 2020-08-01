import { useState, useCallback } from 'react';
import { IAuthContext } from '../context/AuthContext';
import { useFetch } from './fetch';

export const useAuth = (): IAuthContext => {
  const {
    doFetch, loading, error, clearError,
  } = useFetch();

  const [isLogged, setIsLogged] = useState<boolean>(false);

  const register = useCallback(async (cred) => {
    const data = await doFetch('api/register', 'POST', cred);
    if (data?.done) setIsLogged(true);
  }, []);

  const login = useCallback(async (cred) => {
    const data = await doFetch('api/login', 'POST', cred);
    if (data?.done) setIsLogged(true);
  }, []);

  const logout = useCallback(async () => {
    const data = await doFetch('api/logout', 'POST');
    if (data?.done) setIsLogged(false);
  }, []);

  return {
    isLogged, register, login, logout, loading, error, clearError,
  };
};
