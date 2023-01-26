import React from "react";
import BlogsRecommend from "../BlogRight/BlogsRecommend";
import Blogs from "../Blogs/Blogs";
import "./MainScreen.css";

const MainScreen = () => {
  return (
    <div className="main">
      <section className="blog-left"><Blogs /></section>
      <section className="blog-right"><BlogsRecommend/></section>
    </div>
  );
};

export default MainScreen;
