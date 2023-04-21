import { createSlice } from "@reduxjs/toolkit";

export const isSignedInSlice = createSlice({
  name: "isSignedIn",
  initialState: {
    value: false, 
  },
  reducers: {
    setIsSignedIn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsSignedIn } = isSignedInSlice.actions;


export const selectIsSignedIn = (state) => state.isSignedIn.value;

export default isSignedInSlice.reducer;
