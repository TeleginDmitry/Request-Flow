import { RootState } from "@store/store";

export const divisionsSelector = (state: RootState) =>
  state.divisions.divisions;
export const isLoadingDivisionsSelector = (state: RootState) =>
  state.divisions.isLoading;
