import React, { useContext } from 'react';
import { Navbar as BPNavbar, Button } from '@blueprintjs/core';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useFetch } from '../hooks/fetch';

export const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const { doFetch } = useFetch();

  const logoutHandler = async () => {
    await doFetch('api/logout', 'POST');
    logout(); // TODO: if this is commented, user still can navigate frontend, though no api methods work
  };

  return (
    <BPNavbar className="bp3-dark">
      <BPNavbar.Group align="left">
        <BPNavbar.Heading>Shortify</BPNavbar.Heading>
        <BPNavbar.Divider />
        <NavLink to="/shortify"><Button minimal text="Shortify" /></NavLink>
        <NavLink to="/links"><Button minimal text="Links" /></NavLink>
        <BPNavbar.Divider />
        <Button onClick={logoutHandler} intent="danger" icon="log-out" />
      </BPNavbar.Group>
    </BPNavbar>
  );
};
