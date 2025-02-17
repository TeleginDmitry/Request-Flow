import Skeleton from "@mui/material/Skeleton";
import { TableRow, TableCell } from "@mui/material";

export default function RequestSkeleton() {
  return (
    <>
      <TableRow sx={{ background: "#ededed" }}>
        <TableCell width="100px">
          <Skeleton variant="rectangular" height={40} />
        </TableCell>
        <TableCell width="50px">
          <Skeleton variant="rectangular" height={40} />
        </TableCell>
        <TableCell width="120px">
          <Skeleton variant="rectangular" height={40} />
        </TableCell>
        <TableCell width="100px">
          <Skeleton variant="rectangular" height={40} />
        </TableCell>
        <TableCell width="150px">
          <Skeleton variant="rectangular" height={40} />
        </TableCell>
        <TableCell width="80px">
          <Skeleton variant="rectangular" height={40} />
        </TableCell>
        <TableCell width="200px">
          <Skeleton variant="rectangular" height={40} />
        </TableCell>
      </TableRow>
    </>
  );
}
