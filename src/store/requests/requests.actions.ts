import { RequestType } from "@mytypes/api/request/request.types";
import { PaginationType } from "@mytypes/pagination/pagination.types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getRequests } from "@services/requests.service";
import { RequestServiceType } from "@services/types/requests.types";

export const getRequestsThunk = createAsyncThunk<
  PaginationType<RequestType>,
  RequestServiceType
>("requests/getRequestsThunk", async (requestsProps, { rejectWithValue }) => {
  try {
    const requests = await getRequests(requestsProps);
    return requests;
  } catch (error) {
    return rejectWithValue(error);
  }
});
