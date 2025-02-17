import { useCallback, useEffect } from "react";
import RequestsTable from "@widgets/RequestsTable/RequestsTable";
import LazyLoadingBut from "@components/LazyLoadingBut/LazyLoadingBut";
import TitleBack from "@components/TitleBack/TitleBack";

import { REQUESTS_PAGE } from "@configs/routes";
import { RequestType } from "@mytypes/api/request/request.types";
import { CallbackProps, usePagination } from "@hooks/usePagination";
import { RequestServiceType } from "@services/types/requests.types";
import { useAppSelector } from "@hooks/useAppSelector";
import {
  isLoadingRequestsSelector,
  requestsSelector,
} from "@store/requests/requests.selectors";
import { useAppDispatch } from "@hooks/useAppDispatch";
import { getRequestsThunk } from "@store/requests/requests.actions";
import { useRequestsSortParams } from "@hooks/useRequestsSortParams";
import { useFilters } from "@hooks/useFilters";
import { useNavigate } from "react-router-dom";

export function SearchPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const requests = useAppSelector(requestsSelector);
  const isLoading = useAppSelector(isLoadingRequestsSelector);

  const { params: sortParams } = useRequestsSortParams();

  const { filters } = useFilters();

  const fetchingRequests = useCallback(
    async ({ page }: CallbackProps) => {
      const requestsProps: RequestServiceType = {
        filters: {
          page,
          ...filters,
        },
        sortParams,
      };

      return await dispatch(getRequestsThunk(requestsProps)).unwrap();
    },
    [dispatch, sortParams, filters]
  );

  const { hasNextPage, onNextPage, onPrevPage, totalPages, page } =
    usePagination<RequestType>({
      callback: fetchingRequests,
    });

  useEffect(() => {
    const hasNoAnyFilter = Object.values(filters).every((value) => !value);

    if (hasNoAnyFilter) {
      navigate(-1);
    }
  }, [filters]);

  return (
    <>
      <TitleBack title="Результаты поиска:" link={REQUESTS_PAGE} />
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
        totalPages={totalPages}
        page={page}
      />
    </>
  );
}
