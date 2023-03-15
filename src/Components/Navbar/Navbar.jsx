import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/OIP.jpg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "./../../features/Auth/authSlice";
import { toast } from "react-toastify";
import Button from "../Button/Button";

const Navbar = ({ page }) => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.auth.user);
  const profile = useSelector((state) => state.auth.userProfile);
  const [mode, setMode] = useState(false);
  const [links, setLinks] = useState([
    {
      path: "/dashboard",
      content: "DashBoard",
    },
    {
      path: "/new-blog",
      content: "Create Blog",
    },
    {
      path: "/edit-profile",
      content: "Edit Profile",
    },
    {
      path: "/bookmarks",
      content: "Bookmarks",
    },
    {
      path: "/setting",
      content: "Settings",
    },
  ]);
  // console.log(mode);
  // console.log(state);
  console.log(page);

  return (
    <>
      <nav class="bg-white border navbar">
        <div class="mx-auto  max-w-7xl px-2 sm:px-6 lg:px-8">
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
                <Link to="/">
                  <img
                    class="block h-8 w-auto lg:hidden"
                    src={logo}
                    alt="Your Company"
                  />
                </Link>
                <Link className="flex" to="/">
                  <Button class="bg-black text-white">Blogxer</Button>
                </Link>
              </div>
            </div>
            <div class="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
              {
                <Link to="/new-blog" className="px-2">
                  <Button class="border text-blue-700 hover:bg-blue-700 hover:text-white border-blue-700">
                    Create Blog
                  </Button>
                </Link>
              }

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
                      onClick={() => setMode(!mode)}
                      class="h-8 w-8 rounded-full  object-contain"
                      src={profile?.profilePic}
                      alt=""
                    />
                  </button>
                </div>

                <div
                  className={`absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none ${
                    mode ? "block" : "hidden"
                  }`}
                  role="menu"
                  aria-orientation="vertical"
                  aria-labelledby="user-menu-button"
                  tabindex="-1"
                >
                  <Link
                    to="/profile"
                    class=" flex flex-col align-middle justify-start pb-2 px-4    text-gray-700"
                  >
                    <span className="text-lg font-bold">{state.name}</span>
                    <span className="text-md"> @tarun_choudhary</span>
                  </Link>
                  <hr className="border-b-1 mx-3" />
                  {links?.map((link) => (
                    <Link
                      key={link.path}
                      to={link.path}
                      class="flex align-middle hover:text-blue-500 justify-start  px-3 py-2 text-md text-gray-700"
                      role="menuitem"
                      tabindex="-1"
                      id="user-menu-item-0"
                    >
                      <span className="mr-1"></span>

                      <span className="">{link.content}</span>
                    </Link>
                  ))}
                  <hr className="border-b-1 mx-3" />
                  <a
                    onClick={() => {
                      dispatch(logout());
                      toast.warn("Logout Successfull ✅", {
                        position: toast.POSITION.TOP_CENTER,
                      });
                    }}
                    // href="#"
                    class="flex cursor-pointer justify-start px-3 py-2 text-md text-gray-700"
                    role="menuitem"
                    tabindex="-1"
                    id="user-menu-item-2"
                  >
                    <span className="mr-1"></span>
                    <span> Sign out</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
