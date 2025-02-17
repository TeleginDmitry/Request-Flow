import { UserType } from "@mytypes/api/user/user.types";
import { UserDivisionsType } from "@mytypes/user_divisions";
import { UserRolesType } from "@mytypes/user_roles";

export function getMockUser(
  userRole: UserRolesType,
  userDivision: UserDivisionsType
): UserType {
  return {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    created_at: new Date("2023-11-20T12:34:56"),
    updated_at: new Date("2023-11-20T12:34:56"),
    isBlocked: 0,
    email_notifications: 1,
    role: {
      name: userRole,
      id: 1,
    },
    division: {
      name: userDivision,
      id: 1,
    },
  };
}
