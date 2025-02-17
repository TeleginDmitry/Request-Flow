import { useState } from "react";
import * as styles from "./style.module.css";

import { Button } from "@mui/material";
import { TextField, Typography } from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import AboutSupplyText from "@components/AboutSupplyText/AboutSupplyText";
import { LoginRequestType } from "@services/types/auth.types";

interface Props {
  onSignIn: (data: LoginRequestType) => void;
}

export default function SignInForm({ onSignIn }: Props) {
  const [fields, setFields] = useState<LoginRequestType>({
    email: "",
    password: "",
  });

  const onSubmitHandle = (e: React.FormEvent) => {
    e.preventDefault();
    onSignIn(fields);
  };

  function onChangeEmail(value: string) {
    setFields((state) => ({
      ...state,
      email: value,
    }));
  }

  function onChangePassword(value: string) {
    setFields((state) => ({
      ...state,
      password: value,
    }));
  }

  return (
    <div data-testid="sign-in-form" className={styles.formWrapper}>
      <form onSubmit={onSubmitHandle} className={styles.form}>
        <LockOpenIcon className={styles.icon} />
        <Typography className={styles.title} variant="h5" component="h5">
          Вход
        </Typography>

        <TextField
          onChange={(e) => onChangeEmail(e.target.value)}
          value={fields.email}
          label="E-mail"
          type="email"
          required
          slotProps={{ htmlInput: { "data-testid": "email-input" } }}
        />

        <TextField
          onChange={(e) => onChangePassword(e.target.value)}
          value={fields.password}
          label="Пароль"
          type="password"
          required
          slotProps={{ htmlInput: { "data-testid": "password-input" } }}
        />

        <Button data-testid="sign-in-button" type="submit" variant="contained">
          Войти
        </Button>
        <AboutSupplyText />
      </form>
    </div>
  );
}
