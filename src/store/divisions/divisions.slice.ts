import { DivisionType } from "@mytypes/api/division/division.types";
import { createSlice } from "@reduxjs/toolkit";
import {
  createDivisionThunk,
  getDivisionsThunk,
  updateDivisionThunk,
} from "./divisions.actions";

interface DivisionsState {
  divisions: DivisionType[];
  isLoading: boolean;
}

const initialState: DivisionsState = {
  divisions: [],
  isLoading: false,
};

export const DivisionsSlice = createSlice({
  name: "divisions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDivisionsThunk.fulfilled, (state, action) => {
      state.divisions = action.payload;
      state.isLoading = false;
    });
    builder.addCase(getDivisionsThunk.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(getDivisionsThunk.rejected, (state) => {
      state.isLoading = false;
    });

    builder.addCase(createDivisionThunk.fulfilled, (state, action) => {
      state.divisions = [...state.divisions, action.payload];
    });

    builder.addCase(updateDivisionThunk.fulfilled, (state, action) => {
      state.divisions = state.divisions.map((division) => {
        if (division.id === action.payload.id) {
          return action.payload;
        }
        return division;
      });
    });
  },
});

export default DivisionsSlice.reducer;
