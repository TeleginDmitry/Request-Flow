import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserSlice from "./user/user.slice";
import UserRolesSlice from "./userRoles/userRoles.slice";
import DivisionsSlice from "./divisions/divisions.slice";
import UsersSlice from "./users/users.slice";
import RequestsSlice from "./requests/requests.slice";

const rootReducer = combineReducers({
  users: UsersSlice,
  user: UserSlice,
  userRoles: UserRolesSlice,
  divisions: DivisionsSlice,
  requests: RequestsSlice,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
