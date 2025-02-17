import { RequestsSortParamsContext } from "@contexts/RequestsSortParams.context";
import { useContext } from "react";

export function useRequestsSortParams() {
  return useContext(RequestsSortParamsContext);
}
