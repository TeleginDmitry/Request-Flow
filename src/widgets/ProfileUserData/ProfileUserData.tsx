import * as styles from "./style.module.css";
import Avatar from "@mui/material/Avatar";
import { Button } from "@mui/material";

import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SensorOccupiedIcon from "@mui/icons-material/SensorOccupied";
import NumbersIcon from "@mui/icons-material/Numbers";
import { useNavigate } from "react-router-dom";
import { REQUESTS_PAGE } from "@configs/routes";
import { UserType } from "@mytypes/api/user/user.types";

interface Props {
  user: UserType;
  logout: () => void;
  firstLetters: string;
}

export default function ProfileUserData({ user, logout, firstLetters }: Props) {
  const navigate = useNavigate();

  return (
    <div className={styles.wrapper}>
      <Avatar className={styles.avatar}>{firstLetters}</Avatar>

      <div className={styles.dataSection}>
        <div className={styles.userBlock}>
          <div className={styles.userMainData}>
            <h2 className={styles.userName + " " + styles.title}>
              {user.name}
            </h2>
            <p className={styles.userEmail}>{user.email}</p>
          </div>

          <div className={styles.informBlock}>
            <div className={styles.informItem}>
              <NumbersIcon />
              <p>
                Уникальный идентификатор: <span>{user.id}</span>
              </p>
            </div>
            <div className={styles.informItem}>
              <PeopleAltIcon />
              <p>
                Отдел: <span>{user.division.name}</span>
              </p>
            </div>
            <div className={styles.informItem}>
              <SensorOccupiedIcon />
              <p>
                Роль: <span>{user.role.name}</span>
              </p>
            </div>
          </div>
        </div>

        <div className={styles.rightBlock}>
          <Button onClick={() => navigate(REQUESTS_PAGE)} variant="outlined">
            К заявкам
          </Button>
          <Button onClick={logout} variant="outlined">
            Выйти
          </Button>
        </div>
      </div>
    </div>
  );
}
