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
    isLogged, register, login, logout, loading, sessionLoading, error, clearError,
  } = useAuth();
  const routes = useRoutes(isLogged);

  if (sessionLoading) return <Spinner />;

  return (
    <AuthContext.Provider value={{
      register, login, logout, isLogged, loading, sessionLoading, error, clearError,
    }}
    >
      <BrowserRouter>
        {isLogged && <Navbar />}
        <div className={styles.container}>
          {routes}
        </div>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
