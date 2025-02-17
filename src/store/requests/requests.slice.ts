import { RequestType } from "@mytypes/api/request/request.types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getRequestsThunk } from "./requests.actions";
import { PaginationType } from "@mytypes/pagination/pagination.types";

export interface RequestStateType extends RequestType {
  isChecked: boolean;
}

interface RequestsState {
  requests: RequestStateType[];
  isLoading: boolean;
}

const initialState: RequestsState = {
  requests: [],
  isLoading: false,
};

export const RequestsSlice = createSlice({
  name: "requests",
  initialState,
  reducers: {
    createRequest: (state, action) => {
      state.requests = [action.payload, ...state.requests];
    },

    updateRequest: (state, action) => {
      state.requests = state.requests.map((request) => {
        if (request.id === action.payload.id) {
          return action.payload;
        }
        return request;
      });
    },

    deleteRequest: (state, action) => {
      state.requests = state.requests.filter(
        (request) => request.id !== action.payload
      );
    },

    toggleChecked: (state, action) => {
      state.requests = state.requests.map((request) => {
        if (request.id === action.payload) {
          return { ...request, isChecked: !request.isChecked };
        }
        return request;
      });
    },

    toggleAllChecked: (state, action) => {
      state.requests = state.requests.map((request) => ({
        ...request,
        isChecked: action.payload,
      }));
    },
  },
  extraReducers(builder) {
    builder.addCase(
      getRequestsThunk.fulfilled,
      (state, action: PayloadAction<PaginationType<RequestType>>) => {
        state.requests = action.payload.data.map((request) => ({
          ...request,
          isChecked: false,
        }));
        state.isLoading = false;
      }
    );
    builder.addCase(getRequestsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getRequestsThunk.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const {
  createRequest,
  updateRequest,
  deleteRequest,
  toggleChecked,
  toggleAllChecked,
} = RequestsSlice.actions;

export default RequestsSlice.reducer;
