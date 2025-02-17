import { Button, TableCell, TableCellProps } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useRequestsSortParams } from "@hooks/useRequestsSortParams";
import { SortParamsType } from "@contexts/RequestsSortParams.context";

interface Props extends TableCellProps {
  children: React.ReactNode;
  columnName: keyof SortParamsType;
}

export function SortColumn({ children, columnName, ...props }: Props) {
  const { params, setParam } = useRequestsSortParams();

  function handleSort() {
    setParam(columnName);
  }

  return (
    <TableCell {...props}>
      <Button
        startIcon={
          !params[columnName] ? null : params[columnName] === "asc" ? (
            <KeyboardArrowUpIcon />
          ) : (
            <KeyboardArrowDownIcon />
          )
        }
        onClick={handleSort}
      >
        {children}
      </Button>
    </TableCell>
  );
}
