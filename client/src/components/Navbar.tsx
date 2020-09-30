import React, { useCallback, useContext } from 'react';
import { Navbar as BPNavbar, Button } from '@blueprintjs/core';
import { NavLink, useHistory } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useFetch } from '../hooks/fetch';
import styles from './Navbar.module.scss';

export const Navbar = (): JSX.Element => {
  const history = useHistory();
  const { doFetch, loading } = useFetch();
  const { isLogged, setIsLogged } = useContext(AuthContext);

  const logout = useCallback(async () => {
    const data = await doFetch('/api/auth/logout', 'POST');
    if (data?.done) {
      setIsLogged(false);
      history.push('/');
    }
  }, [doFetch, setIsLogged, history]);

  return (
    <BPNavbar className={`${styles.navbar} bp3-dark`}>
      <BPNavbar.Group align="left">
        <BPNavbar.Heading>Shortify</BPNavbar.Heading>
        <BPNavbar.Divider />
        <NavLink to="/">
          <Button minimal text="Shortify" />
        </NavLink>
        <NavLink to="/links">
          <Button minimal text="Links" />
        </NavLink>
        <BPNavbar.Divider />
      </BPNavbar.Group>
      <BPNavbar.Group align="right">
        {isLogged ? (
          <Button
            disabled={loading}
            onClick={logout}
            intent="danger"
            icon="log-out"
            text="Logout"
          />
        ) : (
          <NavLink to="/login">
            <Button icon="log-in" intent="success" text="Login" />
          </NavLink>
        )}
      </BPNavbar.Group>
    </BPNavbar>
  );
};
