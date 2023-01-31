import React from "react";
import { useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import "./style.css";

const Welcome = () => {
  const loggedIn = useSelector((state) => state.userReducer).loggedIn;
  // console.log(loggedIn);
  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }
  return (
    <>
      <div className="p-4 flex flex-col items-center justify-center h-screen bg-[#242933] text-[#a6adba]">
        <h1 className="text-5xl font-bold text-center my-3 ">
          All your <span className="text-[#2e21c2]">Blogs</span> <br /> under
          one roof!
        </h1>
        <p className="my-3 text-para-base mx-3">
          Now store your Blogs easily on our app.
        </p>
        <div className="my-3">
          <Link
            to="/login"
            className="px-3.5 py-3 mr-1 text-md font-semibold border border-[#2e21c2] rounded-lg text-[#2e21c2]   hover:text-[#242933] hover:bg-[#a6adba]"
          >
            LOGIN
          </Link>
          <Link
            to="/register"
            className="px-3.5 py-3 ml-1 text-md rounded-lg font-semibold bg-button-fill text-para-buttonText hover:opacity-50"
          >
            REGISTER
          </Link>
        </div>
      </div>
    </>
  );
};

export default Welcome;
