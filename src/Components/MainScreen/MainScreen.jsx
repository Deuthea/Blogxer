import React from "react";
import BlogsRecommend from "../BlogRight/BlogsRecommend";
import Blogs from "../Blogs/Blogs";
import Navbar from "../Navbar/Navbar";
import "./MainScreen.css";

const MainScreen = () => {
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
};

export default MainScreen;
