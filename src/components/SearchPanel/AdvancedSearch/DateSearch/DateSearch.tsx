import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import * as styles from "./style.module.css";

import { Typography } from "@mui/material";
import { useFilters } from "@hooks/useFilters";

export default function DateSearch() {
  const { filters, setFilter } = useFilters();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <Typography className={styles.title} variant="body1" component="p">
          Поиск по дате:
        </Typography>
        <div className={styles.wrapper}>
          <DatePicker
            format="DD/MM/YY"
            value={filters.startDate}
            onChange={(date) => setFilter("startDate", date)}
          />
          <p className="mx-[5px]">—</p>
          <DatePicker
            format="DD/MM/YY"
            value={filters.endDate}
            onChange={(date) => {
              setFilter("endDate", date);
            }}
          />
        </div>
      </div>
    </LocalizationProvider>
  );
}
