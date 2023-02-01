import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../Blogs/Blog";
import MainScreen from "../MainScreen/MainScreen";
import WriteBlog from "../WriteBlog/WriteBlog";

const PrimaryRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/new-blog" element={<WriteBlog />} />
        <Route path="/blog/:id" element={<Blog />} />
      </Routes>
    </div>
  );
};

export default PrimaryRoutes;
