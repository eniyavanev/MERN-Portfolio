import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
