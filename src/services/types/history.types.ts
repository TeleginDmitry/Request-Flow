import { HistoryStatusesType } from "@mytypes/history_statuses";

export interface HistoryCreationType {
  request_id: number;
  history_status: HistoryStatusesType;
  user_id: number;
}
