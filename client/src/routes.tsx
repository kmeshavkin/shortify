import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LinksPage } from './pages/links';
import { ShortifyPage } from './pages/shortify';
import { AuthPage } from './pages/auth';

export const useRoutes = (isLogged: boolean) => {
  if (isLogged) {
    return (
      <Switch>
        <Route path="/links" exact>
          <LinksPage />
        </Route>
        <Route path="/shortify" exact>
          <ShortifyPage />
        </Route>
        <Redirect to="/shortify" />
      </Switch>
    );
  }

  return (
    <Switch>
      <Route path="/" exact>
        <AuthPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
};
