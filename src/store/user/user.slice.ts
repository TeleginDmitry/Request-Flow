import { UserType } from "@mytypes/api/user/user.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loginThunk, testFetchUser, verifyThunk } from "./user.actions";

interface UserState {
  user: UserType | null;
  isAuth: boolean;
  isLoading: boolean;
  isVerified: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuth: false,
  isLoading: false,
  isVerified: false,
  error: null,
};

export const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser(state) {
      state.user = null;
      state.isAuth = false;
      state.isLoading = false;
    },
  },

  extraReducers(builder) {
    builder.addCase(
      verifyThunk.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
        state.isVerified = true;
      }
    );

    builder.addCase(verifyThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(verifyThunk.rejected, (state) => {
      state.isLoading = false;
      state.isVerified = true;
    });

    builder.addCase(
      loginThunk.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      }
    );

    builder.addCase(loginThunk.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(loginThunk.rejected, (state, action) => {
      state.isLoading = false;

      state.error = action?.error?.message ?? "Ошибка авторизации";
    });

    // TEST FETCH

    builder.addCase(
      testFetchUser.fulfilled,
      (state, action: PayloadAction<UserType>) => {
        state.user = action.payload;
        state.isAuth = true;
        state.isLoading = false;
      }
    );

    builder.addCase(testFetchUser.pending, (state) => {
      state.isLoading = true;
    });

    builder.addCase(testFetchUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = (action.payload as string) ?? "Failed to fetch user";
    });
  },
});

export const { logoutUser } = UserSlice.actions;

export default UserSlice.reducer;
