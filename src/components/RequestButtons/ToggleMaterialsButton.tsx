import { Tooltip, IconButton } from "@mui/material";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { RequestButtonProps } from "./types/buttons.types";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

interface Props extends RequestButtonProps {
  isOpen: boolean;
}

export function ToggleMaterialsButton({ onClick, isOpen }: Props) {
  return (
    <Tooltip title={"Развернуть список материалов"}>
      <IconButton onClick={onClick} aria-label={"Развернуть список материалов"}>
        {isOpen ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
    </Tooltip>
  );
}
