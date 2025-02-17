import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  blockUserById,
  getUsers,
  unblockUserById,
} from "@services/users.service";

export const getUsersThunk = createAsyncThunk(
  "users/getUsersThunk",
  async (_, { rejectWithValue }) => {
    try {
      const users = await getUsers();
      return users;
    } catch (error) {
      return rejectWithValue("Возникла ошибка при получении пользователей!");
    }
  }
);

export const blockUserThunk = createAsyncThunk(
  "users/blockUserThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      await blockUserById(id);

      return id;
    } catch (error) {
      return rejectWithValue("Возникла ошибка при блокировке пользователя!");
    }
  }
);

export const unblockUserThunk = createAsyncThunk(
  "users/unblockUserThunk",
  async (id: number, { rejectWithValue }) => {
    try {
      await unblockUserById(id);
      return id;
    } catch (error) {
      return rejectWithValue("Возникла ошибка при разблокировке пользователя!");
    }
  }
);
