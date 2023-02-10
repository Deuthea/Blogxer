import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: {},
    token: "",
    isAuthenticated: false,
  },
  reducers: {
    getUser: (state, action) => {},
    loginUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = action.payload.token ? true : false;
    },
    registerUser: () => {},
  },
});

export const { getUser, loginUser, registerUser } = authSlice.actions;

export default authSlice.reducer;
