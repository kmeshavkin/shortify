import { useState, useEffect } from "react";
import { IAuthContext } from "../context/AuthContext";
import { useFetch } from "./fetch";

export const useAuth = (): IAuthContext => {
  const { doFetch } = useFetch();

  const [isLogged, setIsLogged] = useState<boolean>(false);
  const [sessionLoading, setSessionLoading] = useState<boolean>(true);
  const [googleLogin, setGoogleLogin] = useState<string | undefined>();

  useEffect(() => {
    doFetch("/api/auth/session", "POST").then((data: any) => {
      setIsLogged(data?.loggedIn);
      setGoogleLogin(data?.loginLink);
      setSessionLoading(false);
    });
  }, [doFetch]);

  return { isLogged, setIsLogged, sessionLoading, googleLogin };
};
