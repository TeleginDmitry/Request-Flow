import { Tooltip, IconButton } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { RequestButtonProps } from "./types/buttons.types";

export function PreviousStatusButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Вернуться к предыдущему статусу"}>
      <IconButton
        onClick={onClick}
        aria-label={"Вернуться к предыдущему статусу"}
      >
        <ArrowBackIcon />
      </IconButton>
    </Tooltip>
  );
}
