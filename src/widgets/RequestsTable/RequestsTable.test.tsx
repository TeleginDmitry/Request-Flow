import { screen, render } from "@testing-library/react";
import RequestsTable from "./RequestsTable";
import { RequestStateType } from "@store/requests/requests.slice";

const mockRequests: RequestStateType[] = [
  {
    id: 1,
    created_at: new Date("2023-11-20T12:34:56"),
    updated_at: new Date("2023-11-20T12:34:56"),
    materials: [],
    request_status: {
      id: 1,
      next_status: {
        id: 1,
        name: "В архиве",
      },
      current_status: {
        id: 1,
        name: "Выдано",
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
    isChecked: false,
  },
];

jest.mock("@widgets/skeletons/requestSkeleton/RequestSkeleton", () => ({
  __esModule: true,
  default: () => <div data-testid="request-skeleton">RequestSkeleton</div>,
}));

jest.mock("./Row/Row", () => ({
  __esModule: true,
  default: () => <div data-testid="request-row">RequestRow</div>,
}));

describe("RequestsTable", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders empty table message when no requests and not loading", () => {
    render(
      <RequestsTable requests={[]} hideButtons={false} isLoading={false} />
    );
    expect(screen.getByText("Заявки не найдены!")).toBeInTheDocument();
  });

  it("should render skeletons", () => {
    render(
      <RequestsTable requests={[]} hideButtons={false} isLoading={true} />
    );

    expect(screen.getAllByTestId("request-skeleton").length).toBe(10);
  });

  it("should render requests", () => {
    render(
      <RequestsTable
        requests={mockRequests}
        hideButtons={false}
        isLoading={false}
      />
    );

    expect(screen.getAllByTestId("request-row")).toHaveLength(1);
  });
});
