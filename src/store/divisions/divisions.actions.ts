import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  createDivision,
  getDivisions,
  updateDivision,
} from "@services/divisions.service";

export const getDivisionsThunk = createAsyncThunk(
  "divisions/getDivisionsThunk",
  async () => {
    try {
      const divisions = await getDivisions();
      return divisions;
    } catch (error) {
      throw new Error("Возникла ошибка при получении направлений!");
    }
  }
);

export const createDivisionThunk = createAsyncThunk(
  "divisions/createDivisionThunk",
  async (name: string, { rejectWithValue }) => {
    try {
      const division = await createDivision(name);
      return division;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const updateDivisionThunk = createAsyncThunk(
  "divisions/updateDivisionThunk",
  async ({ id, name }: { id: number; name: string }, { rejectWithValue }) => {
    try {
      const division = await updateDivision(id, name);
      return division;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
