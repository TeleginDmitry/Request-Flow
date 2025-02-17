import RequestsTable from "@widgets/RequestsTable/RequestsTable";
import LazyLoadingBut from "@components/LazyLoadingBut/LazyLoadingBut";
import { RequestType } from "@mytypes/api/request/request.types";
import { CallbackProps, usePagination } from "@hooks/usePagination";
import { RequestServiceType } from "@services/types/requests.types";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { useAppSelector } from "@hooks/useAppSelector";
import {
  isLoadingRequestsSelector,
  requestsSelector,
} from "@store/requests/requests.selectors";
import { getRequestsThunk } from "@store/requests/requests.actions";
import { useRequestsSortParams } from "@hooks/useRequestsSortParams";
import { useCallback } from "react";
import { requestStatuses } from "@configs/requestStatuses";

export function ArchivePage() {
  const dispatch = useAppDispatch();

  const requests = useAppSelector(requestsSelector);
  const isLoading = useAppSelector(isLoadingRequestsSelector);

  const { params: sortParams } = useRequestsSortParams();

  const fetchingRequests = useCallback(
    async ({ page }: CallbackProps) => {
      const requestsProps: RequestServiceType = {
        filters: { page, status: requestStatuses.ARCHIVED },
        sortParams,
      };

      return await dispatch(getRequestsThunk(requestsProps)).unwrap();
    },
    [sortParams]
  );

  const { hasNextPage, onNextPage, onPrevPage, totalPages, page } =
    usePagination<RequestType>({
      callback: fetchingRequests,
    });

  return (
    <>
      <RequestsTable
        isLoading={isLoading}
        requests={requests}
        hideButtons={false}
      />
      <LazyLoadingBut
        isLoading={isLoading}
        hasNextPage={hasNextPage}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        page={page}
        totalPages={totalPages}
      />
    </>
  );
}
