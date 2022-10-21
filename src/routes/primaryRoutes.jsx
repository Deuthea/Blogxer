import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/MainScreen/Home";
import Welcome from "../Pages/MainScreen/Welcome";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
import Blog from "../Pages/Blog/Blog";
import Blogs from "../Pages/Blog/Blogs";
import WriteBlog from "../Pages/Blog/WriteBlog";
import Contact from "../Pages/Contact/Contact";

const primaryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/writeBlog" element={<WriteBlog />} />
      <Route path="/blog/:id" element={<Blog />} />
      <Route path="/blogs" element={<Blogs />} />
    </Routes>
  );
};

export default primaryRoutes;
