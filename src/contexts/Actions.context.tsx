import { MaterialType } from "@mytypes/api/material/material.types";
import React from "react";

export interface ActionsValues {
  deleteHandle: (requestId: number) => void;
  editHandle: (requestId: number) => void;
  historyHandle: (requestId: number) => void;
  balanceHandle: (materials: MaterialType[], requestId: number) => void;
  archiveHandle: (requestId: number) => void;
  materialsArrivedObjectHandle: (requestId: number) => void;
  materialsArrivedWarehouseHandle: (requestId: number) => void;
  previousStatusHandle: (requestId: number) => void;
  acceptRequestWarehouseHandle: (requestId: number) => void;
  acceptRequestControlHandle: (requestId: number) => void;
  acceptRequestSnabHandle: (requestId: number) => void;
  confirmAndSendToSnab: (requestId: number) => void;
  materialTransferred: (requestId: number) => void;
}

const ActionsContext = React.createContext<ActionsValues | null>(null);
export default ActionsContext;
