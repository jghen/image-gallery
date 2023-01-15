import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from '../components/Images/imagesSlice.jsx'

export default configureStore({
  reducer: {
    images: imagesReducer,
  },
});