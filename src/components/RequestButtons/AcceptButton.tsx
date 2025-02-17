import { Tooltip, IconButton } from "@mui/material";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import { RequestButtonProps } from "./types/buttons.types";

export function AcceptButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Принять в обработку"}>
      <IconButton onClick={onClick} aria-label={"Принять в обработку"}>
        <AppRegistrationIcon />
      </IconButton>
    </Tooltip>
  );
}
