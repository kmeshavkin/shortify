import { createContext } from 'react';
import { IUseAuth } from '../hooks/auth';

export const AuthContext = createContext<IUseAuth>({
  isLogged: false,
  login() { },
  logout() { },
});
