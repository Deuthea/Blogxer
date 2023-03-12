import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";
import { addComment } from "../../features/blog/blogSlice";
import { api } from "../../config.js";
import ReactHtmlParser from "html-react-parser";
import { useEffect } from "react";
import { deleteCommentRed } from "../../features/blog/blogSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
const endPointF = api.frontend;
const endPoint = api.endPoint;

const Blog = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const state = useSelector((state) => state.auth.user);
  // console.log(state);
  const token = localStorage.getItem("token");
  // console.log(params);
  const avgWordsPM = 250;
  const [time, setTime] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const blog = useSelector((state) => state.blog.currentBlog);
  const [blogData, setBlogData] = useState(blog);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const data = blogData?.content.split(" ");
    const res = Math.ceil(data.length / avgWordsPM);
    setTime(res);

    setBlogData(blog);
  }, [blogData, blog]);

  // useEffect(() => {
  //   window.scrollTo(0, 0);
  // }, []);

  const addComment1 = async (e) => {
    if (comment == "")
      return toast.error("Please enter some text in comment box!", {
        position: toast.POSITION.TOP_CENTER,
      });
    setLoading(true);
    const data1 = {
      comment: comment,
    };
    const response = await fetch(
      `${endPoint}/api/comment/addComment/${state?._id}/${blogData?._id}`,
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
    // const comments
    if (data.status == "ok") {
      // const comment = blogData;
      // console.log(comment.comments);
      // comment.comments.push(data.comment);
      // Object.preventExtensions(comment);
      // console.log(comment);
      // setBlogData(comment);
      dispatch(addComment(blogData));
      // console.log(comment);
      toast.success("Comment Added 🚀🚀", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setComment("");
    setLoading(false);
  };

  const deleteComment = async (e, id) => {
    // console.log(e, id);
    try {
      const res = await fetch(`${endPoint}/api/comment/deleteComment/${id}`, {
        method: "DELETE",
        headers: {
          authorization: "Bearer " + token,
          "content-Type": "application/json",
        },
      });
      const data = await res.json();
      const blog = { ...blogData };

      const comments = blog.comments.filter(
        (comment) => comment._id != data.comment._id
      );
      // console.log(comments);
      if (data.status == "ok") {
        dispatch(deleteCommentRed(comments));
        toast.warn("Comment Deleted 🚀🚀", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {}
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

  // console.log(blogData);
  // console.log();
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
                <div className="flex align-middle justify-between ">
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
                        {new Date(blogData.createdAt).toDateString()} · {time}{" "}
                        min read
                      </p>
                    </div>
                  </div>

                  <div className="flex mt-3">
                    <>
                      <span
                        style={{ cursor: "pointer" }}
                        onClick={textToSpeech}
                        class="text-gray-200  border rounded-full px-2 py-2 material-symbols-outlined mx-2"
                      >
                        text_to_speech
                      </span>
                      <span
                        className="text-gray-200 border rounded-full px-2 py-2 material-symbols-outlined mx-2"
                        style={{ cursor: "pointer" }}
                        onClick={shareFunction}
                      >
                        share
                      </span>
                      <span
                        style={{ cursor: "pointer" }}
                        className="text-gray-200 border rounded-full px-2 py-2 material-symbols-outlined mx-2"
                      >
                        bookmark_add
                      </span>
                    </>
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
          <div class="antialiased mx-auto max-w-screen-md">
            <h3 class="mb-4 text-lg font-semibold text-gray-900">Comments</h3>

            <div class="space-y-4">
              {blogData?.comments?.map((comment) => (
                <div key={comment?._id} class="flex">
                  <div class="flex-shrink-0 mr-3">
                    <img
                      class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                      src="https://images.unsplash.com/photo-1604426633861-11b2faead63c?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=200&h=200&q=80"
                      alt=""
                    />
                  </div>
                  <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                    <div className="flex justify-between">
                      <div>
                        {" "}
                        <strong>{comment?.user?.name}</strong>{" "}
                        <span class="text-xs text-gray-400">
                          &nbsp; {new Date(comment?.createdAt).toDateString()}
                        </span>
                        <p class="text-sm">{comment?.content}</p>
                      </div>
                      {state?._id == blogData?.updatedBy?._id && (
                        <div>
                          <button
                            onClick={(e) => deleteComment(e, comment?._id)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={1.5}
                              stroke="currentColor"
                              className="w-6 h-6"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                              />
                            </svg>
                          </button>
                        </div>
                      )}
                    </div>
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
