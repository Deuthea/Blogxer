import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addNoteAPI, getNoteAPI } from "../services/ṇote.services";

export const addNoteItem = createAsyncThunk(
  "note/addNoteItem",
  async (payload, thunkAPI) => {
    let response = await addNoteAPI(payload);
    // console.log("res=", response);
    console.log("responseeee=", response);
    if (response.isSuccessful === true) {
      return response.data;
    } else thunkAPI.rejectWithValue("network call failed");
  }
);

export const getNoteItem = createAsyncThunk(
  "note/getNoteItem",
  async (payload, thunkAPI) => {
    let response = await getNoteAPI(payload);
    // console.log("res=", response);
    console.log("responseeee=", response);
    if (response.isSuccessful === true) {
      return response.data;
    } else thunkAPI.rejectWithValue("network call failed");
  }
);

const noteSlice = createSlice({
  name: "note",
  initialState: {
    notes: [],
  },

  extraReducers: {
    [addNoteItem.fulfilled]: (state, action) => {},
    [getNoteItem.fulfilled]: (state, action) => {
      if (action.payload) {
        state.notes = action.payload.Blogs;
      } else {
        // state.loggedIn = false;
      }
    },
  },
});
export default noteSlice.reducer;
