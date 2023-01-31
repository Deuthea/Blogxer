import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Pages/MainScreen/Home";
import Welcome from "../Pages/MainScreen/Welcome";
import Login from "../Pages/Auth/Login";
import Register from "../Pages/Auth/Register";
 

const primaryRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/home" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
       
    </Routes>
  );
};

export default primaryRoutes;
