import React from "react";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";

const Blog = () => {
  return (
    <>
      <Navbar page="blog" />
      <div className="container">
        <div className=" mb-3 mt-2 d-flex flex-column justify-start align-items-center  col-lg-12">
          <div className=" row g-0 mb-3 ">
            <div className="px-0 col-md-12 ">
              <div className="card-body">
                <p className="d-flex justify-content-between">
                  <p className="d-flex align-items-center ">
                    <span className="material-symbols-outlined profile-blog pr-2">
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
                      class="pt-2 pl-2"
                      style={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#333",
                      }}
                    >
                      Feb 7, 2016
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
                      6 min read
                    </span>
                  </p>
                  <p>
                    <span class="material-symbols-outlined">bookmark_add</span>
                  </p>
                </p>
                <h3 className="card-title font-weight-bold">
                  Card with an image on left
                </h3>
                <p className="card-text description">
                  This is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer. This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer. This is a wider card with supporting text
                  below as a natural lead-in to additional content. This content
                  is a little bit longer. This is a wider card with supporting
                  text below as a natural lead-in to additional content. This
                  content is a little bit longer. This is a wider card with
                  supporting text below as a natural lead-in to additional
                  content. This content is a little bit longer.This is a wider
                  card with supporting text below as a natural lead-in to
                  additional content. This content is a little bit longer.This
                  is a wider card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.This is a wider card with supporting text below as a
                  natural lead-in to additional content. This content is a
                  little bit longer.
                </p>
              </div>
            </div>
          </div>
          <div className="px-0 py-1 col-md-10 mb-5 ">
            <img
              style={{ height: "80vh", width: "60vw", objectFit: "contain" }}
              src="https://source.unsplash.com/random"
              className=" img-fluid  rounded "
              alt="..."
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
