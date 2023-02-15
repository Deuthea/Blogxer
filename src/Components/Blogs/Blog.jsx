import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";
import ReactHtmlParser from "html-react-parser";
import { useEffect } from "react";

const Blog = () => {
  const params = useParams();
  console.log(params);
  const avgWordsPM = 250;
  const [time, setTime] = useState(0);
  const blog = useSelector((state) =>
    state.blog.blogs.find((blog) => blog._id == params.id)
  );
  useEffect(() => {
    const data = blog?.content.split(" ");
    const res = Math.ceil(data.length / avgWordsPM);
    setTime(res);
    // console.log(data);
  }, [blog]);

  console.log(blog);
  return (
    <>
      <Navbar page="blog" />
      <div className="container">
        <div className=" mb-3 mt-2 d-flex flex-column justify-start align-items-center  col-lg-12">
          <div className=" row g-0 mb-3 col-lg-12">
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
                        className="  rounded-pill "
                        alt="..."
                      />
                    </span>
                    <span
                      className="card-tile font-weight-bold pt-2"
                      style={{ fontSize: "14px" }}
                    >
                      {blog.updatedBy.name}
                    </span>
                    <span className="pl-2 pt-2">·</span>
                    <span
                      className="pt-2 pl-2"
                      style={{
                        fontSize: "13px",
                        fontWeight: "400",
                        color: "#333",
                      }}
                    >
                      {new Date(blog.createdAt).toDateString}
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
                      {time} min read
                    </span>
                  </p>
                  <p>
                    <span className="material-symbols-outlined">
                      bookmark_add
                    </span>
                  </p>
                </p>
                <h3 className="card-title font-weight-bold ">{blog.title}</h3>
                <p className="card-text description text-justify">
                  {ReactHtmlParser(blog.content)}
                </p>
              </div>
            </div>
          </div>
          <div className="px-0 py-1 col-md-10 mb-5 ">
            <img
              style={{ height: "80vh", width: "100vw", objectFit: "contain" }}
              src="https://source.unsplash.com/random"
              className=" img-fluid  rounded "
              alt="..."
            />
          </div>
        </div>
        <h3 className="card-title font-weight-bold">Comments</h3>
        {blog.comments.map((comment) => (
          <>
            <p className="m-0 p-0   d-flex justify-content-between">
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
                <div className="d-flex flex-column">
                  <span
                    className="card-tile font-weight-bold pt-2"
                    style={{ fontSize: "14px" }}
                  >
                    {comment?.user?.name}
                  </span>

                  <span
                    style={{
                      fontSize: "13px",
                      fontWeight: "400",
                      color: "#333",
                    }}
                  >
                    Feb 7, 2016
                  </span>
                </div>
              </p>
            </p>
            <p>{comment.content}</p>
          </>
        ))}

        <div className="form-contol">
          <input
            type="text"
            placeholder="Enter Comment"
            className="form-control mb-4 title-input border-0"
            style={{
              fontSize: "30px",
              outline: "none",
              border: "none",
              padding: "5px",
            }}
            autoFocus
            name="title"
            // value={blog.title}
            // onChange={handleChange}
            id="yourName"
            required
          />
          <div className="col-12 text-center">
            <button
              className="my-3 btn recommended rounded-pill"
              style={{ padding: "8px 70px" }}
            >
              Add comment
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Blog;
