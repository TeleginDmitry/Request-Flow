import { render, screen } from "@testing-library/react";
import PrivateRoute from "./PrivateRoute";
import { useAppSelector } from "@hooks/useAppSelector";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { isAuthSelector, isVerifiedSelector } from "@store/user/user.selectors";
import { AUTH_PAGE, REQUESTS_PAGE } from "@configs/routes";

jest.mock("@hooks/useAppSelector");
jest.mock("@widgets/Header/Header", () => () => (
  <div data-testid="header">Header</div>
));
jest.mock("@components/Preloader/Preloader", () => () => (
  <div data-testid="preloader">Preloader</div>
));

describe("PrivateRoute", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders Preloader if user is not verified", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector === isVerifiedSelector) return false;
      if (selector === isAuthSelector) return true;
    });

    render(
      <MemoryRouter>
        <PrivateRoute />
      </MemoryRouter>
    );

    expect(screen.getByTestId("preloader")).toBeInTheDocument();
    expect(screen.queryByTestId("private-route")).not.toBeInTheDocument();
  });

  it("redirects to AUTH_PAGE if user is not authenticated", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector === isVerifiedSelector) return true;
      if (selector === isAuthSelector) return false;
    });

    render(
      <MemoryRouter initialEntries={[REQUESTS_PAGE]}>
        <Routes>
          <Route path={REQUESTS_PAGE} element={<PrivateRoute />} />
          <Route
            path={AUTH_PAGE}
            element={<div data-testid="auth-page">Auth Page</div>}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("auth-page")).toBeInTheDocument();
  });

  it("renders Header and Outlet if user is verified and authenticated", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector === isVerifiedSelector) return true;
      if (selector === isAuthSelector) return true;
    });

    render(
      <MemoryRouter initialEntries={[REQUESTS_PAGE]}>
        <Routes>
          <Route path={REQUESTS_PAGE} element={<PrivateRoute />}>
            <Route
              path=""
              element={<div data-testid="outlet-content">Outlet Content</div>}
            />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByTestId("private-route")).toBeInTheDocument();
    expect(screen.getByTestId("header")).toBeInTheDocument();
    expect(screen.getByTestId("outlet-content")).toBeInTheDocument();
  });
});
