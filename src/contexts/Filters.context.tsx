import dayjs from "dayjs";
import { createContext } from "react";

export interface FiltersType {
  search: string;
  division_id: string;
  startDate: dayjs.Dayjs | null;
  endDate: dayjs.Dayjs | null;
}

export interface FiltersContextType {
  filters: Partial<FiltersType>;
  setFilters: (filters: Partial<FiltersType>) => void;
  setFilter: <T extends keyof FiltersType>(
    filter: T,
    value: FiltersType[T]
  ) => void;
  resetFilters: () => void;
}

export const FiltersConxter = createContext<FiltersContextType>({
  filters: {},
  setFilters: () => {},
  setFilter: () => {},
  resetFilters: () => {},
});
