import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Spinner } from '@blueprintjs/core';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import styles from './App.module.scss';

function App() {
  const {
    token, userId, loaded, login, logout,
  } = useAuth();
  const isAuthenticated = !!token;
  const routes = useRoutes(isAuthenticated);

  if (!loaded) return <Spinner />;

  return (
    <AuthContext.Provider value={{
      token, userId, login, logout, loaded, isAuthenticated,
    }}
    >
      <BrowserRouter>
        {isAuthenticated && <Navbar />}
        <div className={styles.container}>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
