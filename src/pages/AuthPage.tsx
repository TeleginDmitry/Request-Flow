import { useLocation, useNavigate } from "react-router-dom";
import { Container } from "@mui/material";
import SignInForm from "@widgets/SignInForm/SignInForm";
import { REQUESTS_PAGE } from "@configs/routes";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { loginThunk } from "@store/user/user.actions";
import { LoginRequestType } from "@services/types/auth.types";
import { isAuthSelector, isVerifiedSelector } from "@store/user/user.selectors";
import { useAppSelector } from "@hooks/useAppSelector";
import { useEffect } from "react";

export function AuthPage() {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state;

  const isVerified = useAppSelector(isVerifiedSelector);
  const isAuth = useAppSelector(isAuthSelector);

  const onSignIn = async (data: LoginRequestType) => {
    await dispatch(loginThunk(data));
  };

  useEffect(() => {
    if (!isVerified) return;

    if (!isAuth) return;

    if (state && state.from) {
      navigate(state.from, { replace: true });
      return;
    }
    navigate(REQUESTS_PAGE);
  }, [state, isAuth, isVerified]);

  return (
    <Container>
      <SignInForm onSignIn={onSignIn} />
    </Container>
  );
}
