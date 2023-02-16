import { createSlice } from "@reduxjs/toolkit";

export const blogSlice = createSlice({
  name: "blog",
  initialState: {
    blogs: JSON.parse(localStorage.getItem("blogs")) || [],
    currentBlog: JSON.parse(localStorage.getItem("currentBlog")) || {},
  },

  reducers: {
    getBlog: (state, action) => {
      localStorage.setItem("blogs", JSON.stringify(action.payload));
      state.blogs = action.payload;
    },
    addBlog: (state, action) => {
      state.blogs.push(action.payload);
    },
    currentBlog: (state, action) => {
      localStorage.setItem("currentBlog", JSON.stringify(action.payload));
      state.currentBlog = action.payload;
    },
    updateBlog: () => {},
  },
});

export const { getBlog, updateBlog, addBlog, currentBlog } = blogSlice.actions;

export default blogSlice.reducer;
