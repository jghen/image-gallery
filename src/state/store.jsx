import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from '../components/Images/imagesSlice.jsx'
import authReducer from './authSlice.jsx';
import loaderReducer from './loaderSlice.jsx';

export default configureStore({
  reducer: {
    images: imagesReducer,
    auth: authReducer,
    loader: loaderReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
});