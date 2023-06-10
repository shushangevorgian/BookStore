import React from "react";
import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "@services/index";
import { IGeneralStateData, IGeneralStateDataAdding } from "@models/index";
import { toBase64 } from "@helpers/helper";

export const updateingBook = createAsyncThunk<unknown, IGeneralStateDataAdding>(
  "book/update",
  async function ({
    title,
    prices,
    discount,
    body,
    fileUploaded,
    id,
    callback,
  }) {
    try {
      const response = await api.put(`data/${id}`, {
        title: title,
        price: prices,
        discount: discount,
        image:
          typeof fileUploaded !== "string"
            ? String(await toBase64(fileUploaded))
            : fileUploaded,
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
export const bookUpdatingSlice = createSlice({
  name: "books",
  initialState,
  reducers: {
    changeUpdatingState: (state) => {
      state.isSuccess = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateingBook.pending, (state: IGeneralStateData) => {
        state.loading = true;
      })
      .addCase(
        updateingBook.fulfilled,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.loading = false;
          state.id = action.payload.id;
          state.data = state.data?.map((content) =>
            content.id === action.payload.id
              ? {
                  ...content,
                  id: action.payload.id,
                  title: action.payload.title,
                  body: action.payload.body,
                  prices: action.payload.price,
                  discount: action.payload.discount,
                  fileUploaded: action.payload.image,
                }
              : content
          );
          state.isSuccess = true;
        }
      )
      .addCase(
        updateingBook.rejected,
        (state: IGeneralStateData, action: PayloadAction<any>) => {
          state.error = action.payload;
          state.loading = false;
        }
      );
  },
});

export default bookUpdatingSlice.reducer;
export const { changeUpdatingState } = bookUpdatingSlice.actions;
