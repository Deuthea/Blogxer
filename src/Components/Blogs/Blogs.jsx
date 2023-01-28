import React from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const Blogs = () => {
  return (
    <div>
      <Link className="text-dark text-decoration-none" to="/blog">
        <div class=" mb-3 mt-2 border-bottom">
          <div class=" row g-0 mb-3">
            <div class="px-0 col-md-9">
              <div class="card-body">
                <p className="d-flex align-items-center ">
                  <span class="material-symbols-outlined profile-blog pr-2">
                    <img
                      style={{
                        height: "25px",
                        width: "25px",
                        objectFit: "cover",
                      }}
                      src="https://source.unsplash.com/random"
                      class="  rounded-pill "
                      alt="..."
                    />
                  </span>
                  <span
                    class="card-tile font-weight-bold pt-2"
                    style={{ fontSize: "14px" }}
                  >
                    Tarun Choudhary
                  </span>
                  <span className="pl-2 pt-2">·</span>
                  <span
                    class="pt-2 px-2"
                    style={{
                      fontSize: "13px",
                      fontWeight: "400",
                      color: "#333",
                    }}
                  >
                    Feb 7, 2016
                  </span>
                </p>
                <h5 class="card-title font-weight-bold">
                  Card with an image on left
                </h5>
                <p class="card-text">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </p>
                <p className="d-flex justify-content-between">
                  <p>
                    <span
                      class="rounded-pill"
                      style={{
                        fontSize: "13px",
                        background: "#f0f0f0",
                        padding: "5px 8px",
                        fontWeight: "400",
                        color: "#000",
                      }}
                    >
                      Artificial Intellijence
                    </span>
                    <span className="pl-2">·</span>
                    <span
                      class=""
                      style={{
                        fontSize: "13px",
                        // background: "#f0f0f0",
                        padding: "5px 8px",
                        fontWeight: "400",
                        color: "#666",
                      }}
                    >
                      6 min read
                    </span>
                  </p>
                  <p>
                    <span class="material-symbols-outlined">bookmark_add</span>
                  </p>
                </p>
              </div>
            </div>
            <div class="px-4 py-5 col-md-3 ">
              <img
                style={{ height: "20vh", width: "20vw", objectFit: "cover" }}
                src="https://source.unsplash.com/random"
                class=" img-fluid  rounded "
                alt="..."
              />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Blogs;
