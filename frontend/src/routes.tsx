import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LinksPage } from './pages/links';
import { ShortifyPage } from './pages/shortify';
import { AuthPage } from './pages/auth';
import { ApiPage } from './pages/api';

export const useRoutes = (isLogged: boolean): JSX.Element => {
  return (
    <Switch>
      <Route path="/" exact component={ShortifyPage} />
      <Route path="/links" exact component={LinksPage} />
      {isLogged && <Redirect to="/" />}
      <Route path="/login" exact component={AuthPage} />
      <Route path="/api" component={ApiPage} />
      <Redirect to="/" />
    </Switch>
  );
};
