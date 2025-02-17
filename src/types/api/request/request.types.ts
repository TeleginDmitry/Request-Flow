import { RequestStatusesType } from "@mytypes/request_statuses";
import { MaterialType } from "../material/material.types";
import { UserType } from "../user/user.types";
import { WarehouseType } from "../warehouse/warehouse.types";

interface RequestType {
  id: number;
  text: string;
  created_at: Date;
  updated_at: Date;
  user: UserType;
  warehouse: WarehouseType | null;
  materials: MaterialType[];
  request_status: RequestStatusType;
}

interface RequestStatusType {
  id: number;
  next_status: Status;
  previous_status: Status;
  current_status: Status;
  created_at: Date;
  updated_at: Date;
}

interface Status {
  id: number;
  name: RequestStatusesType;
}

export { RequestType };
