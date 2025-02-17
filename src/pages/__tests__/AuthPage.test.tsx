import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { AuthPage } from "@pages/AuthPage";
import { useAppSelector } from "@hooks/useAppSelector";
import { isAuthSelector, isVerifiedSelector } from "@store/user/user.selectors";
import { AUTH_PAGE, REQUESTS_PAGE } from "@configs/routes";

jest.mock("@store/user/user.actions", () => ({
  loginThunk: jest.fn(),
}));

jest.mock("@hooks/useAppDispatch", () => ({
  useAppDispatch: jest.fn(() => jest.fn()),
}));

jest.mock("@hooks/useAppSelector", () => ({
  useAppSelector: jest.fn(),
}));

describe("AuthPage", () => {
  function renderComponent() {
    return render(
      <MemoryRouter initialEntries={[AUTH_PAGE]}>
        <Routes>
          <Route path={AUTH_PAGE} element={<AuthPage />} />
          <Route
            path={REQUESTS_PAGE}
            element={<div data-testid="requests-page">Requests Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );
  }

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without redirect", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector === isVerifiedSelector) return true;
      else if (selector === isAuthSelector) return false;
    });

    renderComponent();

    expect(screen.getByTestId("sign-in-form")).toBeInTheDocument();
  });

  it("should render redirect", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector === isVerifiedSelector) return true;
      else if (selector === isAuthSelector) return true;
    });

    renderComponent();

    expect(screen.getByTestId("requests-page")).toBeInTheDocument();
  });
});
