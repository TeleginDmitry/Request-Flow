import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import EmptyTable from "@components/EmptyTable/EmptyTable";

import { getFullDateByStrFromDb } from "@utils/helpers/timeFunctions.js";
import { HistoryType } from "@mytypes/api/history/history.types";
import { Loader } from "@components/Loader/Loader";

interface Props {
  histories: HistoryType[];
  isLoading: boolean;
}

export default function historiesTable({ histories, isLoading }: Props) {
  return (
    <>
      {!isLoading && !histories.length && (
        <EmptyTable title="История для данной заявки не найдена!" />
      )}

      <TableContainer
        sx={{ boxShadow: "0 0 1px rgba(0, 0, 0, 0.4)", borderRadius: "10px" }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>№</TableCell>
              <TableCell>Статус заявки</TableCell>
              <TableCell>Кем обработана</TableCell>
              <TableCell>Дата и время</TableCell>
            </TableRow>
          </TableHead>
          {!isLoading && (
            <TableBody>
              {histories.map((history, index) => (
                <TableRow key={history.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{history.history_status.name}</TableCell>
                  <TableCell>{history.user.name}</TableCell>
                  <TableCell>
                    {getFullDateByStrFromDb(history.created_at)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>

        {isLoading && <Loader></Loader>}
      </TableContainer>
    </>
  );
}
