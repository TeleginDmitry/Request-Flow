import { Tooltip, IconButton } from "@mui/material";
import FactoryIcon from "@mui/icons-material/Factory";
import { RequestButtonProps } from "./types/buttons.types";

export function MaterialsArrivedObjectButton({ onClick }: RequestButtonProps) {
  return (
    <Tooltip title={"Материалы прибыли на объект"}>
      <IconButton onClick={onClick} aria-label={"Материалы прибыли на объект"}>
        <FactoryIcon />
      </IconButton>
    </Tooltip>
  );
}
