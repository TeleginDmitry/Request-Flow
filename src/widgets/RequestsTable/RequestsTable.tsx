import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

import Row from "./Row/Row";

import EmptyTable from "@components/EmptyTable/EmptyTable";
import RequestSkeleton from "@widgets/skeletons/requestSkeleton/RequestSkeleton";
import { SortColumn } from "@widgets/SortColumn/SortColumn";
import Checkbox from "@mui/material/Checkbox";

import * as styles from "./RequestsTable.module.css";
import {
  RequestStateType,
  toggleAllChecked,
} from "@store/requests/requests.slice";
import { useAppDispatch } from "@hooks/useAppDispatch";

interface Props {
  requests: RequestStateType[];
  hideButtons: boolean;
  isLoading: boolean;
}

export default function RequestsTable({
  requests,
  hideButtons,
  isLoading,
}: Props) {
  const dispatch = useAppDispatch();

  function toggleCheckedRequests(isChecked: boolean) {
    dispatch(toggleAllChecked(isChecked));
  }

  return (
    <>
      {!isLoading && !requests.length && (
        <EmptyTable title="Заявки не найдены!" />
      )}
      <TableContainer
        sx={{ boxShadow: "0 0 1px rgba(0, 0, 0, 0.4)", borderRadius: "10px" }}
      >
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell>
                <label className={styles.selectAll}>
                  <Checkbox
                    checked={requests.every((request) => request.isChecked)}
                    onChange={(e) => toggleCheckedRequests(e.target.checked)}
                    color="primary"
                  ></Checkbox>
                  <span>Выбрать все</span>
                </label>
              </TableCell>
              <SortColumn columnName="sortId" align="right">
                №
              </SortColumn>
              <SortColumn columnName="sortDivision" align="right">
                Отдел
              </SortColumn>
              <SortColumn columnName="sortUserId" align="right">
                Заказчик
              </SortColumn>
              <SortColumn columnName="sortText" align="right">
                Объект
              </SortColumn>
              <SortColumn columnName="sortCreatedAt" align="right">
                Создано
              </SortColumn>
              <SortColumn columnName="sortStatusId" align="center">
                Статус
              </SortColumn>
            </TableRow>
          </TableHead>
          {!isLoading ? (
            <TableBody>
              {requests.map((request) => (
                <Row
                  request={request}
                  hideButtons={hideButtons}
                  key={request.id}
                />
              ))}
            </TableBody>
          ) : (
            <>
              <RequestSkeleton></RequestSkeleton>
              <RequestSkeleton></RequestSkeleton>
              <RequestSkeleton></RequestSkeleton>
              <RequestSkeleton></RequestSkeleton>
              <RequestSkeleton></RequestSkeleton>
              <RequestSkeleton></RequestSkeleton>
              <RequestSkeleton></RequestSkeleton>
              <RequestSkeleton></RequestSkeleton>
              <RequestSkeleton></RequestSkeleton>
              <RequestSkeleton></RequestSkeleton>
            </>
          )}
        </Table>
      </TableContainer>
    </>
  );
}
