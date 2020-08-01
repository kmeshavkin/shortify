import { createContext } from 'react';

export interface IAuthContext {
  isLogged: boolean;
  login: () => void;
  logout: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLogged: false,
  login() { },
  logout() { },
});
