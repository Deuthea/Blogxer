import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Loader from "../../Components/Loader/Loader";
import Navbar from "../../Components/Navbar";
import { signupItem } from "../../data/reducers/user.reducer";

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
  });

  const loggedIn = useSelector((state) => state.userReducer).loggedIn;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const submitLoginForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (data.email == "" || data.password == "" || data.name == "") {
      toast.error("All fields are required");
      setLoading(false);
      return;
    }
    try {
      const res = await dispatch(signupItem(data));
      console.log(res);
      toast.success("Register Successfully");
      if(res.error){
        toast.error();

      }
    } catch (error) {
      console.log(error);
      toast.error(error.error);
    }
    setLoading(false);
  };

  if (loggedIn) {
    return <Navigate to="/home" replace />;
  }
  return (
    <div className="lg:h-screen pb-10 bg-[#242933] text-[#a6adba]">
      <Navbar />
      <ToastContainer />
      <div className="flex lg:flex-row lg:my-20 flex-col-reverse lg:w-screen lg:items-center justify-center">
        <div className="shadow-[#2a303c] mx-5 lg:mx-2 rounded-2xl lg:w-1/4  lg:px-5 lg:py-8 px-4 py-5 m-0 bg-[#2a303c]">
          <div className="px-3">
            <label className="text-sm">Name</label>
            <br />
            <input
              type="text"
              value={data.name}
              onChange={handleChange}
              name="name"
              placeholder="John Doe"
              className="p-3 my-2 w-full bg-[#2a303c] border rounded-lg outline-none border-[#a6adba]"
            />
          </div>
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
              onClick={submitLoginForm}
              className="w-full px-3.5 py-3  text-md rounded-lg font-semibold bg-[#6419e6] text-white hover:bg-[#48199a]"
            >
              {loading ? <Loader /> : "REGISTER"}
            </button>
          </div>
          <br />
          <div className="text-center">
            <Link to="/login" className="underline">
              Already have an account ? Login{" "}
            </Link>
          </div>
        </div>
        <div className="lg:w-1/4 lg:mx-2 px-5 my-6 text-center">
          <h1 className="lg:text-5xl text-3xl font-bold lg:my-6 my-2">
            Welcome Back!
          </h1>
          <p className="text-1xl">
            Begin your notes-making journey by creating a new account.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
