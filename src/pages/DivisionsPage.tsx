import MainToolbar from "@components/MainToolbar/MainToolbar";
import {
  TableContainer,
  TableHead,
  Table,
  TableRow,
  TableCell,
  Button,
} from "@mui/material";
import { DivisionCreatingModal } from "@widgets/DivisionCreatingModal/DivisionCreatingModal";
import { useState } from "react";
import { TableDivisions } from "@widgets/TableDivisions/TableDivisions";
import { useAppSelector } from "@hooks/useAppSelector";
import {
  divisionsSelector,
  isLoadingDivisionsSelector,
} from "@store/divisions/divisions.selectors";
import EmptyTable from "@components/EmptyTable/EmptyTable";

export function DivisionsPage() {
  const isLoading = useAppSelector(isLoadingDivisionsSelector);

  const divisions = useAppSelector(divisionsSelector);

  const [isOpenCreatingModal, setIsOpenCreatingModal] = useState(false);

  function toggleOpen() {
    setIsOpenCreatingModal((state) => !state);
  }

  return (
    <>
      {!isLoading && !divisions.length && (
        <EmptyTable title="Отделы не найдены!" />
      )}
      <MainToolbar>
        <Button onClick={toggleOpen} variant="outlined">
          Создать новый отдел
        </Button>
      </MainToolbar>
      <TableContainer
        sx={{ boxShadow: "0 0 1px rgba(0, 0, 0, 0.4)", borderRadius: "10px" }}
      >
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ width: "40px" }}></TableCell>
              <TableCell>id</TableCell>
              <TableCell>Название</TableCell>
            </TableRow>
          </TableHead>

          <TableDivisions></TableDivisions>
        </Table>
      </TableContainer>
      <DivisionCreatingModal
        isOpen={isOpenCreatingModal}
        title="Создать новый отдел"
        toggleOpen={toggleOpen}
      ></DivisionCreatingModal>
    </>
  );
}
