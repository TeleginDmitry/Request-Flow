import { Tooltip, IconButton } from "@mui/material";
import WarehouseIcon from "@mui/icons-material/Warehouse";
import { RequestButtonProps } from "./types/buttons.types";

export function MaterialsArrivedWarehouseButton({
  onClick,
}: RequestButtonProps) {
  return (
    <Tooltip title={"Материалы прибыли на склад"}>
      <IconButton onClick={onClick} aria-label={"Материалы прибыли на склад"}>
        <WarehouseIcon />
      </IconButton>
    </Tooltip>
  );
}
