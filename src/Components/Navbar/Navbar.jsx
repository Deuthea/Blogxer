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
    <>
      <nav class="bg-gray-800">
        <div class="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
          <div class="relative flex h-16 items-center justify-between">
            <div class="absolute inset-y-0 left-0 flex items-center sm:hidden">
              <button
                type="button"
                class="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                aria-controls="mobile-menu"
                aria-expanded="false"
              >
                <span class="sr-only">Open main menu</span>

                <svg
                  class="block h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>

                <svg
                  class="hidden h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
              <div class="flex flex-shrink-0 items-center">
                <img
                  class="block h-8 w-auto lg:hidden"
                  src={logo}
                  alt="Your Company"
                />
                <img
                  class="hidden h-8 w-auto lg:block"
                  src={logo}
                  alt="Your Company"
                />
              </div>
              
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              <button
                type="button"
                class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                <span class="sr-only">View notifications</span>
                <svg
                  class="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                  />
                </svg>
              </button>

              <div class="relative ml-3">
                <div>
                  <button
                    type="button"
                    class="flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      class="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </button>
                </div>

                <div
                  class="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-0"
                  >
                    Your Profile
                  </a>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-1"
                  >
                    Settings
                  </a>
                  <a
                    href="#"
                    class="block px-4 py-2 text-sm text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                  >
                    Sign out
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <!-- Mobile menu, show/hide based on menu state. --> */}
        <div class="sm:hidden" id="mobile-menu">
          <div class="space-y-1 px-2 pt-2 pb-3">
            <a
              href="#"
              class="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              aria-current="page"
            >
              Dashboard
            </a>

            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Team
            </a>

            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Projects
            </a>

            <a
              href="#"
              class="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
            >
              Calendar
            </a>
          </div>
        </div>
      </nav>
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
                    <span className="material-symbols-outlined pr-2">
                      Logout
                    </span>{" "}
                    Logout
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
