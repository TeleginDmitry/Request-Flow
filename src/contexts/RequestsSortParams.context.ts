import { createContext } from "react";

export interface SortParamsType {
  sortId?: string;
  sortDivision?: string;
  sortUserId?: string;
  sortText?: string;
  sortCreatedAt?: string;
  sortStatusId?: string;
}

interface SortParamsContextType {
  params: SortParamsType;
  setParam: (param: keyof SortParamsType) => void;
  resetParams: () => void;
}

export const RequestsSortParamsContext = createContext<SortParamsContextType>({
  params: {
    sortId: "desc",
  },
  setParam: () => {},
  resetParams: () => {},
});
