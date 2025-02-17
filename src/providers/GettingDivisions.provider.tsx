import { useAppDispatch } from "@hooks/useAppDispatch";
import { getDivisionsThunk } from "@store/divisions/divisions.actions";
import { useEffect } from "react";
import { Outlet } from "react-router-dom";

export function GettingDivisionsProvider() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getDivisionsThunk());
  }, []);

  return <Outlet></Outlet>;
}
