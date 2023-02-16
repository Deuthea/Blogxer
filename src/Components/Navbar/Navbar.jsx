import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/OIP.jpg";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "./../../features/Auth/authSlice";
import { toast } from "react-toastify";

const Navbar = ({ page }) => {
  const dispatch = useDispatch();
  const [mode, setMode] = useState(false);
  console.log(mode);

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
            <li className="nav-item ">
              <Link to="/new-blog" className="nav-link text-decoration-none">
                <span className="material-symbols-outlined pr-2">
                  edit_square
                </span>
                write
              </Link>
            </li>
          )}

          {/* <li className="nav-item">
            <Link to="/profile" className="nav-link text-decoration-none">
              <span className="material-symbols-outlined profile ">
                account_circle
              </span>
            </Link>
          </li> */}
          <li class="nav-item">
            <a
              class="nav-link d-flex align-items-center"
              href="#"
              // data-bs-toggle="dropdown"
            >
              <span className="material-symbols-outlined profile-blog pr-2">
                <img
                  style={{
                    height: "25px",
                    width: "25px",
                    objectFit: "cover",
                  }}
                  src="https://source.unsplash.com/random"
                  className="  rounded-pill "
                  alt="..."
                />
              </span>
              <span
                class="d-none d-md-block  ps-2"
                onClick={() => setMode(!mode)}
              >
                K. Anderson
              </span>
            </a>

            <ul
              className="bg-dark d-flex text-white flex-column px-3"
              style={{
                position: "absolute",
                display: `${mode ? "block" : "none"}`,
              }}
            >
              <li class="nav-link d-flex flex-column">
                <h6>Kevin Anderson</h6>
                <span>Web Designer</span>
              </li>
              <hr class="dropdown-divider" />

              <li class="nav-link">
                <a>
                  <i class="bi bi-person"></i>
                  <span>My Profile</span>
                </a>
              </li>
              <hr class="dropdown-divider" />

              <li className="nav-link">
                <a
                  className=""
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    dispatch(logout());
                    toast.warn("Logout Successfull ✅", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                  }}
                >
                  <span className="material-symbols-outlined ">Logout</span>{" "}
                  Logout
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item-logout bg-dark  rounded-pill px-3">
            <a
              className="nav-link border-0"
              style={{ cursor: "pointer", color: "white" }}
              onClick={() => {
                dispatch(logout());
                toast.warn("Logout Successfull ✅", {
                  position: toast.POSITION.TOP_CENTER,
                });
              }}
            >
              <span className="material-symbols-outlined text-white">
                Logout
              </span>{" "}
              Logout
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
