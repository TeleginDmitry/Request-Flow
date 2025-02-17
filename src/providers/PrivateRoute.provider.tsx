import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export function PrivateRouteProvider({ children }: Props) {
  const navigate = useNavigate();

  const user = useAppSelector(userSelector);

  useEffect(() => {
    if (!user) return;

    if (!!user.isBlocked) {
      navigate(-1);
    }
  }, [navigate, user]);

  return <>{children}</>;
}
