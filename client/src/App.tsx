import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import styles from './App.module.scss';

function App() {
  const {
    isLogged, register, login, logout, loading, error, clearError,
  } = useAuth();
  const routes = useRoutes(isLogged);

  return (
    <AuthContext.Provider value={{
      register, login, logout, isLogged, loading, error, clearError,
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
