import SelectInput from "@components/Select/Select";
import * as styles from "./style.module.css";
import { Typography } from "@mui/material";
import { DivisionType } from "@mytypes/api/division/division.types";
import { useFilters } from "@hooks/useFilters";

interface Props {
  divisions: DivisionType[];
}

export default function DivisionSearch({ divisions }: Props) {
  const { filters, setFilter } = useFilters();
  return (
    <>
      <Typography className={styles.title} variant="body1" component="p">
        Отдел, от которого поступила заявка:
      </Typography>
      <SelectInput
        label="Выберите отдел"
        value={filters.division_id ?? ""}
        values={divisions}
        onChange={(e) => setFilter("division_id", e.target.value)}
      />
    </>
  );
}
