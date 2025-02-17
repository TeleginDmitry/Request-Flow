import { HistoryStatusesType } from "@mytypes/history_statuses";
import { RequestType } from "../request/request.types";
import { UserType } from "../user/user.types";

interface HistoryType {
  id: number;
  request_id: number;
  history_status_id: number;
  user_id: number;
  created_at: string;
  updated_at: string;
  history_status: HistoryStatusType;
  user: UserType;
  request: RequestType;
}

interface HistoryStatusType {
  id: number;
  name: HistoryStatusesType;
}

export { HistoryType, HistoryStatusType };
