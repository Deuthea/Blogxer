import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { signupAPI, loginAPI } from "../services/user.services";

export const loginItem = createAsyncThunk(
  "user/loginItem",
  async (payload, thunkAPI) => {
    let response = await loginAPI(payload);
    // console.log("res=", response);
    console.log("responseeee=", response);
    if (response.isSuccessful === true) {
      return response.data;
    } else thunkAPI.rejectWithValue("network call failed");
  }
);
export const signupItem = createAsyncThunk(
  "user/signupItem",
  async (payload, thunkAPI) => {
    let response = await signupAPI(payload);
    console.log("responseeee=", response);

    if (response.isSuccessful === true) {
      return response.data;
    } else return thunkAPI.rejectWithValue("network call failed");
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: localStorage.getItem("userInfo"),
    loggedIn: localStorage.getItem("loggedIn") || false,
    token: localStorage.getItem("token") || "",
  },
  reducers: {
    logoutFunction: (state, action) => {
      state.userInfo = "";
      state.token = "";

      localStorage.removeItem("token");
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("userInfo");
      let updateConnector = false;
      state.loggedIn = updateConnector;
    },
  },
  extraReducers: {
    [loginItem.fulfilled]: (state, action) => {
      if (action.payload.token) {
        state.userInfo = action.payload;
        let updateConnector = true;
        state.loggedIn = updateConnector;
        state.token = action.payload.token;
        localStorage.setItem("loggedIn", state.loggedIn);
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        localStorage.setItem("token", state.token);
      } else {
        state.loggedIn = false;
      }
    },
    [signupItem.fulfilled]: (state, action) => {
      if (action.payload.token) {
        state.userInfo = action.payload;
        let updateConnector = true;
        state.loggedIn = updateConnector;
        state.token = action.payload.token;
        localStorage.setItem("loggedIn", state.loggedIn);
        localStorage.setItem("userInfo", JSON.stringify(state.userInfo));
        localStorage.setItem("token", state.token);
      } else {
        state.loggedIn = false;
      }
    },
  },
});
export const { logoutFunction } = userSlice.actions;
export default userSlice.reducer;
