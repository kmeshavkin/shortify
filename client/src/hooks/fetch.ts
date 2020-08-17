import { useState, useCallback } from 'react';

type requestFunc = (
  url: string,
  method?: RequestInit['method'],
  body?: any,
  headers?: Record<string, string>
) => any; // TODO: fix any?

export interface IUseFetch {
  loading: boolean;
  error: null | string;
  doFetch: requestFunc;
  clearError: () => void;
}

export const useFetch = (): IUseFetch => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<null | string>(null);

  const doFetch: requestFunc = useCallback(
    async (url, method = 'GET', body, headers = {}) => {
      setLoading(true);
      try {
        const response = await fetch(url, {
          method,
          headers: body
            ? { ...headers, 'Content-Type': 'application/json' }
            : headers,
          body: body ? JSON.stringify(body) : null,
        });
        const data = await response.json();

        // TODO: message shows overall error, but for register it should be destructured
        if (!response.ok)
          throw new Error(data.message || 'Something went wrong');

        setLoading(false);
        return data;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        return null;
      }
    },
    []
  );

  const clearError = () => setError(null);

  return {
    loading,
    error,
    doFetch,
    clearError,
  };
};
