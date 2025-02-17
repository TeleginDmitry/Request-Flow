import * as styles from "./style.module.css";

import Avatar from "@mui/material/Avatar";
import { Button, Typography, Tooltip } from "@mui/material";
import { PROFILE_PAGE } from "@configs/routes";
import { useNavigate } from "react-router-dom";
import { userSelector } from "@store/user/user.selectors";
import { useAppSelector } from "@hooks/useAppSelector";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { logoutUser } from "@store/user/user.slice";

interface Props {
  firstLetters: string;
}

export default function AccountWindow({ firstLetters }: Props) {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const user = useAppSelector(userSelector);

  const logout = () => {
    dispatch(logoutUser());
  };

  if (!user) return null;

  return (
    <div className={styles.accountDataWrapper}>
      <div className={styles.accountData}>
        <Tooltip title="Ваш отдел">
          <p className={styles.userDivision}>{user.division.name}</p>
        </Tooltip>

        <Avatar
          sx={{ background: "#ff6600", fontSize: 24, width: 55, height: 55 }}
        >
          {firstLetters}
        </Avatar>

        <Typography className={styles.userName} variant="body1" component="p">
          {user.name}
        </Typography>

        <p className={styles.userEmail}>{user.email}</p>

        <Tooltip title="Ваша роль" placement="right">
          <p className={styles.userRole}>{user.role.name}</p>
        </Tooltip>

        <div className={styles.buttonsWrapper}>
          <Button onClick={() => navigate(PROFILE_PAGE)} variant="outlined">
            Открыть профиль
          </Button>
          <Button onClick={logout} variant="outlined">
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}
