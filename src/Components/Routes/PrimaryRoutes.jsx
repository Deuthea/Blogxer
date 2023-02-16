import React from "react";
import { Route, Routes } from "react-router-dom";
import Blog from "../Blogs/Blog";
import Login from "../Auth/Login";
import MainScreen from "../MainScreen/MainScreen";
import Register from "../Auth/Register";
import WriteBlog from "../WriteBlog/WriteBlog";
import Profile from "../Profile/Profile";

const PrimaryRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<MainScreen />} />
        <Route path="/new-blog" element={<WriteBlog />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default PrimaryRoutes;
