import { useAppDispatch } from "@hooks/useAppDispatch";
import { getUserRolesThunk } from "@store/userRoles/userRoles.actions";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function GettingUserRolesProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUserRolesThunk());
  }, []);

  return <Outlet></Outlet>;
}
