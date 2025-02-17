import { RootState } from "@store/store";

export const userSelector = (state: RootState) => state.user.user;
export const isAuthSelector = (state: RootState) => state.user.isAuth;
export const isLoadingUserSelector = (state: RootState) => state.user.isLoading;
export const isVerifiedSelector = (state: RootState) => state.user.isVerified;
export const errorUserSelector = (state: RootState) => state.user.error;
