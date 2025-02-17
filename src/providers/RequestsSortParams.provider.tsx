import {
  RequestsSortParamsContext,
  SortParamsType,
} from "@contexts/RequestsSortParams.context";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
}

export default function RequestsSortParamsProvider({ children }: Props) {
  const [params, setParams] = useState<SortParamsType>({
    sortId: "desc",
  });

  function resetParams() {
    setParams({
      sortId: "desc",
    });
  }

  function setParam(param: keyof SortParamsType) {
    const currentParam = params[param];

    if (!currentParam) {
      setParams({
        [param]: "desc",
      });

      return;
    }

    if (currentParam === "desc") {
      setParams({
        [param]: "asc",
      });
    } else {
      setParams({
        [param]: "desc",
      });
    }
  }

  return (
    <RequestsSortParamsContext.Provider
      value={{
        resetParams,
        setParam,
        params,
      }}
    >
      {children}
    </RequestsSortParamsContext.Provider>
  );
}
