import { Box, IconButton, Tooltip } from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import LockIcon from "@mui/icons-material/Lock";
import LockOpenIcon from "@mui/icons-material/LockOpen";

import { UserType } from "@mytypes/api/user/user.types";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { blockUserThunk, unblockUserThunk } from "@store/users/users.actions";

interface Props {
  user: UserType;
  editClickHandle: (id: number) => void;
}

export default function Tools({ user, editClickHandle }: Props) {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(userSelector);

  const isVisibleBlockButton = currentUser && currentUser.id !== user.id;

  return (
    <Box sx={{ display: "flex" }}>
      <Tooltip title="Редактировать профиль">
        <IconButton onClick={() => editClickHandle(user.id)}>
          <EditIcon />
        </IconButton>
      </Tooltip>

      {isVisibleBlockButton && (
        <>
          {user.isBlocked ? (
            <Tooltip title="Разблокировать профиль">
              <IconButton onClick={() => dispatch(unblockUserThunk(user.id))}>
                <LockOpenIcon />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Заблокировать профиль">
              <IconButton onClick={() => dispatch(blockUserThunk(user.id))}>
                <LockIcon />
              </IconButton>
            </Tooltip>
          )}
        </>
      )}
    </Box>
  );
}
