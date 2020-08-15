import { useState, useCallback, useEffect } from "react";
import { IAuthContext } from "../context/AuthContext";
import { useFetch } from "./fetch";

export const useAuth = (): IAuthContext => {
  const { doFetch, loading, error, clearError } = useFetch();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);

  const register = useCallback(async (cred) => {
    const data = await doFetch("api/auth/register", "POST", cred);
    if (data?.done) setIsLogged(true);
  }, []);

  const login = useCallback(async (cred) => {
    const data = await doFetch("api/auth/login", "POST", cred);
    if (data?.done) setIsLogged(true);
  }, []);

  const logout = useCallback(async () => {
    const data = await doFetch("api/auth/logout", "POST");
    if (data?.done) setIsLogged(false);
  }, []);

  useEffect(() => {
    doFetch("api/auth/session", "POST").then((data: any) => {
      if (data?.loggedIn) setIsLogged(true);
      setSessionLoading(false);
    });
  }, []);

  return {
    isLogged,
    register,
    login,
    logout,
    loading,
    sessionLoading,
    error,
    clearError,
  };
};
