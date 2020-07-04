import { createContext } from 'react';
import { IUseAuth } from '../hooks/auth';

export interface IAuthContext extends IUseAuth {
  isAuthenticated: boolean;
}

export const AuthContext = createContext<IAuthContext>({
  token: null,
  userId: null,
  loaded: false,
  login(token, userId) { },
  logout() { },
  isAuthenticated: false,
});
