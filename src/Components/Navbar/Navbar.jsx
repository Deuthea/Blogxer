import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/OIP.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../features/Auth/authSlice";
import { toast } from "react-toastify";

const Navbar = ({ page }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.user);
  const [mode, setMode] = useState(false);
  // console.log(mode);
  // console.log(state);

  return (
    <nav className=" navbar navbar-expand-lg navbar-right ">
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
            {/* <a
              class="nav-link d-flex"
              href="#"
               
            >
              <span className="material-symbols-outlined profile-blog ">
                <img
                  style={{
                    height: "30px",
                    width: "30px",
                    objectFit: "cover",
                  }}
                  src="https://source.unsplash.com/random"
                  className="  rounded-pill "
                  alt="..."
                />
              </span>
              <span className="py-1 px-2" onClick={() => setMode(!mode)}>
                {state?.name}
              </span>
            </a> */}

            <span
              className="contact-pill"
              style={{ cursor: "pointer" }}
              onClick={() => setMode(!mode)}
            >
              <img
                className="rounded-pill"
                style={{
                  height: "40px",
                  width: "40px",
                  objectFit: "cover",
                }}
                src="https://source.unsplash.com/random"
              />
              {state?.name}
            </span>

            <ul
              className={
                mode
                  ? "bg-white border rounded px-4 py-2  z-index-2 d-flex flex-column"
                  : "d-none"
              }
              // className={`bg-white border rounded px-4 py-2  z-index-2 ${mode}d-flex flex-column`}
              style={{
                position: "absolute",
                boxShadow:
                  "0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.19)",

                zIndex: "100",
              }}
            >
              <li class="nav-link d-flex flex-column ">
                <h6 className="font-weight-bold">{state?.name}</h6>
                <span className="text-center">Web Designer</span>
              </li>
              <hr class="dropdown-divider" />

              <li class="nav-link">
                <Link
                  to="/profile"
                  className="text-decoration-none text-dark"
                  style={{ cursor: "pointer", display: "flex" }}
                >
                  <span class="material-symbols-outlined pr-2">
                    account_circle
                  </span>
                  My Profile
                </Link>
              </li>
              <hr class="dropdown-divider" />

              <li className="nav-link">
                <a
                  className=""
                  style={{ cursor: "pointer", display: "flex" }}
                  onClick={() => {
                    dispatch(logout());
                    toast.warn("Logout Successfull ✅", {
                      position: toast.POSITION.TOP_CENTER,
                    });
                  }}
                >
                  <span className="material-symbols-outlined pr-2">Logout</span>{" "}
                  Logout
                </a>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
