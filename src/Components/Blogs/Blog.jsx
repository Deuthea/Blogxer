import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";
import { addComment } from "../../features/blog/blogSlice";
import { api } from "../../config.js";
import ReactHtmlParser from "html-react-parser";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
const endPointF = api.frontend;
const endPoint = api.endPoint;

const Blog = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const token = localStorage.getItem("token");
  // console.log(params);
  const avgWordsPM = 250;
  const [time, setTime] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const blog = useSelector((state) => state.blog.currentBlog);
  const [blogData, setBlogData] = useState(blog);
  // console.log(blog);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    const data = blogData?.content.split(" ");
    const res = Math.ceil(data.length / avgWordsPM);
    setTime(res);
    // console.log(data);
    setBlogData(blog);
  }, [blogData, blog]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  // console.log(blog);
  const addComment1 = async (e) => {
    // e.preventDefault();
    if (comment == "")
      return toast.error("Please enter some text in comment box!", {
        position: toast.POSITION.TOP_CENTER,
      });
    setLoading(true);
    const data1 = {
      comment: comment,
    };
    const response = await fetch(
      `${endPoint}/api/comment/addComment/${blogData?.updatedBy?._id}/${blogData?._id}`,
      {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "content-Type": "application/json",
        },
        body: JSON.stringify(data1),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.status == "ok") {
      dispatch(addComment(data));
      toast.success("Comment Added 🚀🚀", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setComment("");
    setLoading(false);
  };

  const shareFunction = () => {
    navigator.share({
      title: `${blogData.title}`,
      text: `${blogData.content}`,
      url: `${endPointF}/blog`,
    });
  };

  const textToSpeech = () => {
    const text = blog.title + blog.content;
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  console.log(blogData);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  else {
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
                        {blogData.updatedBy.name}
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
                        {new Date(blogData.createdAt).toDateString()}
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
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={textToSpeech}
                        class="material-symbols-outlined mx-2"
                      >
                        text_to_speech
                      </span>
                      <span
                        className="material-symbols-outlined mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={shareFunction}
                      >
                        share
                      </span>
                      <span
                        style={{ cursor: "pointer" }}
                        className="material-symbols-outlined mx-2"
                      >
                        bookmark_add
                      </span>
                    </p>
                  </p>
                  <h3 className="card-title font-weight-bold ">
                    {blogData.title}
                  </h3>
                  <p className="card-text description text-justify">
                    {ReactHtmlParser(blogData.content)}
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
          {blogData.comments.map((comment) => (
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
              onChange={(e) => setComment(e.target.value)}
              name="comment"
              value={comment}
              id="yourName"
              required
            />
            <div className="col-12 text-center">
              <button
                onClick={addComment1}
                className="my-3 btn recommended rounded-pill"
                style={{ padding: "8px 70px" }}
              >
                {loading ? <Loader /> : "Add comment"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Blog;
