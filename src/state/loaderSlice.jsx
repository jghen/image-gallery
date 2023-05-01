import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  uploading: false,
};

export const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    isUploading: (state) => {
      state.uploading = true;
    },
    isNotUploading: (state) => {
      state.uploading = false;
    },
  },
});

export const { isUploading, isNotUploading } = loaderSlice.actions;

export const selectIsUploading = (state) => state.loader.uploading;

export default loaderSlice.reducer;
