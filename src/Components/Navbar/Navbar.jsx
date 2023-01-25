import React from "react";
import "./Navbar.css";
import logo from "../../assets/OIP.jpg";

const Navbar = () => {
  return (
    <nav class="navbar navbar-expand-lg navbar-right ">
      <a class="navbar-brand" href="#">
        <img src={logo} style={{ width: "35px" }} />
      </a>
      <button
        class="navbar-toggler"
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
            class="navbar-toggler-icon "
            style={{ width: "1.3em", height: "1.1em" }}
          ></span>{" "}
          <span className="" style={{ height: "1.1em" }}>
            MENU
          </span>
        </div>
      </button>

      <div class="collapse navbar-collapse " id="navbarNavDropdown">
        <form class="form-inline rounded" >
          <div class="input-group  ">
            <div class="input-group-prepend">
              <span
                class="input-group-text bg-white  pr-1"
                style={{ borderRight: "none" }}
                id="basic-addon1"
              >
                <span class="material-symbols-outlined ">Search </span>
              </span>
              {/* <i class="bi bi-search text-dark"></i> */}
              {/* <i class="fa-solid fa-magnifying-glass"></i> */}
            </div>
            <input
              type="text"
              style={{ borderLeft: "none" }}
              class="form-control  pl-1 pt-1 outline"
              placeholder="Search Blogxer"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </div>
        </form>

        <ul class="navbar-nav d-flex align-items-center">
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span class="material-symbols-outlined pr-2">edit_square</span>
              write
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link " href="#">
              <span class="material-symbols-outlined ">notifications</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">
              <span class="material-symbols-outlined profile ">
                account_circle
              </span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
