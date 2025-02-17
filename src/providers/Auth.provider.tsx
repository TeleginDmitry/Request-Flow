import { useEffect } from "react";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { verifyThunk } from "@store/user/user.actions";

interface Props {
  children: React.ReactNode;
}

function AuthProvider({ children }: Props) {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(verifyThunk());
  }, []);

  return <>{children}</>;
}

export { AuthProvider };
