import React from "react";
import "./Navbar.css";
import logo from "../../assets/OIP.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./../../features/Auth/authSlice";
import { toast } from "react-toastify";

const Navbar = ({ page }) => {
  const dispatch = useDispatch();

  return (
    <nav className="navbar navbar-expand-lg navbar-right ">
      <Link to="/" className="navbar-brand underline-none">
        <img alt="image" src={logo} style={{ width: "35px" }} />
      </Link>
      <button
        className="navbar-toggler"
        style={{ outline: "none", border: "none" }}
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavDropdown"
        aria-controls="navbarNavDropdown"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <div className="d-flex align-items-center">
          <span
            className="navbar-toggler-icon "
            style={{ width: "1.3em", height: "1.1em" }}
          ></span>{" "}
          <span className="" style={{ height: "1.1em" }}>
            MENU
          </span>
        </div>
      </button>

      <div className="collapse navbar-collapse " id="navbarNavDropdown">
        <form className="form-inline rounded">
          <div className="input-group  ">
            <div className="input-group-prepend">
              <span
                className="input-group-text bg-white pt-1 pr-1"
                style={{ borderRight: "none" }}
                id="basic-addon1"
              >
                <span className="material-symbols-outlined ">Search </span>
              </span>
              {/* <i className="bi bi-search text-dark"></i> */}
              {/* <i className="fa-solid fa-magnifying-glass"></i> */}
            </div>
            <input
              type="text"
              style={{ borderLeft: "none" }}
              className="form-control  pl-1 pt-1 outline"
              placeholder="Search Blogxer"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </form>

        <ul className="navbar-nav d-flex align-items-center">
          {/* <Link> */}
          {page === "main" && (
            <a className="nav-item text-decoration-none">
              <Link to="/new-blog" className="nav-link text-decoration-none">
                <span className="material-symbols-outlined pr-2">
                  edit_square
                </span>
                write
              </Link>
            </a>
          )}
          {/* </Link> */}
          <li className="nav-item">
            {/* <a className="nav-link ">
              <span className="material-symbols-outlined ">notifications</span>
            </a> */}
          </li>
          <li className="nav-item">
            {/* <a className="nav-link">
              <span className="material-symbols-outlined profile ">
                account_circle
              </span>
            </a> */}
          </li>

          <li className="nav-item">
            <a
              className="nav-link "
              style={{ cursor: "pointer" }}
              onClick={() => {
                dispatch(logout());
                toast.warn("Logout Successfull ✅", {
                  position: toast.POSITION.TOP_CENTER,
                });
              }}
            >
              <span className="material-symbols-outlined">Logout</span> Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
