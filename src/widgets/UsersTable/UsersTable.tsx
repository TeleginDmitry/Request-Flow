import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EmptyTable from "@components/EmptyTable/EmptyTable";

import { useAppSelector } from "@hooks/useAppSelector";
import {
  isLoadingUsersSelector,
  usersSelector,
} from "@store/users/users.selectors";
import { Loader } from "@components/Loader/Loader";
import { UserRow } from "@widgets/UserRow/UserRow";
import UserSkeleton from "@widgets/skeletons/userSkeleton/UserSkeleton";

export default function UsersTable() {
  const users = useAppSelector(usersSelector);
  const isLoading = useAppSelector(isLoadingUsersSelector);

  return (
    <>
      {!isLoading && !users.length && (
        <EmptyTable title="Пользователи не найдены!" />
      )}

      <TableContainer
        sx={{ boxShadow: "0 0 1px rgba(0, 0, 0, 0.4)", borderRadius: "10px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>id</TableCell>
              <TableCell>ФИО</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Роль</TableCell>
              <TableCell>Отдел</TableCell>
              <TableCell>Создан</TableCell>
            </TableRow>
          </TableHead>
          {!isLoading ? (
            <TableBody>
              {users.map((user) => (
                <UserRow user={user} key={user.id}></UserRow>
              ))}
            </TableBody>
          ) : (
            <>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
              <UserSkeleton></UserSkeleton>
            </>
          )}
        </Table>
        {isLoading && <Loader></Loader>}
      </TableContainer>
    </>
  );
}
