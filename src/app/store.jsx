import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from '../components/Images/imagesSlice.jsx'
import isSignedInReducer from './isSignedInSlice.jsx';

export default configureStore({
  reducer: {
    images: imagesReducer,
    isSignedIn: isSignedInReducer
  },
});