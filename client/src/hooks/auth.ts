import { useState, useCallback, useEffect } from 'react';

export interface IUseAuth {
  token: string | null;
  userId: string | null;
  loaded: boolean;
  login: (jwtToken: IUseAuth['token'], id: IUseAuth['userId']) => void;
  logout: () => void;
}

export const useAuth = (): IUseAuth => {
  const [token, setToken] = useState<string | null>(null);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [userId, setUserId] = useState<string | null>(null);

  const login = useCallback((jwtToken, id) => {
    setToken(jwtToken);
    setUserId(id);

    localStorage.setItem('userData', JSON.stringify({ token: jwtToken, userId: id }));
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setUserId(null);
    localStorage.removeItem('userData');
  }, []);

  useEffect(() => {
    const storageData = localStorage.getItem('userData');
    if (storageData) {
      const data = JSON.parse(storageData);
      if (data.token) {
        login(data.token, data.userId);
      }
    }
    setLoaded(true);
  }, [login]);

  return {
    token, userId, loaded, login, logout,
  };
};
