import { configureStore } from '@reduxjs/toolkit';
import imagesReducer from '../components/Images/imagesSlice.jsx'
import authReducer from './authSlice.jsx';

export default configureStore({
  reducer: {
    images: imagesReducer,
    auth: authReducer,
  },
});