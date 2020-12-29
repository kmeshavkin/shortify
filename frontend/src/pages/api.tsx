import React, { useCallback, useEffect, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { useFetch } from '../hooks/fetch';
import { AuthContext } from '../context/AuthContext';

export const ApiPage = (): JSX.Element => {
  const location = useLocation();
  const { doFetch, abort } = useFetch();
  const { setIsLogged } = useContext(AuthContext);

  const sendRequest = useCallback(async () => {
    const data = await doFetch(location.pathname + location.search, 'POST');
    switch (location.pathname) {
      case '/api/auth/google/redirect':
        if (data.done) setIsLogged(true);
        break;
      default:
        return <Redirect to="/" />;
    }
    return abort;
  }, [doFetch, setIsLogged, location.pathname, location.search, abort]);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  return <Spinner />;
};
