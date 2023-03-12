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
    addComment: (state, action) => {
      state.currentBlog.comments.push(action.payload.comment);
      // console.log("current blog reducer" + currentBlog);
      // localStorage.setItem("currentBlog", currentBlog);
    },
    deleteCommentRed: (state, action) => {
      console.log("action.payload", action.payload);
      state.currentBlog.comments = action.payload;
    },
    currentBlog: (state, action) => {
      localStorage.setItem("currentBlog", JSON.stringify(action.payload));
      state.currentBlog = action.payload;
    },
    updateBlog: () => {},
  },
});

export const {
  getBlog,
  updateBlog,
  addComment,
  addBlog,
  currentBlog,
  deleteCommentRed,
} = blogSlice.actions;

export default blogSlice.reducer;
