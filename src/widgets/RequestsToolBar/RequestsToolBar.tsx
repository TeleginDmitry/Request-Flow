import { Button } from "@mui/material";
import { CREATE_REQUEST_PAGE } from "@configs/routes";
import { useNavigate } from "react-router-dom";
import RefreshBut from "@components/RefreshBut/RefreshBut";
import MainToolbar from "@components/MainToolbar/MainToolbar";
import { RequestStateType } from "@store/requests/requests.slice";
import { useMemo } from "react";
import { exportRequestsToExcel } from "@utils/helpers/excel";
import * as styles from "./RequestsToolBar.module.css";
import { useAppSelector } from "@hooks/useAppSelector";
import { userSelector } from "@store/user/user.selectors";

interface Props {
  getAllRequests: () => void;
  requests: RequestStateType[];
}

export default function RequestsToolBar({ getAllRequests, requests }: Props) {
  const navigate = useNavigate();

  const user = useAppSelector(userSelector);

  const checkedRequests = useMemo(() => {
    return requests.filter((request) => request.isChecked);
  }, [requests]);

  return (
    <MainToolbar>
      <div className={styles.wrapper}>
        <div className={styles.leftBlock}>
          <Button
            onClick={() => navigate(CREATE_REQUEST_PAGE)}
            disabled={!!user?.isBlocked}
            variant="outlined"
          >
            Создать заявку
          </Button>
          <RefreshBut onClick={getAllRequests} color="primary" />
        </div>

        {!!checkedRequests.length && (
          <Button
            onClick={() => exportRequestsToExcel(checkedRequests)}
            color="primary"
            variant="outlined"
          >
            Скачать Excel
          </Button>
        )}
      </div>
    </MainToolbar>
  );
}
