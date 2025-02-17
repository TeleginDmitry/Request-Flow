import { DivisionType } from "../division/division.types";
import { RoleType } from "../role/role.types";

interface UserType {
  id: number;
  name: string;
  email: string;
  created_at: Date;
  updated_at: Date;
  isBlocked: number;
  role: RoleType;
  division: DivisionType;
  email_notifications: number;
}

interface UserDivisionType {
  id: number;
  name: string;
}

interface UserRoleType {
  id: number;
  name: string;
}

export { UserType, UserDivisionType, UserRoleType };
