import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

import { logoutFunction } from "../../data/reducers/user.reducer";

const Home = () => {
  const dispatch = useDispatch();

  const loggedIn = useSelector((state) => state.userReducer).loggedIn;
  const userInfo = useSelector((state) => state.userReducer).userInfo;
  console.log(typeof userInfo);

  const logOut = () => {
    dispatch(logoutFunction());
    toast.success("Logout Successfully");
  };

  // if (!loggedIn) {
  // return <Navigate to="/" replace />;
  // }
  return (
    <div className="h-full">
      <div class="min-h-full">
        <nav class="bg-gray-800 h-16">
          <div>
            {/* <img /> */}
            <h1 className="text-base">Blogxer</h1>
          </div>
          <div></div>
        </nav>

        <header class="bg-white shadow">
          <div class="mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8">
            <h1 class="text-3xl font-bold tracking-tight text-gray-900">
              Dashboard
            </h1>
          </div>
        </header>
        <main>
          <div class="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
            {/* <!-- Replace with your content --> */}
            {/* <h1>sdfksdf=</h1> */}
            {/* <!-- /End replace --> */}
          </div>
        </main>
      </div>
      <ToastContainer />
    </div>
  );
  // };
};

export default Home;

// <!--
//   This example requires updating your template:

//   ```
//   <html class="h-full bg-gray-100">
//   <body class="h-full">
//   ```
// -->
