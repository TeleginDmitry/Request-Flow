import { Outlet, Navigate, useLocation } from "react-router-dom";
import { AUTH_PAGE } from "@configs/routes";
import Preloader from "@components/Preloader/Preloader";
import Header from "@widgets/Header/Header";
import { isAuthSelector, isVerifiedSelector } from "@store/user/user.selectors";
import { useAppSelector } from "@hooks/useAppSelector";

export default function PrivateRoute() {
  const isAuth = useAppSelector(isAuthSelector);
  const isVerified = useAppSelector(isVerifiedSelector);
  const location = useLocation();

  if (!isVerified) return <Preloader />;

  if (!isAuth)
    return (
      <Navigate state={{ from: location.pathname }} to={AUTH_PAGE} replace />
    );

  return (
    <div data-testid="private-route" style={{ paddingTop: "80px" }}>
      <Header />
      <Outlet></Outlet>
    </div>
  );
}
