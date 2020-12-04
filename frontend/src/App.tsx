import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import styles from './App.module.scss';

function App(): JSX.Element {
  const auth = useAuth();
  const routes = useRoutes(auth.isLogged);

  if (auth.sessionLoading) return <Spinner />;

  return (
    <AuthContext.Provider value={auth}>
      <BrowserRouter>
        <Navbar />
        <div className={styles.container}>{routes}</div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
