import { useState } from "react";
import * as styles from "./style.module.css";

import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Tooltip } from "@mui/material";

import AdvancedSearch from "./AdvancedSearch/AdvancedSearch";
import { useNavigate } from "react-router-dom";

import { SEARCH_PAGE } from "@configs/routes";

import { Backdoor } from "@components/Backdoor/Backdoor";
import { useFilters } from "@hooks/useFilters";
import { getFullDateByStr } from "@utils/helpers/timeFunctions";

export default function SearchPanel() {
  const navigate = useNavigate();

  const { filters, setFilter } = useFilters();

  const [isOpen, setIsOpen] = useState(false);

  function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const searchParams = new URLSearchParams();

    if (filters.search) {
      searchParams.set("search", filters.search);
    }

    if (filters.division_id) {
      searchParams.set("division_id", filters.division_id);
    }

    if (filters.startDate) {
      searchParams.set(
        "startDate",
        getFullDateByStr(filters.startDate.format("YYYY-MM-DD"))
      );
    }

    if (filters.endDate) {
      searchParams.set(
        "endDate",
        getFullDateByStr(filters.endDate.format("YYYY-MM-DD"))
      );
    }

    navigate(`${SEARCH_PAGE}?${searchParams.toString()}`);
  }

  return (
    <form onSubmit={onSubmit} className={styles.searchPanel}>
      <input
        className={styles.searchInput}
        value={filters.search ?? ""}
        name="searchValue"
        onChange={(e) => setFilter("search", e.target.value)}
        placeholder="Начните искать..."
      />

      <Tooltip title="Найти">
        <IconButton type="submit" sx={{ color: "#fff" }}>
          <SearchIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>

      <Tooltip title="Расширенный поиск">
        <IconButton onClick={() => setIsOpen(true)} sx={{ color: "#fff" }}>
          <MoreVertIcon sx={{ fontSize: 20 }} />
        </IconButton>
      </Tooltip>

      {isOpen && (
        <>
          <AdvancedSearch />
          <Backdoor onClick={() => setIsOpen(false)}></Backdoor>
        </>
      )}
    </form>
  );
}
