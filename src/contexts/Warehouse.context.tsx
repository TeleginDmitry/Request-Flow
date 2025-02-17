import { WarehouseType } from "@mytypes/api/warehouse/warehouse.types";
import { createContext } from "react";

type WarehouseContextType = {
  isOpen: boolean;
  warehouses: WarehouseType[];
  setWarehouse: (warehouse: WarehouseType[]) => void;
  toggleOpen: () => void;
};

export const WarehouseContext = createContext<WarehouseContextType>({
  isOpen: false,
  warehouses: [],
  setWarehouse: () => {},
  toggleOpen: () => {},
});
