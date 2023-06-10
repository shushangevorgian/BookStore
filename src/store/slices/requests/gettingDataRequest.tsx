import React from "react";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "@services/index";
import { IGeneralStateData } from "@models/index";

export const gettingBooksData = createAsyncThunk("data/books", async () => {
  try {
    const response = await api.get("data");
    return response.data;
  } catch (error: any) {
    throw new Error(error);
  }
});
const initialState: IGeneralStateData = {
  loading: true,
  error: "",
};

export const bookSlice = createSlice({
  name: "books",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(gettingBooksData.pending, (state: IGeneralStateData) => {
        state.loading = true;
      })
      .addCase(
        gettingBooksData.fulfilled,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.data = action.payload;
          state.loading = false;
        }
      )
      .addCase(
        gettingBooksData.rejected,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export default bookSlice.reducer;
