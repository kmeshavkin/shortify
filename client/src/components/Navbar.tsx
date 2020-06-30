import React, { useContext } from 'react';
import { Navbar as BPNavbar, Button } from '@blueprintjs/core';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export const Navbar = () => {
  const auth = useContext(AuthContext);

  const logoutHandler = () => {
    auth.logout();
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
