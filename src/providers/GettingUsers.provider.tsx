import { useAppDispatch } from "@hooks/useAppDispatch";
import { getUsersThunk } from "@store/users/users.actions";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export default function GettingUsersProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getUsersThunk());
  }, []);

  return <Outlet></Outlet>;
}
