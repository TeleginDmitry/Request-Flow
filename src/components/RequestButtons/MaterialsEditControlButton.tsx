import { Tooltip, IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { RequestButtonProps } from "./types/buttons.types";

export function MaterialsEditControlButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Подтвердить и отправить снабжению"}>
      <IconButton
        onClick={onClick}
        aria-label={"Подтвердить и отправить снабжению"}
      >
        <DoneAllIcon />
      </IconButton>
    </Tooltip>
  );
}
