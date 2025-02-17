import { UserType } from "@mytypes/api/user/user.types";
import PasswordShowHide from "@components/PasswordShowHide/PasswordShowHide";
import * as styles from "./style.module.css";

import { getFullDateByStrFromDb } from "@utils/helpers/timeFunctions.js";
import { useNavigate } from "react-router-dom";
import { USERS_PAGE } from "@configs/routes";

import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Tools from "@widgets/UsersTable/Tools/Tools";

interface Props {
  user: UserType;
}

export function UserRow({ user }: Props) {
  const navigate = useNavigate();
  const editClickHandle = (userId: number) =>
    navigate(USERS_PAGE + "/" + userId);

  return (
    <TableRow key={user.id} className={styles.itemRow}>
      <TableCell>
        <div className={styles.itemTools}>
          <Tools user={user} editClickHandle={editClickHandle} />
        </div>
      </TableCell>
      <TableCell>{user.id}</TableCell>
      <TableCell>{user.name}</TableCell>
      <TableCell>{user.email}</TableCell>
      <TableCell>{user.role.name}</TableCell>
      <TableCell>{user.division.name}</TableCell>
      <TableCell>{getFullDateByStrFromDb(user.created_at)}</TableCell>
    </TableRow>
  );
}
