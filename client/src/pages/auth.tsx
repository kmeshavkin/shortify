import React, { useState } from 'react';
import { Button, InputGroup, Label } from '@blueprintjs/core';
import { useFetch } from '../hooks/fetch';

interface IForm {
  username: string,
  password: string
}

export const AuthPage = (): JSX.Element => {
  const { loading, doFetch } = useFetch();
  const [form, setForm] = useState<IForm>({ username: '', password: '' });

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    const data = await doFetch('api/register', 'POST', { ...form });
    console.log('data: ', data);
  };

  return (
    <div>
      <h2>Auth</h2>
      <Label>
        Username
        <InputGroup name="username" type="Username" onChange={changeHandler} />
      </Label>
      <Label>
        Password
        <InputGroup name="password" type="Password" onChange={changeHandler} />
      </Label>
      <Button text="Login" disabled={loading} />
      <Button text="Register" disabled={loading} onClick={registerHandler} />
    </div>
  );
};
