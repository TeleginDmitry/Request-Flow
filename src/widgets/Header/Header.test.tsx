import { getHeaderTitleByPath } from "@configs/headerTitles";
import { render, screen } from "@testing-library/react";
import Header from "./Header";
import { MemoryRouter } from "react-router-dom";

jest.mock("@configs/headerTitles", () => ({
  getHeaderTitleByPath: jest.fn(),
}));

jest.mock("@components/LeftMenu/LeftMenu", () => () => (
  <div data-testid="left-menu">LeftMenu</div>
));
jest.mock("@components/SearchPanel/SearchPanel", () => () => (
  <div data-testid="search-panel">SearchPanel</div>
));
jest.mock("@components/Account/Account", () => () => (
  <div data-testid="account">Account</div>
));

describe("Header", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all components", () => {
    (getHeaderTitleByPath as jest.Mock).mockImplementation(
      () => "Страница заявок"
    );

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByTestId("left-menu")).toBeInTheDocument();
    expect(screen.getByTestId("search-panel")).toBeInTheDocument();
    expect(screen.getByTestId("account")).toBeInTheDocument();

    expect(screen.getByText("Страница заявок")).toBeInTheDocument();

    expect(getHeaderTitleByPath).toHaveBeenCalledWith("/");
  });

  it("should display a different title for another path", () => {
    (getHeaderTitleByPath as jest.Mock).mockReturnValue("Another Title");

    render(
      <MemoryRouter initialEntries={["/another-path"]}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByText("Another Title")).toBeInTheDocument();
    expect(getHeaderTitleByPath).toHaveBeenCalledWith("/another-path");
  });
});
