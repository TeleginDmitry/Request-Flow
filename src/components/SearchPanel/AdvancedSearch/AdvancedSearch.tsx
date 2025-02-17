import { Typography } from "@mui/material";
import * as styles from "./style.module.css";

import DateSearch from "./DateSearch/DateSearch";
import DivisionSearch from "./DivisionSearch/DivisionSearch";
import { Button } from "@mui/material";
import { useAppSelector } from "@hooks/useAppSelector";
import { divisionsSelector } from "@store/divisions/divisions.selectors";
import { useFilters } from "@hooks/useFilters";

export default function AdvancedSearch() {
  const divisions = useAppSelector(divisionsSelector);

  const { resetFilters } = useFilters();

  return (
    <div className={styles.wrapper}>
      <div className={styles.block}>
        <Typography className={styles.title} variant="h6" component="p">
          Расширенный поиск
        </Typography>

        <div className={styles.inputs}>
          <DateSearch />

          <DivisionSearch divisions={divisions} />

          <Button variant="outlined" onClick={resetFilters}>
            Сбросить фильр
          </Button>
          <Button variant="outlined" type="submit">
            Поиск
          </Button>
        </div>
      </div>
    </div>
  );
}
