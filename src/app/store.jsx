import { configureStore } from '@reduxjs/toolkit';
import galleryReducer from '../views/Gallery/gallerySlice.jsx'

export default configureStore({
  reducer: {
    gallery: galleryReducer,
  },
});