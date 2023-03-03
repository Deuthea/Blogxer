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
        <div class="max-w-screen-xl mx-auto">
          <main class="mt-10">
            <div
              class="mb-4 md:mb-0 w-full max-w-screen-md mx-auto relative"
              style={{ height: "24em" }}
            >
              <div
                class="absolute left-0 bottom-0 w-full h-full z-10"
                style={{
                  backgroundImage:
                    "linear-gradient(180deg,transparent,rgba(0,0,0,.7))",
                }}
              ></div>
              <img
                src="https://source.unsplash.com/random"
                class="absolute left-0 top-0 w-full h-full z-0 object-cover"
              />
              <div class="p-4 absolute bottom-0 left-0 z-20">
                {blog.tags.map((item) => (
                  <a
                    href="#"
                    class="px-4 py-1 mr-2 rounded-full bg-black text-gray-200 inline-flex items-center justify-center mb-2"
                  >
                    {item}
                  </a>
                ))}
                <h2 class="text-4xl font-semibold text-gray-100 leading-tight">
                  {blogData.title}
                </h2>
                <div class="flex mt-3">
                  <img
                    src="https://randomuser.me/api/portraits/men/97.jpg"
                    class="h-10 w-10 rounded-full mr-2 object-cover"
                  />
                  <div>
                    <p class="font-semibold text-gray-200 text-sm">
                      {" "}
                      {blogData.updatedBy.name}
                    </p>
                    <p class="font-semibold text-gray-400 text-xs">
                      {" "}
                      {new Date(blogData.createdAt).toDateString()} · {time} min
                      read
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div class="px-4 lg:px-0 mt-12 text-justify text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
              <p class="pb-6">{ReactHtmlParser(blogData.content)}</p>
            </div>
          </main>
        </div>
        <div className="container">
          <div className=" mb-3 mt-2 d-flex flex-column justify-start align-items-center  col-lg-12">
            <div className=" row g-0 mb-3 col-lg-12">
              <div className="px-0 col-md-12 ">
                <div className="card-body">
                  <p className="d-flex justify-content-between">
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
                </div>
              </div>
            </div>
          </div>
          <div class="antialiased mx-auto max-w-screen-md">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

            <div class="space-y-4">
              {blogData.comments.map((comment) => (
                <div key={comment._id} class="flex">
                  <div class="flex-shrink-0 mr-3">
                    <img
                      class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                      alt=""
                    />
                  </div>
                  <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <strong>{comment?.user?.name}</strong>{" "}
                    <span class="text-xs text-gray-400">
                      &nbsp; {new Date(comment.createdAt).toDateString()}
                    </span>
                    <p class="text-sm">{comment.content}</p>
                  </div>
                </div>
              ))}

              <textarea
                id="message"
                rows="4"
                autoFocus
                onChange={(e) => setComment(e.target.value)}
                name="comment"
                value={comment}
                class="block outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border "
                placeholder="Your message..."
              ></textarea>
              <div className="col-12 text-center">
                <button
                  onClick={addComment1}
                  className="bg-black hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-full my-2"
                  style={{ padding: "8px 70px" }}
                >
                  {loading ? <Loader /> : "Add comment"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
};

export default Blog;
