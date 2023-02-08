import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import Navbar from "../Navbar/Navbar";
import { useSelector, useDispatch } from "react-redux";
import { getBlog } from "../../features/blog/blogSlice";
import { api } from "../../config.js";

const endPoint = api.endPoint;

const Blogs = () => {
  const blogs1 = useSelector((state) => state.blog.blogs);
  const [state, setState] = useState(blogs1);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      // setLoading(true);
      const response = await fetch(`${endPoint}/api/blog/`);
      const data = await response.json();
      // console.log(data.Blogs);
      setState(data.Blogs);
      dispatch(getBlog(data.Blogs));
    })();
  }, []);

  const blogs = useSelector((state) => state.blog.blogs);
  console.log(blogs);
  return (
    <div>
      {state?.length > 0 ? (
        state?.map((blog) => (
          <Link
            key={blog._id}
            className="text-dark text-decoration-none"
            to={`/blog/${blog._id}`}
          >
            <div className=" mb-3 mt-2 border-bottom">
              <div className=" row g-0 mb-3">
                <div className="px-0 col-md-9">
                  <div className="card-body">
                    <p className="d-flex align-items-center ">
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
                        className="card-tile font-weight-bold pt-2"
                        style={{ fontSize: "14px" }}
                      >
                        Tarun Choudhary
                      </span>
                      <span className="pl-2 pt-2">·</span>
                      <span
                        className="pt-2 px-2"
                        style={{
                          fontSize: "13px",
                          fontWeight: "400",
                          color: "#333",
                        }}
                      >
                        Feb 7, 2016
                      </span>
                    </p>
                    <h5 className="card-title font-weight-bold">
                      {blog.title}
                    </h5>
                    <p className="card-text">{`${
                      blog.content.length > 150
                        ? `${blog.content.substring(0, 150)} .  .  . `
                        : blog.content
                    }`}</p>
                    <p className="d-flex justify-content-between">
                      <p>
                        {blog.tags?.map((tag) => (
                          <span
                            key={tag}
                            className="rounded-pill mr-2"
                            style={{
                              fontSize: "13px",
                              background: "#f0f0f0",
                              padding: "5px 8px",
                              fontWeight: "400",
                              color: "#000",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="ml-0">·</span>
                        <span
                          className=""
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
                        <span className="material-symbols-outlined">
                          bookmark_add
                        </span>
                      </p>
                    </p>
                  </div>
                </div>
                <div className="px-4 py-5 col-md-3 ">
                  <img
                    style={{
                      height: "20vh",
                      width: "20vw",
                      objectFit: "cover",
                    }}
                    src="https://source.unsplash.com/random"
                    className=" img-fluid  rounded "
                    alt="..."
                  />
                </div>
              </div>
            </div>
          </Link>
        ))
      ) : (
        <h2>No Blogs Found</h2>
      )}
    </div>
  );
};

export default Blogs;
