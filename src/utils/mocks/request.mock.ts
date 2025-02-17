import { RequestType } from "@mytypes/api/request/request.types";
import { RequestStatusesType } from "@mytypes/request_statuses";

export function getMockRequest(
  currentStatus: RequestStatusesType
): RequestType {
  return {
    id: 1,
    created_at: new Date("2023-11-20T12:34:56"),
    updated_at: new Date("2023-11-20T12:34:56"),
    materials: [
      {
        id: 1,
        name: "Test material",
        request_id: 1,
        quantity: 1,
        unit: "шт",
        residue: 1,
        note: null,
        link: null,
        files: [],
        delivery_date: null,
        created_at: "2023-11-20T12:34:56",
        updated_at: "2023-11-20T12:34:56",
      },
    ],
    request_status: {
      id: 1,
      next_status: {
        id: 1,
        name: "В архиве",
      },
      current_status: {
        id: 1,
        name: currentStatus,
      },
      previous_status: {
        id: 1,
        name: "В архиве",
      },
      created_at: new Date("2023-11-20T12:34:56"),
      updated_at: new Date("2023-11-20T12:34:56"),
    },
    text: "Test request",
    user: {
      id: 1,
      name: "John Doe",
      email: "john.doe@example.com",
      created_at: new Date("2023-11-20T12:34:56"),
      updated_at: new Date("2023-11-20T12:34:56"),
      isBlocked: 0,
      email_notifications: 1,
      role: {
        name: "Администратор",
        id: 1,
      },
      division: {
        name: "IT отдел",
        id: 1,
      },
    },
    warehouse: null,
  };
}
