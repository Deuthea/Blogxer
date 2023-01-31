import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  // console.log(location.pathname);
  return (
    <div className="bg-[#2a303c] py-4 px-10 text-xm text-[#a6adba]">
      <i class="mx-3 fas fa-home"></i>
      {(location.pathname == "/login" ||
        location.pathname == "/register" ||
        location.pathname == "/writeBlog") && (
        <Link to="/" className="hover:underline">
          Home
        </Link>
      )}

      <i class="mx-4 fas fa-chevron-right"></i>

      {location.pathname == "/register" && (
        <Link to="/register" className="hover:underline">
          register
        </Link>
      )}
      {location.pathname == "/writeBlog" && (
        <Link to="/writeBlog" className="hover:underline">
          Create Blog
        </Link>
      )}
    </div>
  );
};

export default Navbar;
