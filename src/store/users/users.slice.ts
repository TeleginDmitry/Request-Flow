import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  blockUserThunk,
  getUsersThunk,
  unblockUserThunk,
} from "./users.actions";
import { UserType } from "@mytypes/api/user/user.types";

interface UsersState {
  users: UserType[];
  isLoading: boolean;
}

const initialState: UsersState = {
  users: [],
  isLoading: false,
};

export const UsersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUsersThunk.fulfilled, (state, action) => {
      state.users = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUsersThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUsersThunk.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(
      blockUserThunk.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.users = state.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, isBlocked: 1 };
          }
          return user;
        });
      }
    );

    builder.addCase(
      unblockUserThunk.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.users = state.users.map((user) => {
          if (user.id === action.payload) {
            return { ...user, isBlocked: 0 };
          }
          return user;
        });
      }
    );
  },
});

export default UsersSlice.reducer;
