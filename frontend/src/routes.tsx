import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LinksPage } from './pages/links';
import { ShortifyPage } from './pages/shortify';
import { AuthPage } from './pages/auth';
import { ApiPage } from './pages/api';

export const useRoutes = (isLogged: boolean): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact>
        <ShortifyPage />
      </Route>
      <Route path="/links" exact>
        <LinksPage />
      </Route>
      {!isLogged && (
        <>
          <Route path="/login" exact>
            <AuthPage />
          </Route>
          <Route path="/api">
            <ApiPage />
          </Route>
        </>
      )}
      <Redirect to="/" />
    </Switch>
  );
};
