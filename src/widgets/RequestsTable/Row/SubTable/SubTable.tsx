import Table from "@mui/material/Table";
import TableHead from "@mui/material/TableHead";
import TableBody from "@mui/material/TableBody";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";

import LoadingData from "./LoadingData/LoadingData";

import { MaterialType } from "@mytypes/api/material/material.types";
import { Material } from "./material/Material";
import { RequestStatusesType } from "@mytypes/request_statuses";
import { SUPPLIER } from "@configs/userRoles";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";

interface Props {
  materials: MaterialType[];
  requestStatus: RequestStatusesType;
  isOpen: boolean;
}

export default function SubTable({ materials, requestStatus, isOpen }: Props) {
  const user = useAppSelector(userSelector);

  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={8}>
        <Collapse in={isOpen} timeout="auto" unmountOnExit>
          {!materials || materials.length === 0 ? (
            <LoadingData />
          ) : (
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <span>№</span>
                    </TableCell>
                    <TableCell>Наименование</TableCell>
                    <TableCell align="right">Кол-во</TableCell>
                    <TableCell align="right">Склад</TableCell>
                    <TableCell align="right">Описание</TableCell>
                    {user?.role?.name === SUPPLIER && (
                      <TableCell align="right">Дата поставки</TableCell>
                    )}
                    <TableCell align="right">Влож.</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {materials.map((material, index) => {
                    return (
                      <Material
                        key={material.id}
                        material={material}
                        requestStatus={requestStatus}
                        index={index}
                      ></Material>
                    );
                  })}
                </TableBody>
              </Table>
            </Box>
          )}
        </Collapse>
      </TableCell>
    </TableRow>
  );
}
