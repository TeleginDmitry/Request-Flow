import { FiltersType } from "@contexts/Filters.context";
import { SortParamsType } from "@contexts/RequestsSortParams.context";
import { RequestStatusesType } from "@mytypes/request_statuses";

interface RequestParamsType extends FiltersType {
  page: number;
  status: RequestStatusesType;
}

interface RequestServiceType {
  filters: Partial<RequestParamsType>;
  sortParams?: SortParamsType;
}

interface RequestCreationType {
  text: string;
  user_id: number;
  warehouse_id?: number;
  request_status_id?: number;
}

interface RequestUpdationType {
  requestId: number;
  text: string;
  user_id: number;
  warehouse_id?: number | null;
  request_status_id?: number;
}

interface RequestStatusType {
  requestId: number;
  status?: RequestStatusesType;
}

export {
  RequestServiceType,
  RequestParamsType,
  RequestCreationType,
  RequestUpdationType,
  RequestStatusType,
};
