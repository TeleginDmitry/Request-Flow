import { TOKEN } from "@configs/index";
import { UserType } from "@mytypes/api/user/user.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, verify } from "@services/auth.service";
import { LoginRequestType } from "@services/types/auth.types";

export const verifyThunk = createAsyncThunk<UserType, void>(
  "user/verifyThunk",
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem(TOKEN);

    if (!token) return rejectWithValue("Отсутствует токен");

    try {
      const user = await verify();

      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`Ошибка верификации: ${error.message}`);
      }

      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

export const loginThunk = createAsyncThunk<UserType, LoginRequestType>(
  "user/loginThunk",
  async ({ password, email }, { rejectWithValue }) => {
    try {
      const { user, token } = await login({
        password,
        email,
      });

      localStorage.setItem(TOKEN, token);

      return user;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`Ошибка авторизации: ${error.message}`);
      }

      return rejectWithValue("Неизвестная ошибка");
    }
  }
);

// TEST THUNK
export const testFetchUser = createAsyncThunk<UserType, void>(
  "user/testFetchUser",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users/1"
      );

      if (!response.ok) {
        return rejectWithValue("Failed to fetch user");
      }

      const data = await response.json();
      return data;
    } catch (error: unknown) {
      if (error instanceof Error) {
        return rejectWithValue(`Ошибка авторизации: ${error.message}`);
      }

      return rejectWithValue("Неизвестная ошибка");
    }
  }
);
