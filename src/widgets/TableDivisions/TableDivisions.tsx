import { useAppSelector } from "@hooks/useAppSelector";
import {
  divisionsSelector,
  isLoadingDivisionsSelector,
} from "@store/divisions/divisions.selectors";
import { TableBody } from "@mui/material";

import { DivisionRow } from "@widgets/DivisionRow/DivisionRow";
import { DivisionSkeleton } from "@widgets/skeletons/divisionSkeleton/DivisionSkeleton";

export function TableDivisions() {
  const divisions = useAppSelector(divisionsSelector);
  const isLoading = useAppSelector(isLoadingDivisionsSelector);

  return (
    <TableBody>
      {!isLoading ? (
        <>
          {divisions.map((division) => (
            <DivisionRow key={division.id} division={division}></DivisionRow>
          ))}
        </>
      ) : (
        <>
          <DivisionSkeleton></DivisionSkeleton>
          <DivisionSkeleton></DivisionSkeleton>
          <DivisionSkeleton></DivisionSkeleton>
          <DivisionSkeleton></DivisionSkeleton>
          <DivisionSkeleton></DivisionSkeleton>
          <DivisionSkeleton></DivisionSkeleton>
          <DivisionSkeleton></DivisionSkeleton>
        </>
      )}
    </TableBody>
  );
}
