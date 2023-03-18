import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import BlogsRecommend from "../BlogRight/BlogsRecommend";
import Blogs from "../Blogs/Blogs";
import Navbar from "../Navbar/Navbar";
import { Sidebar } from "../Sidebar/Sidebar";
import { RightSidebar } from "../Sidebar/RightSideBar";
import "./MainScreen.css";

const MainScreen = () => {
  const state = useSelector((state) => state.auth.isAuthenticated);
  if (!state) return <Navigate to="/register" replace />;
  else {
    return (
      <>
        <Navbar page="main" />
        <div className="main ">
          <section className="  w-0 mx-2  md:w-1/5">
            <Sidebar />
          </section>
          <section className=" w-5/5 md:w-3/5">
            <Blogs />
          </section>
          <section className="w-0 ml-5 md:w-1/5">
            <RightSidebar />
          </section>
        </div>
      </>
    );
  }
};

export default MainScreen;
