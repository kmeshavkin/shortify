import React, { useState, useEffect } from 'react';
import {
  Button, InputGroup, Label, Toaster,
} from '@blueprintjs/core';
import styles from './auth.scss';
import { useFetch } from '../hooks/fetch';

interface IForm {
  username: string,
  password: string
}

export const AuthPage = (): JSX.Element => {
  const {
    loading, error, clearError, doFetch,
  } = useFetch();
  const [form, setForm] = useState<IForm>({ username: '', password: '' });
  const [toasterRef, setToasterRef] = useState<Toaster | null>();

  useEffect(() => {
    if (toasterRef && error) {
      toasterRef.show({ message: error, intent: 'danger' });
      clearError();
    }
  }, [error]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    if (toasterRef) toasterRef.clear();
    await doFetch('api/register', 'POST', { ...form });
  };

  const loginHandler = async () => {
    if (toasterRef) toasterRef.clear();
    await doFetch('api/login', 'POST', { ...form });
  };

  return (
    <div className={styles.container}>
      <h2>Auth</h2>
      <Label>
        Username
        <InputGroup name="username" type="Username" onChange={changeHandler} />
      </Label>
      <Label>
        Password
        <InputGroup name="password" type="Password" onChange={changeHandler} />
      </Label>
      <Button text="Login" disabled={loading} onClick={loginHandler} />
      <Button text="Register" disabled={loading} onClick={registerHandler} />
      <Toaster position="top-right" maxToasts={1} ref={(ref) => setToasterRef(ref)} />
    </div>
  );
};
