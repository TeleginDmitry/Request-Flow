import { FiltersConxter, FiltersType } from "@contexts/Filters.context";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
}

export function FiltersProvider({ children }: Props) {
  const [filters, setFiltersState] = useState<Partial<FiltersType>>({});

  function setFilters(filters: Partial<FiltersType>) {
    setFiltersState(filters);
  }

  function setFilter<T extends keyof FiltersType>(
    filter: T,
    value: FiltersType[T]
  ) {
    setFilters({ ...filters, [filter]: value });
  }

  function resetFilters() {
    setFiltersState({});
  }

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.forEach((value, key) => {
      setFiltersState((state) => ({ ...state, [key]: value }));
    });
  }, []);

  return (
    <FiltersConxter.Provider
      value={{ setFilters, setFilter, resetFilters, filters }}
    >
      {children}
    </FiltersConxter.Provider>
  );
}
