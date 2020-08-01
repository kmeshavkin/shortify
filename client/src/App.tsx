import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useRoutes } from './routes';
import { useAuth } from './hooks/auth';
import { AuthContext } from './context/AuthContext';
import { Navbar } from './components/Navbar';
import styles from './App.module.scss';

function App() {
  const {
    isLogged, login, logout,
  } = useAuth();
  const routes = useRoutes(isLogged);

  return (
    <AuthContext.Provider value={{
      login, logout, isLogged,
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
