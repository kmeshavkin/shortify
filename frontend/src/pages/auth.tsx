import React, { useState, useEffect, useContext } from 'react';
import { Button, InputGroup, Toaster, Divider } from '@blueprintjs/core';
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
    if (data.done) setIsLogged(true);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.header}>Login or register</h2>
      <div className={styles.topContainer}>
        <p className={styles.label}>Email</p>
        <InputGroup
          className={styles.button}
          name="email"
          type="email"
          autoFocus
          value={form.email}
          onChange={changeHandler}
        />
        <p className={styles.label}>Password</p>
        <InputGroup
          className={styles.button}
          name="password"
          type="password"
          value={form.password}
          onChange={changeHandler}
        />
        <Button
          className={styles.loginButton}
          text="Login"
          disabled={loading}
          onClick={loginHandler}
          intent="success"
        />
        <Button
          className={styles.registerButton}
          text="Register"
          disabled={loading}
          onClick={registerHandler}
        />
      </div>
      <Divider />
      <div className={styles.bottomContainer}>
        <p className={styles.orSignWith}>Or sign in with...</p>
        <GoogleButton href={googleLogin || ''} disabled={loading} />
        <Toaster
          position="top-right"
          maxToasts={1}
          ref={(ref) => setToasterRef(ref)}
        />
      </div>
    </div>
  );
};
