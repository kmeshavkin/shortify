import { createContext } from 'react';

export interface IForm {
  email: string;
  password: string;
}

export interface IAuthContext {
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  sessionLoading: boolean;
  googleLogin?: string;
}

export const AuthContext = createContext<IAuthContext>({
  isLogged: false,
  setIsLogged: () => undefined,
  sessionLoading: false,
});
