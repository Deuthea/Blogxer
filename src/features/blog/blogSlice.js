import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: [],
  },
  reducers: {
    getBlog: () => {},
    updateBlog: () => {},
  },
});

export const {getBlog,updateBlog} = blogSlice.actions;

export default blogSlice.reducer;
