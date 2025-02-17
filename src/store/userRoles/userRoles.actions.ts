import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserRoles } from "@services/users.service";

export const getUserRolesThunk = createAsyncThunk(
  "userRoles/getUserRolesThunk",
  async () => {
    try {
      const roles = await getUserRoles();
      return roles;
    } catch (error) {
      throw new Error("Возникла ошибка при получении ролей");
    }
  },
);
