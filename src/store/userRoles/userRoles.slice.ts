import { UserRoleType } from "@mytypes/api/user/user.types";
import { createSlice } from "@reduxjs/toolkit";
import { getUserRolesThunk } from "./userRoles.actions";

interface UserRolesState {
  roles: UserRoleType[];
  isLoading: boolean;
}

const initialState: UserRolesState = {
  roles: [],
  isLoading: false,
};

export const UserRolesSlice = createSlice({
  name: "userRoles",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUserRolesThunk.fulfilled, (state, action) => {
      state.roles = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getUserRolesThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getUserRolesThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export default UserRolesSlice.reducer;
