import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { logoutFunction } from "../../data/reducers/user.reducer";
import Blogs from "../Blog/Blogs";

const Home = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.userReducer).loggedIn;

  const logOut = () => {
    console.log("logout ");
    dispatch(logoutFunction());
  };

  if (!loggedIn) {
    return <Navigate to="/" replace />;
  }
  return (
    <div className="bg-[#242933] px-10 py-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold text-[#a6adba]">
          <Link to="/home">KeepNotes</Link>
        </h1>
        <div>
          <input
            type="text"
            className="outline-none px-3.5 py-3 mx-2 text-md rounded-lg font-semibold border  border-[#6419e6] text-[#6419e6] bg-transparent"
            placeholder="Search"
          />
          <button className=" px-3.5 py-3 mx-2  text-md rounded-lg font-semibold border  border-[#6419e6] text-[#6419e6] text-white hover:bg-[#6419e6] hover:text-white">
            SEARCH
          </button>
        </div>
        <div>
          <button
            onClick={logOut}
            className=" px-3.5 py-3  text-md rounded-lg font-semibold border  border-[#6419e6] text-[#6419e6] text-white hover:bg-[#6419e6] hover:text-white"
          >
            LOGOUT
          </button>
        </div>
      </div>
      <div className="flex flex-col text-[#a6adba] justify-center items-center my-20">
        <h1 className="text-5xl  font-bold w-1/3 text-center">
          Hello <span className="text-[#6419e6]">Tarun Choudhary!</span>
        </h1>
        <p className="text-1xl my-5">
          Make your life awesome by making notes for everything.
        </p>
        <Link
          to="/writeBlog"
          className=" px-3.5 py-3  text-md rounded-lg font-semibold bg-[#6419e6] text-white hover:bg-[#48199a]"
        >
          CREATE NEW NOTES
        </Link>
      </div>
      <Blogs />
    </div>
  );
};

export default Home;
