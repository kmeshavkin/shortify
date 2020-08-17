import React, { useState, useEffect, useContext } from "react";
import { Button, InputGroup, Label, Toaster } from "@blueprintjs/core";
import styles from "./auth.module.scss";
import { AuthContext, IForm } from "../context/AuthContext";

export const AuthPage = (): JSX.Element => {
  const [form, setForm] = useState<IForm>({ email: "", password: "" });
  const [toasterRef, setToasterRef] = useState<Toaster | null>();

  useEffect(() => {
    if (toasterRef && error) {
      toasterRef.show({ message: error, intent: "danger" });
      clearError();
    }
  }, [clearError, toasterRef, error]);

  const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const registerHandler = async () => {
    if (toasterRef) toasterRef.clear();
    register({ ...form });
  };

  const loginHandler = async () => {
    if (toasterRef) toasterRef.clear();
    login({ ...form });
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
      <Toaster
        position="top-right"
        maxToasts={1}
        ref={(ref) => setToasterRef(ref)}
      />
    </div>
  );
};
