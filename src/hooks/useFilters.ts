import { FiltersConxter } from "@contexts/Filters.context";
import { useContext } from "react";

export function useFilters() {
  return useContext(FiltersConxter);
}
