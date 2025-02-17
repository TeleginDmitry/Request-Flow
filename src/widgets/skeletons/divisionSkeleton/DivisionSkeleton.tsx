import Skeleton from "@mui/material/Skeleton";
import { Box, TableRow, TableCell, IconButton } from "@mui/material";

export function DivisionSkeleton() {
  return (
    <TableRow>
      <TableCell width="60px">
        <Box sx={{ display: "flex" }}>
          <IconButton disabled>
            <Skeleton variant="rectangular" width={24} height={40} />
          </IconButton>
        </Box>
      </TableCell>
      <TableCell width="40px">
        <Skeleton variant="rectangular" width={40} height={40} />
      </TableCell>
      <TableCell width="150px">
        <Skeleton variant="rectangular" width={150} height={40} />
      </TableCell>
    </TableRow>
  );
}
