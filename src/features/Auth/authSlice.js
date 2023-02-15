import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    getUser: (state, action) => {
      state.user = localStorage.getItem("user") || "";
      state.token = localStorage.getItem("token") || "";
      state.isAuthenticated = localStorage.getItem("token") ? true : false;
    },
    loginUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.token ? true : false;
      state.token = action.payload.token;
    },
    registerUser: (state, action) => {
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.token ? true : false;
      state.token = action.payload.token;
    },
  },
});

export const { getUser, loginUser, registerUser } = authSlice.actions;

export default authSlice.reducer;
