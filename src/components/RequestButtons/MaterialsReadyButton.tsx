import { Tooltip, IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { RequestButtonProps } from "./types/buttons.types";

export function MaterialsReadyButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Материалы готовы к выдаче"}>
      <IconButton onClick={onClick} aria-label={"Материалы готовы к выдаче"}>
        <DoneAllIcon />
      </IconButton>
    </Tooltip>
  );
}
