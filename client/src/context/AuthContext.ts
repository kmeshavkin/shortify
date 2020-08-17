import { createContext } from "react";

export interface IForm {
  email: string;
  password: string;
}

export interface IAuthContext {
  isLogged: boolean;
  register: (cred: IForm) => Promise<void>;
  login: (cred: IForm) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
  sessionLoading: boolean;
  error: string | null;
  clearError: () => void;
}

export const AuthContext = createContext<IAuthContext>({
  isLogged: false,
  register: async () => {},
  login: async () => {},
  logout: async () => {},
  loading: false,
  sessionLoading: false,
  error: null,
  clearError: () => {},
});
