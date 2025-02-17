import { requestStatuses } from "@configs/requestStatuses";
import { RequestStatusesType } from "@mytypes/request_statuses";
import * as styles from "./style.module.css";

interface Props {
  statusName: RequestStatusesType;
  warehouseName?: string;
}

const classes = {
  [requestStatuses.WAITING_FOR_WAREHOUSE_PROCESSING]: styles.cl_1,
  [requestStatuses.CHECKING_REMAINS]: styles.cl_2,
  [requestStatuses.WAITING_FOR_CONTROLLER_PROCESSING]: styles.cl_3,
  [requestStatuses.PROCESSING_BY_CONTROLLER]: styles.cl_4,
  [requestStatuses.WAITING_FOR_SUPPLY_PROCESSING]: styles.cl_5,
  [requestStatuses.PROCESSING_BY_SUPPLY]: styles.cl_6,
  [requestStatuses.MATERIALS_ARRIVED_AT_WAREHOUSE]: styles.cl_7,
  [requestStatuses.READY_FOR_ISSUE_AT_WAREHOUSE]: styles.cl_8,
  [requestStatuses.READY_FOR_ISSUE_AT_SITE]: styles.cl_9,
  [requestStatuses.ISSUED]: styles.cl_10,
  [requestStatuses.ARCHIVED]: styles.cl_11,
};

export function Status({ statusName, warehouseName }: Props) {
  return (
    <div className={`${classes[statusName] || styles.cl_1} ${styles.status}`}>
      {statusName}
      {(statusName === requestStatuses.READY_FOR_ISSUE_AT_WAREHOUSE ||
        statusName === requestStatuses.ISSUED ||
        statusName === requestStatuses.ARCHIVED) &&
        warehouseName && (
          <p className={styles.warehouseText}>{warehouseName}</p>
        )}
    </div>
  );
}
