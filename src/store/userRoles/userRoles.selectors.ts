import { RootState } from "@store/store";

export const userRolesSelector = (state: RootState) => state.userRoles.roles;
export const isLoadingUserRolesSelector = (state: RootState) =>
  state.userRoles.isLoading;
