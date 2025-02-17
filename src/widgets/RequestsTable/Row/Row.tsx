import { useState } from "react";
import * as styles from "./style.module.css";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Tools } from "./Tools/Tools";
import { Status } from "./Status/Status";
import SubTable from "./SubTable/SubTable";
import { getFullDateByStrFromDb } from "@utils/helpers/timeFunctions.js";
import { Checkbox } from "@mui/material";
import {
  RequestStateType,
  toggleChecked,
} from "@store/requests/requests.slice";
import { useAppDispatch } from "@hooks/useAppDispatch";

interface Props {
  request: RequestStateType;
  hideButtons: boolean;
}

export default function Row({ request, hideButtons }: Props) {
  const dispatch = useAppDispatch();
  const [isOpen, setOpen] = useState(false);

  function toggleOpen() {
    setOpen((state) => !state);
  }

  function toggleCheckedRequest() {
    dispatch(toggleChecked(request.id));
  }

  return (
    <>
      <TableRow sx={{ background: "#ededed" }}>
        <TableCell>
          <div className={styles.tools}>
            <Checkbox
              onChange={toggleCheckedRequest}
              checked={request.isChecked}
              color="primary"
            ></Checkbox>
            <Tools
              toggleOpen={toggleOpen}
              request={request}
              isOpen={isOpen}
              hideButtons={hideButtons}
            />
          </div>
        </TableCell>
        <TableCell sx={{ textWrap: "nowrap" }} align="right">
          {request.id}
        </TableCell>
        <TableCell sx={{ textWrap: "nowrap" }} align="right">
          {request.user.division.name}
        </TableCell>
        <TableCell align="right">{request.user.name}</TableCell>
        <TableCell sx={{ textWrap: "nowrap" }} align="right">
          {request.text}
        </TableCell>
        <TableCell sx={{ textWrap: "nowrap" }} align="right">
          {getFullDateByStrFromDb(request.created_at)}
        </TableCell>
        <TableCell align="center">
          <Status
            statusName={request.request_status.current_status.name}
            warehouseName={request?.warehouse?.name}
          />
        </TableCell>
      </TableRow>

      <SubTable
        requestStatus={request.request_status.current_status.name}
        materials={request.materials}
        isOpen={isOpen}
      />
    </>
  );
}
