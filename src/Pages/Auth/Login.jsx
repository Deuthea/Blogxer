import { data } from "autoprefixer";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import Loader from "../../Components/Loader/Loader";
import Navbar from "../../Components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { loginItem } from "../../data/reducers/user.reducer";

const Login = () => {
  const dispatch = useDispatch();
  const loggedIn = useSelector((state) => state.userReducer).loggedIn;
  const [data, setData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const submitLoginButton = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (data.email == "" || data.password == "") {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const res = await dispatch(loginItem(data));

      toast.success("Logged Successfully", { icon: "🚀" });
    } catch (error) {
      toast.error(error.message);
    }
    setLoading(false);
  };

  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div className="lg:h-screen h-screen pb-10  bg-[#242933] text-[#a6adba]">
      <Navbar />
      <ToastContainer />

      <div className="flex lg:flex-row flex-col-reverse lg:w-screen lg:my-20 my-2 lg:items-center justify-center">
        <div className="shadow-[#2a303c] mx-5 rounded-2xl lg:w-1/4 lg:px-5 lg:py-8 px-4 py-5 bg-[#2a303c]">
          <div className="px-3">
            <label className="text-sm">Email</label>
            <br />
            <input
              type="email"
              value={data.email}
              onChange={handleChange}
              name="email"
              placeholder="john@doe.com"
              className="p-3 my-2 w-full bg-[#2a303c] border rounded-lg outline-none border-[#a6adba]"
            />
          </div>
          <div className="px-3">
            <label className="text-sm">Password</label>
            <br />
            <input
              type="password"
              value={data.password}
              onChange={handleChange}
              name="password"
              placeholder="password"
              className="p-3 w-full my-2 bg-[#2a303c] border rounded-lg outline-none border-[#a6adba]"
            />
          </div>
          <div className="flex pt-4 px-3">
            <button
              onClick={submitLoginButton}
              className="outline-none w-full px-3.5 py-3  text-md rounded-lg font-semibold bg-[#6419e6] text-white hover:bg-[#48199a]"
            >
              {loading ? <Loader /> : "LOGIN"}
            </button>
          </div>
          <br />
          <div className="text-center">
            <Link to="/register" className="underline">
              Create an account
            </Link>
          </div>
        </div>
        <div className="lg:w-1/4 lg:mx-2 px-5 my-6 text-center">
          <h1 className="lg:text-5xl text-3xl font-bold lg:my-6 my-2">
            Welcome Back!
          </h1>
          <p className="text-1xl">
            Continue your notes-making journey by logging into your account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
