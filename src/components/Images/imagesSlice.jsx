import { createSlice } from "@reduxjs/toolkit";

export const imagesSlice = createSlice({
  name: "images",
  initialState: {
    value: [], //empty array with no objects
  },
  reducers: {
    addImage: (state, action) => {
      state.value.push(action.payload);
    },
    deleteImage: (state, action) => {
      state.value = state.value.filter((img) => img.id !== action.payload);
      console.log('state.value',state.value)
    },
    setAllImages: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { addImage, deleteImage, setAllImages } = imagesSlice.actions;


export const selectImages = (state) => state.images.value;

export default imagesSlice.reducer;
