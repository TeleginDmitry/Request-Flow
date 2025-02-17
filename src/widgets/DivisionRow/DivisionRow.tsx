import { DivisionType } from "@mytypes/api/division/division.types";
import EditIcon from "@mui/icons-material/Edit";
import { Box, TableCell, Tooltip, TableRow, IconButton } from "@mui/material";
import * as styles from "./styles.module.css";
import { useNavigate } from "react-router-dom";
import { DIVISIONS_PAGE } from "@configs/routes";

interface Props {
  division: DivisionType;
}

export function DivisionRow({ division }: Props) {
  const navigate = useNavigate();

  function redirectToEditDivision(id: number) {
    navigate(DIVISIONS_PAGE + "/" + id);
  }
  return (
    <TableRow className={styles.row}>
      <TableCell className={styles.tool}>
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Редактировать отдел">
            <IconButton onClick={() => redirectToEditDivision(division.id)}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </TableCell>
      <TableCell>{division.id}</TableCell>
      <TableCell>{division.name}</TableCell>
    </TableRow>
  );
}
