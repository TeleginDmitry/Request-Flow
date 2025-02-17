import { render, fireEvent, screen } from "@testing-library/react";
import LazyLoadingBut from "./LazyLoadingBut";

const onNextPage = jest.fn();
const onPrevPage = jest.fn();

const defaultProps = {
  hasNextPage: true,
  isLoading: false,
  page: 1,
  totalPages: 10,
  onNextPage,
  onPrevPage,
};

const renderComponent = (props = {}) => {
  return render(<LazyLoadingBut {...defaultProps} {...props} />);
};

describe("LazyLoadingBut", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render buttons and page indicator", () => {
    renderComponent();

    expect(screen.getByTestId("btn-prev")).toBeInTheDocument();
    expect(screen.getByTestId("btn-next")).toBeInTheDocument();
    expect(screen.getByTestId("page")).toBeInTheDocument();
  });

  it("should call onNextPage and update page", () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("btn-next"));
    fireEvent.click(screen.getByTestId("btn-next"));

    expect(onNextPage).toHaveBeenCalledTimes(2);
  });

  it("should disable buttons when loading", () => {
    renderComponent({ isLoading: true });

    expect(screen.getByTestId("btn-next")).toBeDisabled();
    expect(screen.getByTestId("btn-prev")).toBeDisabled();
  });

  it("should disable 'next' button on last page", () => {
    renderComponent({ page: 10, hasNextPage: false });

    expect(screen.getByTestId("btn-next")).toBeDisabled();
    expect(screen.getByTestId("btn-prev")).not.toBeDisabled();
  });

  it("should disable 'prev' button on first page", () => {
    renderComponent({ page: 1 });

    expect(screen.getByTestId("btn-next")).not.toBeDisabled();
    expect(screen.getByTestId("btn-prev")).toBeDisabled();
  });

  it("should disable both buttons when only one page", () => {
    renderComponent({ page: 1, totalPages: 1, hasNextPage: false });

    expect(screen.getByTestId("btn-next")).toBeDisabled();
    expect(screen.getByTestId("btn-prev")).toBeDisabled();
  });
});
