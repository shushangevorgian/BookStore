import React from "react";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@services/index";
import { IGeneralStateData } from "@models/index";

export const DeletBook = createAsyncThunk(
  "book/delete",
  async function (id: number) {
    try {
      const response = await api.delete(`data/${id}`);
      return id;
    } catch (err: any) {
      throw new Error(err);
    }
  }
);

const initialState: IGeneralStateData = {
  loading: true,
  error: "",
  isSuccess: false,
};
export const bookDeletingSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeDeleteState: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeletBook.pending, (state: IGeneralStateData) => {
        state.loading = true;
      })
      .addCase(
        DeletBook.fulfilled,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.data = state.data?.filter(
            (item: any) => item.id !== action.payload.id
          );
          state.loading = false;
          state.isSuccess = true;
        }
      )
      .addCase(
        DeletBook.rejected,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export default bookDeletingSlice.reducer;
export const { changeDeleteState } = bookDeletingSlice.actions;
