import { Tooltip, IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { RequestButtonProps } from "./types/buttons.types";

export function MaterialTransferredButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Материал выдан/получен"}>
      <IconButton onClick={onClick} aria-label={"Материал выдан/получен"}>
        <DoneAllIcon />
      </IconButton>
    </Tooltip>
  );
}
