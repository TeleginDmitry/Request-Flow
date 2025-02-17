import RequestsTable from "@widgets/RequestsTable/RequestsTable";
import RequestsToolBar from "@widgets/RequestsToolBar/RequestsToolBar";
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

export function RequestsPage() {
  const dispatch = useAppDispatch();

  const requests = useAppSelector(requestsSelector);
  const isLoading = useAppSelector(isLoadingRequestsSelector);

  const { params: sortParams } = useRequestsSortParams();

  const fetchingRequests = useCallback(
    async ({ page }: CallbackProps) => {
      const requestsProps: RequestServiceType = {
        filters: { page },
        sortParams,
      };

      return await dispatch(getRequestsThunk(requestsProps)).unwrap();
    },
    [sortParams]
  );

  const { hasNextPage, onNextPage, onPrevPage, totalPages, page, onFetch } =
    usePagination<RequestType>({
      callback: fetchingRequests,
    });

  return (
    <>
      <RequestsToolBar requests={requests} getAllRequests={onFetch} />
      <RequestsTable
        isLoading={isLoading}
        requests={requests}
        hideButtons={false}
      />
      <LazyLoadingBut
        isLoading={isLoading}
        onNextPage={onNextPage}
        onPrevPage={onPrevPage}
        page={page}
        hasNextPage={hasNextPage}
        totalPages={totalPages}
      />
    </>
  );
}
