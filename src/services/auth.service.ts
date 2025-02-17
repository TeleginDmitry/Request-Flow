import { API_URL_LOCAL } from "@configs/api";
import {
  LoginRequestType,
  LoginResponseType,
  RegisterRequestType,
  RegisterResponseType,
} from "./types/auth.types";
import { UserType } from "@mytypes/api/user/user.types";
import { TOKEN } from "@configs/index";

async function login({
  email,
  password,
}: LoginRequestType): Promise<LoginResponseType> {
  return fetch(API_URL_LOCAL + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при входе в систему!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при входе в систему!");
    });
}

async function register({
  name,
  email,
  password,
  role_id,
  division_id,
}: RegisterRequestType): Promise<RegisterResponseType> {
  return fetch(API_URL_LOCAL + "register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password, role_id, division_id }),
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при регистрации!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при регистрации!");
    });
}

async function verify(): Promise<UserType> {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "verify", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Пользователь не авторизован");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Пользователь не авторизован");
    });
}

async function logout() {
  const token = localStorage.getItem(TOKEN);

  if (!token) {
    throw new Error("Отсутствует токен");
  }

  return fetch(API_URL_LOCAL + "logout", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "POST",
    credentials: "include",
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error("Возникла ошибка при выходе из системы!");
      }

      return res.json();
    })
    .catch(() => {
      throw new Error("Возникла ошибка при выходе из системы!");
    });
}

export { login, register, verify, logout };
