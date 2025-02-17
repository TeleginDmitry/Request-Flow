import { Tooltip, IconButton } from "@mui/material";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { RequestButtonProps } from "./types/buttons.types";

export function BalanceButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Указать остатки"}>
      <IconButton onClick={onClick} aria-label={"Указать остатки"}>
        <DoneAllIcon />
      </IconButton>
    </Tooltip>
  );
}
