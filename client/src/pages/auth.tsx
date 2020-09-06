import React, { useState, useEffect, useContext } from 'react';
import { Button, InputGroup, Label, Toaster, Divider } from '@blueprintjs/core';
import styles from './auth.module.scss';
import { AuthContext, IForm } from '../context/AuthContext';
import { useFetch } from '../hooks/fetch';
import { GoogleButton } from '../components/GoogleButton';

export const AuthPage = (): JSX.Element => {
  const { doFetch, loading, error, clearError } = useFetch();
  const { setIsLogged, googleLogin } = useContext(AuthContext);
  const [form, setForm] = useState<IForm>({ email: '', password: '' });
  const [toasterRef, setToasterRef] = useState<Toaster | null>();

  useEffect(() => {
    if (toasterRef && error) {
      toasterRef.show({ message: error, intent: 'danger' });
      clearError();
    }
  }, [clearError, toasterRef, error]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    if (toasterRef) toasterRef.clear();
    await doFetch('/api/auth/register', 'POST', { ...form });
  };

  const loginHandler = async () => {
    if (toasterRef) toasterRef.clear();
    const data = await doFetch('api/auth/login', 'POST', { ...form });
    if (data?.done) setIsLogged(true);
  };

  return (
    <div className={styles.container}>
      <h2>Auth</h2>
      <Label>
        Email
        <InputGroup
          name="email"
          type="email"
          autoFocus
          value={form.email}
          onChange={changeHandler}
        />
      </Label>
      <Label>
        Password
        <InputGroup
          name="password"
          type="password"
          value={form.password}
          onChange={changeHandler}
        />
      </Label>
      <Button text="Login" disabled={loading} onClick={loginHandler} />
      <Button text="Register" disabled={loading} onClick={registerHandler} />
      <Divider />
      Or sign in with...
      <br />
      <GoogleButton href={googleLogin || ''} disabled={loading} />
      <Toaster
        position="top-right"
        maxToasts={1}
        ref={(ref) => setToasterRef(ref)}
      />
    </div>
  );
};
