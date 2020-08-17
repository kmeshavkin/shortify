import React, { useCallback, useEffect, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { useFetch } from '../hooks/fetch';
import { AuthContext } from '../context/AuthContext';

export const ApiPage = (): JSX.Element => {
  const location = useLocation();
  const { doFetch, loading } = useFetch();
  const { setIsLogged } = useContext(AuthContext);

  const sendRequest = useCallback(async () => {
    const data = await doFetch(location.pathname + location.search, 'POST');
    // TODO: weird code, redo
    if (location.pathname === '/api/auth/google/redirect' && data?.done)
      setIsLogged(true);
  }, [doFetch, setIsLogged, location.pathname, location.search]);

  // TODO: fix unmount before request finishes:
  // "To fix, cancel all subscriptions and asynchronous tasks in a useEffect cleanup function"
  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (loading) return <Spinner />;
  // TODO: google/redirect redirects to "/" first even if successful
  return <Redirect to="/" />;
};
