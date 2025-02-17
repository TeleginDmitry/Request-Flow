import { firstPageType } from "@configs/pagination";
import { Box, Button } from "@mui/material";

interface Props {
  page: number;
  onNextPage: () => void;
  onPrevPage: () => void;
  hasNextPage: boolean;
  totalPages: number;
  isLoading: boolean;
}

export default function LazyLoadingBut({
  page,
  onNextPage,
  onPrevPage,
  hasNextPage,
  totalPages,
  isLoading,
}: Props) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: "15px",
          marginTop: "20px",
        }}
      >
        <Button
          variant="contained"
          disabled={page <= firstPageType || isLoading}
          onClick={onPrevPage}
          data-testid="btn-prev"
        >
          Предыдущие заявки
        </Button>
        <span data-testid="page">
          {page} из {totalPages}
        </span>
        <Button
          variant="contained"
          disabled={!hasNextPage || isLoading}
          onClick={onNextPage}
          data-testid="btn-next"
        >
          Следующие заявки
        </Button>
      </Box>
    </>
  );
}
