import { configureStore } from "@reduxjs/toolkit";
import { bookSlice } from "@store/slices/requests/index";
import { bookDeletingSlice } from "@store/slices/requests/deletingDataRequest";
import { bookAddingSlice } from "@store/slices/requests/addingDataRequest";
import { bookUpdatingSlice } from "@store/slices/requests/updatinDataRequest";
import { bookOneSlice } from "@store/slices/requests/gettingOneBookInfoRequest";

const store = configureStore({
  reducer: {
    gettingData: bookSlice.reducer,
    deletingData: bookDeletingSlice.reducer,
    addingData: bookAddingSlice.reducer,
    updatingData: bookUpdatingSlice.reducer,
    oneInfo: bookOneSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
export default store;
