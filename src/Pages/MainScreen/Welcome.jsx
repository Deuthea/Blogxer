import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const Welcome = () => {
  return (
    <div className="p-4 flex flex-col items-center justify-center h-screen bg-[#242933] ">
      <h1 className="text-5xl font-bold text-center my-3 text-[#a6adba]">
        All your <span className="text-[#6419e6]">notes</span> <br /> under one
        roof!
      </h1>
      <p className="my-3 text-[#a6adba] mx-3">
        Now store your notes easily on our app.
      </p>
      <div className="my-3">
        <Link
          to="/login"
          className="px-3.5 py-3 mr-1 text-md font-semibold border rounded-lg text-[#a6adba] hover:text-[#242933] hover:bg-[#a6adba]"
        >
          LOGIN
        </Link>
        <Link
          to="/register"
          className="px-3.5 py-3 ml-1 text-md rounded-lg font-semibold bg-[#6419e6] text-white hover:bg-[#48199a]"
        >
          REGISTER
        </Link>
      </div>
    </div>
  );
};

export default Welcome;
