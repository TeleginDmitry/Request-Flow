import { Tooltip, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { RequestButtonProps } from "./types/buttons.types";

export function DeleteButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Удалить запись"}>
      <IconButton onClick={onClick} aria-label={"Удалить запись"}>
        <DeleteIcon />
      </IconButton>
    </Tooltip>
  );
}
