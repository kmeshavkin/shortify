import React, { useCallback, useContext } from 'react';
import { Navbar as BPNavbar, Button } from '@blueprintjs/core';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useFetch } from '../hooks/fetch';

export const Navbar = (): JSX.Element => {
  const { doFetch, loading } = useFetch();
  const { setIsLogged } = useContext(AuthContext);

  const logout = useCallback(async () => {
    const data = await doFetch('/api/auth/logout', 'POST');
    if (data?.done) setIsLogged(false);
  }, [doFetch, setIsLogged]);

  return (
    <BPNavbar className="bp3-dark">
      <BPNavbar.Group align="left">
        <BPNavbar.Heading>Shortify</BPNavbar.Heading>
        <BPNavbar.Divider />
        <NavLink to="/shortify">
          <Button minimal text="Shortify" />
        </NavLink>
        <NavLink to="/links">
          <Button minimal text="Links" />
        </NavLink>
        <BPNavbar.Divider />
        <Button
          disabled={loading}
          onClick={logout}
          intent="danger"
          icon="log-out"
        />
      </BPNavbar.Group>
    </BPNavbar>
  );
};
