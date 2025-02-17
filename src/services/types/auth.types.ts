import { UserType } from "@mytypes/api/user/user.types";

interface LoginRequestType {
  email: string;
  password: string;
}

interface LoginResponseType {
  user: UserType;
  token: string;
}

interface RegisterResponseType {
  user: UserType;
  token: string;
}

interface RegisterRequestType extends LoginRequestType {
  name: string;
  role_id: number;
  division_id: number;
}

export {
  LoginRequestType,
  RegisterRequestType,
  LoginResponseType,
  RegisterResponseType,
};
