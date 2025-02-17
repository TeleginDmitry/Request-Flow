import { Tooltip, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { RequestButtonProps } from "./types/buttons.types";

export function EditButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Редактировать запись"}>
      <IconButton onClick={onClick} aria-label={"Редактировать запись"}>
        <EditIcon />
      </IconButton>
    </Tooltip>
  );
}
