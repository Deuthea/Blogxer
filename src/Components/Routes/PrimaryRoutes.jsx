import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../Blogs/Blog";
import Login from "../Login/Login";
import MainScreen from "../MainScreen/MainScreen";
import Register from "../Register/Register";
import WriteBlog from "../WriteBlog/WriteBlog";

const PrimaryRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/new-blog" element={<WriteBlog />} />
        <Route path="/blog/:id" element={<Blog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
  );
};

export default PrimaryRoutes;
