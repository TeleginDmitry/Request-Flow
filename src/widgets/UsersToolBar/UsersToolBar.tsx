import MainToolbar from "@components/MainToolbar/MainToolbar";
import { Button } from "@mui/material";

interface Props {
  toggleOpen: () => void;
}

export default function UsersToolBar({ toggleOpen }: Props) {
  return (
    <MainToolbar>
      <Button onClick={toggleOpen} variant="outlined">
        Создать пользователя
      </Button>
    </MainToolbar>
  );
}
