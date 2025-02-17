import { UserType } from "@mytypes/api/user/user.types";
import { UserRow } from "./UserRow";
import { render, screen, fireEvent } from "@testing-library/react";
import { getFullDateByStrFromDb } from "@utils/helpers/timeFunctions";
import { USERS_PAGE } from "@configs/routes";

const mockUser: UserType = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  created_at: new Date("2023-11-20T12:34:56"),
  updated_at: new Date(),
  isBlocked: 0,
  email_notifications: 1,
  role: { name: "Администратор", id: 1 },
  division: { name: "Дизайн", id: 1 },
};

const mockNavigate = jest.fn();

jest.mock("@utils/helpers/timeFunctions", () => ({
  getFullDateByStrFromDb: jest.fn(),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigate,
}));

describe("UserRow", () => {
  beforeEach(() => {
    (getFullDateByStrFromDb as jest.Mock).mockReturnValue("20.11.2023");
  });

  it("should render", () => {
    render(
      <table>
        <tbody>
          <UserRow user={mockUser}></UserRow>
        </tbody>
      </table>
    );

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john.doe@example.com")).toBeInTheDocument();
    expect(screen.getByText("Администратор")).toBeInTheDocument();
    expect(screen.getByText("Дизайн")).toBeInTheDocument();
    expect(screen.getByText("20.11.2023")).toBeInTheDocument();
  });

  it("navigate to user page", () => {
    render(
      <table>
        <tbody>
          <UserRow user={mockUser}></UserRow>
        </tbody>
      </table>
    );

    fireEvent.click(
      screen.getByRole("button", { name: /Редактировать профиль/i })
    );
    expect(mockNavigate).toHaveBeenCalledWith(`${USERS_PAGE}/1`);
  });
});
