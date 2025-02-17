import { Tooltip, IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { RequestButtonProps } from "./types/buttons.types";

export function ArchiveButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Закрыть и перенести в архив"}>
      <IconButton onClick={onClick} aria-label={"Закрыть и перенести в архив"}>
        <DoneAllIcon />
      </IconButton>
    </Tooltip>
  );
}
