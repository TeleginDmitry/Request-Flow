import Skeleton from "@mui/material/Skeleton";
import { TableRow, TableCell } from "@mui/material";

export default function UserSkeleton() {
  return (
    <TableRow>
      <TableCell width="85px">
        <Skeleton variant="rectangular" width="100%" height={40} />
      </TableCell>
      <TableCell width="40px">
        <Skeleton variant="rectangular" width="100%" height={40} />
      </TableCell>
      <TableCell width="120px">
        <Skeleton variant="rectangular" width="100%" height={40} />
      </TableCell>
      <TableCell width="100px">
        <Skeleton variant="rectangular" width="100%" height={40} />
      </TableCell>
      <TableCell width="80px">
        <Skeleton variant="rectangular" width="100%" height={40} />
      </TableCell>
      <TableCell width="120px">
        <Skeleton variant="rectangular" width="100%" height={40} />
      </TableCell>
      <TableCell width="150px">
        <Skeleton variant="rectangular" width="100%" height={40} />
      </TableCell>
    </TableRow>
  );
}
