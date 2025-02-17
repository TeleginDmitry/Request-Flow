import { useAppSelector } from "@hooks/useAppSelector";
import { render, screen } from "@testing-library/react";
import { Tools } from "./Tools";
import ActionsContext, { ActionsValues } from "@contexts/Actions.context";
import { getMockRequest } from "@utils/mocks/request.mock";
import { getMockUser } from "@utils/mocks/user.mock";
import * as axe from "axe-core";

const mockActions: ActionsValues = {
  historyHandle: jest.fn(),
  deleteHandle: jest.fn(),
  editHandle: jest.fn(),
  previousStatusHandle: jest.fn(),
  acceptRequestControlHandle: jest.fn(),
  archiveHandle: jest.fn(),
  confirmAndSendToSnab: jest.fn(),
  acceptRequestSnabHandle: jest.fn(),
  acceptRequestWarehouseHandle: jest.fn(),
  balanceHandle: jest.fn(),
  materialsArrivedObjectHandle: jest.fn(),
  materialsArrivedWarehouseHandle: jest.fn(),
  materialTransferred: jest.fn(),
};

interface RenderComponentProps {
  request?: ReturnType<typeof getMockRequest>;
  hideButtons?: boolean;
  isOpen?: boolean;
  toggleOpen?: jest.Mock;
  contextValue?: ActionsValues | null;
}

function renderComponent({
  request = getMockRequest("Проверяются остатки"),
  hideButtons = false,
  isOpen = false,
  toggleOpen = jest.fn(),
  contextValue = mockActions,
}: RenderComponentProps) {
  return render(
    <ActionsContext.Provider value={contextValue}>
      <Tools
        request={request}
        hideButtons={hideButtons}
        isOpen={isOpen}
        toggleOpen={toggleOpen}
      />
    </ActionsContext.Provider>
  );
}

jest.mock("@hooks/useAppSelector");

describe("Tools", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly for ADMIN role and `Проверяются остатки` status", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(
      getMockUser("Администратор", "Администратор")
    );
    const request = getMockRequest("Проверяются остатки");

    renderComponent({ request });

    expect(screen.getByTestId("HistoryIcon")).toBeInTheDocument();
    expect(screen.getByTestId("DeleteIcon")).toBeInTheDocument();
    expect(screen.getByTestId("EditIcon")).toBeInTheDocument();
  });

  it("renders correctly for WAREHOUSE role and `Проверяются остатки` status", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(
      getMockUser("Зав. складом", "Склад")
    );
    const request = getMockRequest("Проверяются остатки");

    renderComponent({ request });

    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();
    expect(screen.getByTestId("HistoryIcon")).toBeInTheDocument();
    expect(screen.getByTestId("DoneAllIcon")).toBeInTheDocument();
  });

  it("renders correctly for WAREHOUSE role and `Ожидание обработки кладовщиком` status", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(
      getMockUser("Зав. складом", "Склад")
    );
    const request = getMockRequest("Ожидание обработки кладовщиком");

    renderComponent({ request });

    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();
    expect(screen.getByTestId("HistoryIcon")).toBeInTheDocument();
    expect(screen.getByTestId("AppRegistrationIcon")).toBeInTheDocument();
  });

  it("renders correctly for CUSTOMER role and `Проверяются остатки` status", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(
      getMockUser("Заказчик", "IT отдел")
    );
    const request = getMockRequest("Проверяются остатки");

    renderComponent({ request });

    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();
    expect(screen.getByTestId("HistoryIcon")).toBeInTheDocument();
  });

  it("renders correctly for CONTROL role and `Проверяются остатки` status", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(
      getMockUser("Контроль", "IT отдел")
    );
    const request = getMockRequest("Проверяются остатки");

    renderComponent({ request });

    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();
    expect(screen.getByTestId("HistoryIcon")).toBeInTheDocument();
  });

  it("renders correctly for SUPPLY role and `Проверяются остатки` status", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(
      getMockUser("Снабжение", "Склад")
    );
    const request = getMockRequest("Проверяются остатки");

    renderComponent({ request });

    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();
    expect(screen.getByTestId("HistoryIcon")).toBeInTheDocument();
  });

  it("renders correctly with hideButtons = true", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(
      getMockUser("Зав. складом", "Склад")
    );
    const request = getMockRequest("Ожидание обработки кладовщиком");

    renderComponent({ request, hideButtons: true });

    expect(screen.getByTestId("KeyboardArrowDownIcon")).toBeInTheDocument();
    expect(screen.getByTestId("HistoryIcon")).toBeInTheDocument();
    expect(screen.queryByTestId("AppRegistrationIcon")).not.toBeInTheDocument();
  });

  it("should not render with contextValue = null", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(
      getMockUser("Администратор", "Администратор")
    );

    const request = getMockRequest("Проверяются остатки");

    renderComponent({ request, contextValue: null });

    expect(screen.queryByTestId("HistoryButton")).not.toBeInTheDocument();
  });

  it("should not render with useAppSelector = null", () => {
    (useAppSelector as unknown as jest.Mock).mockReturnValue(null);

    const request = getMockRequest("Проверяются остатки");

    renderComponent({ request, contextValue: null });

    expect(screen.queryByTestId("HistoryButton")).not.toBeInTheDocument();
  });

  test("component is accessible", async () => {
    const { container } = renderComponent({});
    const results = await axe.run(container);
    expect(results.violations.length).toBe(0);
  });
});
