import { Tooltip, IconButton } from "@mui/material";
import HistoryIcon from "@mui/icons-material/History";
import { RequestButtonProps } from "./types/buttons.types";

export function HistoryButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"История"}>
      <IconButton
        data-testid="HistoryButton"
        onClick={onClick}
        aria-label={"История"}
      >
        <HistoryIcon />
      </IconButton>
    </Tooltip>
  );
}
