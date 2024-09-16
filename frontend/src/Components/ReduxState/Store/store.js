import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../Slices/authSlice";
import { apiSlice } from "../Slices/apiSlice";

const store = configureStore({
  reducer: {
    userInfo: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
   middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default store;
