import { UserType } from "../api/user/user.types";

interface UserContextType {
  user: null | UserType;
  setUser: (user: UserType | null) => void;
}

export { UserContextType };
