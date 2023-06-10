import React from "react";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@services/index";
import { IGeneralStateData, IGeneralStateDataAdding } from "@models/index";
import { toBase64 } from "@helpers/helper";

export const addingBook = createAsyncThunk<unknown, IGeneralStateDataAdding>(
  "book/add",
  async function ({ title, prices, discount, body, fileUploaded, callback }) {
    try {
      const response = await api.post(`data`, {
        title: title,
        price: prices,
        discount: discount,
        image: String(await toBase64(fileUploaded)),
        body: body,
      });
      callback();
      return { title, body, fileUploaded, prices, discount };
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
export const bookAddingSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeAddingState: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addingBook.pending, (state: IGeneralStateData) => {
        state.loading = true;
      })
      .addCase(
        addingBook.fulfilled,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.data?.push(action.payload);
          state.loading = false;
          state.isSuccess = true;
        }
      )
      .addCase(
        addingBook.rejected,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export default bookAddingSlice.reducer;
export const { changeAddingState } = bookAddingSlice.actions;
