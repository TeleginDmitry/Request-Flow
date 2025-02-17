import { RootState } from "@store/store";

export const requestsSelector = (state: RootState) => state.requests.requests;
export const isLoadingRequestsSelector = (state: RootState) =>
  state.requests.isLoading;
