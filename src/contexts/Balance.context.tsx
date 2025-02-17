import { MaterialType } from "@mytypes/api/material/material.types";
import { createContext } from "react";

interface BalanceContextType {
  materials: MaterialType[];
  setMaterials: (materials: MaterialType[]) => void;
  isOpen: boolean;
  toggleOpen: () => void;
  requestId: number | null;
  changeResidueOfMaterial: (residue: number, materialId: number) => void;
  setRequestId: (requestId: number) => void;
  resetValues: () => void;
}

export const BalanceContext = createContext<BalanceContextType>({
  isOpen: false,
  materials: [],
  requestId: null,
  setMaterials: () => {},
  toggleOpen: () => {},
  changeResidueOfMaterial: () => {},
  resetValues: () => {},
  setRequestId: () => {},
});
