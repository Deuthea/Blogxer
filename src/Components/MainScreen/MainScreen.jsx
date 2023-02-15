import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BlogsRecommend from "../BlogRight/BlogsRecommend";
import Blogs from "../Blogs/Blogs";
import Navbar from "../Navbar/Navbar";
import "./MainScreen.css";

const MainScreen = () => {
  const state = useSelector((state) => state.auth.isAuthenticated);
  if (!state) return <Navigate to="/register" replace />;
  else {
    return (
      <>
        <Navbar page="main" />
        <div className="main">
          <section className="blog-left">
            <Blogs />
          </section>
          <section className="blog-right">
            <BlogsRecommend />
          </section>
        </div>
      </>
    );
  }
};

export default MainScreen;
