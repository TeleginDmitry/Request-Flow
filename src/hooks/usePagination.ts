import { PaginationType } from "@mytypes/pagination/pagination.types";
import { useEffect, useState } from "react";

export interface CallbackProps {
  page: number;
}

interface Props<T> {
  callback: (props: CallbackProps) => Promise<PaginationType<T>>;
  onSuccess?: (data: T[]) => void;
  onError?: (error: unknown) => void;
}

function usePagination<T>({ callback, onError, onSuccess }: Props<T>) {
  const [data, setData] = useState<T[]>([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNextPage, setHasNextPage] = useState(false);
  const [totalPages, setTotalPages] = useState(0);

  async function onFetch() {
    setIsLoading(true);
    try {
      const { data, next_page_url, total } = await callback({ page });

      setTotalPages(total % 10 === 0 ? total / 10 : Math.floor(total / 10) + 1);
      setHasNextPage(!!next_page_url);
      setData(data);
      onSuccess?.(data);
    } catch (error) {
      onError?.(error);
    } finally {
      setIsLoading(false);
    }
  }

  function onNextPage() {
    if (!hasNextPage || isLoading) return;

    setPage((prev) => prev + 1);
  }

  function onPrevPage() {
    if (page === 1 || isLoading) return;

    setPage((prev) => prev - 1);
  }

  useEffect(() => {
    onFetch();
  }, [page, callback]);

  return {
    isLoading,
    data,
    page,
    onNextPage,
    onPrevPage,
    hasNextPage,
    totalPages,
    onFetch,
    setData,
  };
}

export { usePagination };
