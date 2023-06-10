import React from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@services/index";
import { IGeneralStateData } from "@models/index";

export const gettingOneBooksData = createAsyncThunk(
  "data/book",
  async (id: string) => {
    try {
      const response = await api.get(`data/${id}`);
      return response.data;
    } catch (error: any) {
      throw new Error(error);
    }
  }
);
const initialState: IGeneralStateData = {
  loading: true,
  error: "",
  data: [],
};

export const bookOneSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gettingOneBooksData.pending, (state: IGeneralStateData) => {
        state.loading = true;
      })
      .addCase(
        gettingOneBooksData.fulfilled,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.single = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        gettingOneBooksData.rejected,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export default bookOneSlice.reducer;
