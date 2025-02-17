import { WarehouseContext } from "@contexts/Warehouse.context";
import { WarehouseType } from "@mytypes/api/warehouse/warehouse.types";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}
export function WarehouseProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [warehousesState, setWarehousesState] = useState<WarehouseType[]>([]);

  function toggleOpen() {
    setIsOpen((state) => !state);
  }

  function setWarehouse(warehouse: WarehouseType[]) {
    setWarehousesState(warehouse);
  }

  return (
    <WarehouseContext.Provider
      value={{ isOpen, toggleOpen, setWarehouse, warehouses: warehousesState }}
    >
      {children}
    </WarehouseContext.Provider>
  );
}
