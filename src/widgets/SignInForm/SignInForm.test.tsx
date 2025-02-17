import { render, screen } from "@testing-library/react";
import SignInForm from "./SignInForm";
import userEvent from "@testing-library/user-event";

const onSignIn = jest.fn();

function renderComponent() {
  render(<SignInForm onSignIn={onSignIn} />);
}

describe("SignInForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    renderComponent();

    expect(screen.getByTestId("sign-in-form")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("sign-in-button")).toBeInTheDocument();
  });

  it("allows the user to input email and password", () => {
    renderComponent();

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password123");

    expect(emailInput).toHaveValue("test@example.com");
    expect(passwordInput).toHaveValue("password123");
  });

  it("calls onSignIn when the form is submitted", () => {
    renderComponent();

    const emailInput = screen.getByTestId("email-input");
    const passwordInput = screen.getByTestId("password-input");
    const submitButton = screen.getByTestId("sign-in-button");

    userEvent.type(emailInput, "test@example.com");
    userEvent.type(passwordInput, "password123");

    submitButton.click();

    expect(onSignIn).toHaveBeenCalledTimes(1);
    expect(onSignIn).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("does not call onSignIn when the form is submitted with empty fields", async () => {
    renderComponent();

    const submitButton = screen.getByTestId("sign-in-button");

    submitButton.click();

    expect(onSignIn).not.toHaveBeenCalled();
  });
});
