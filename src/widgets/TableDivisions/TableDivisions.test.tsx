import { useAppSelector } from "@hooks/useAppSelector";
import { TableDivisions } from "./TableDivisions";
import { render, screen } from "@testing-library/react";
import {
  divisionsSelector,
  isLoadingDivisionsSelector,
} from "@store/divisions/divisions.selectors";

jest.mock("@hooks/useAppSelector");
jest.mock("@widgets/DivisionRow/DivisionRow", () => ({
  DivisionRow: ({ division }: { division: { id: string } }) => (
    <div data-testid="division-row">{division.id}</div>
  ),
}));
jest.mock("@widgets/skeletons/divisionSkeleton/DivisionSkeleton", () => ({
  DivisionSkeleton: () => <div data-testid="division-skeleton">Skeleton</div>,
}));

describe("TableDivisions", () => {
  it("should render skeletons", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector === divisionsSelector) return [];
      if (selector === isLoadingDivisionsSelector) return true;
    });

    render(<TableDivisions />);

    expect(screen.getAllByTestId("division-skeleton").length).toBe(7);
    expect(screen.queryByTestId("division-row")).not.toBeInTheDocument();
  });

  it("should render divisions", () => {
    (useAppSelector as unknown as jest.Mock).mockImplementation((selector) => {
      if (selector === divisionsSelector) return [{ id: "1" }];
      if (selector === isLoadingDivisionsSelector) return false;
    });

    render(<TableDivisions />);

    expect(screen.queryByTestId("division-skeleton")).not.toBeInTheDocument();
    expect(screen.getAllByTestId("division-row").length).toBe(1);
  });
});
