import { RootState } from "@store/store";

export const usersSelector = (state: RootState) => state.users.users;
export const isLoadingUsersSelector = (state: RootState) =>
  state.users.isLoading;
