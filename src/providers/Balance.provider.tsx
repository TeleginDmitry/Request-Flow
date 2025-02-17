import { BalanceContext } from "@contexts/Balance.context";
import { MaterialType } from "@mytypes/api/material/material.types";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function BalanceProvider({ children }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [materialsState, setMaterialsState] = useState<MaterialType[]>([]);
  const [requestIdState, setRequestIdState] = useState<number | null>(null);

  function toggleOpen() {
    setIsOpen((state) => !state);
  }

  function setMaterials(materials: MaterialType[]) {
    setMaterialsState(materials);
  }

  function changeResidueOfMaterial(residue: number, materialId: number) {
    setMaterialsState((state) =>
      state.map((material) =>
        material.id === materialId ? { ...material, residue } : material
      )
    );
  }

  function resetValues() {
    setMaterialsState([]);
    setRequestIdState(null);
  }

  function setRequestId(requestId: number) {
    setRequestIdState(requestId);
  }

  return (
    <BalanceContext.Provider
      value={{
        isOpen,
        toggleOpen,
        materials: materialsState,
        setMaterials,
        changeResidueOfMaterial,
        requestId: requestIdState,
        setRequestId,
        resetValues,
      }}
    >
      {children}
    </BalanceContext.Provider>
  );
}
