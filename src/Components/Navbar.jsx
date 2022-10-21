import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="bg-[#2a303c] py-4 px-10 text-xm text-[#a6adba]">
      <i class="mx-3 fas fa-home"></i>
      <Link to="/" className="hover:underline">
        Home
      </Link>
      <i class="mx-4 fas fa-chevron-right"></i>
      {location.pathname == "/login" && (
        <Link to="/login" className="hover:underline">
          login
        </Link>
      )}
      {location.pathname == "/register" && (
        <Link to="/register" className="hover:underline">
          register
        </Link>
      )}
    </div>
  );
};

export default Navbar;
