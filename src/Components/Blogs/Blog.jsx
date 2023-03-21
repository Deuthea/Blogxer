import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import "./Blog.css";
import {
  addBookmark,
  addComment,
  addLike,
  addUnlike,
} from "../../features/blog/blogSlice";
import { api } from "../../config.js";
import ReactHtmlParser from "html-react-parser";
import { useEffect } from "react";
import { deleteCommentRed } from "../../features/blog/blogSlice";
import Loader from "../Loader/Loader";
import { toast } from "react-toastify";
import { Sidebar } from "../Sidebar/Sidebar";
import Like from "../Icons/Like";
import Comment from "../Icons/Comment";
import BookMark from "../Icons/BookMark";
import Button from "../Button/Button";
import User from "../Icons/User";
import ToolTip from "../ToolTip/ToolTip";
import moment from "moment";
import UnLike from "../Icons/UnLike";
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
  const user = useSelector((state) => state.auth.user);
  let likeValue = false;
  const [likeToggle, setLikeToggle] = useState(likeValue);

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    const data = blogData?.content.split(" ");
    const res = Math.ceil(data.length / avgWordsPM);
    setTime(res);
    setBlogData(blog);

    for (let index = 0; index < blogData?.like.length; index++) {
      if (blogData?.like[index]._id == user._id) {
        likeValue = true;
        break;
      }
    }
    console.log("like value" + likeValue);
    setLikeToggle(likeValue);
  }, [blogData, blog]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const addComment1 = async (e) => {
    if (comment == "")
      return toast.error("Please enter some text in comment box!", {
        position: toast.POSITION.TOP_CENTER,
      });
    setLoading(true);
    const data1 = {
      content: comment,
      blogId: blogData?._id,
    };
    const response = await fetch(`${endPoint}/api/blog/addComment`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await response.json();
    console.log(data);
    if (data.success == true) {
      setBlogData(data.blog);
      dispatch(addComment(data.blog));
      toast.success("Comment Added 🚀🚀", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setComment("");
    setLoading(false);
  };

  const likeBlog = async (e) => {
    const data1 = { blogId: blogData?._id };
    const response = await fetch(`${endPoint}/api/blog/likeBlog`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await response.json();

    if (data.success == true) {
      setBlogData(data.blog);
      dispatch(addLike(data.blog));
      setLikeToggle(!likeToggle);
      toast.success("Like Added 🚀🚀", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const bookmarkBlog = async (e) => {
    const data1 = { blogId: blogData?._id };
    const response = await fetch(`${endPoint}/api/blog/bookmarkBlog`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await response.json();

    if (data.success == true) {
      setBlogData(data.blog);
      dispatch(addBookmark(data.blog));

      toast.success("Bookmark Added 🚀🚀", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const UnLikeBlog = async (e) => {
    const data1 = { blogId: blogData?._id };
    const response = await fetch(`${endPoint}/api/blog/unlikeBlog`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data1),
    });
    const data = await response.json();

    if (data.success == true) {
      setBlogData(data.blog);
      dispatch(addUnlike(data.blog));
      setLikeToggle(!likeToggle);
      toast.success("Like Added 🚀🚀", {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const deleteComment = async (e, id) => {
    // console.log(e, id);
    try {
      const res = await fetch(
        `${endPoint}/api/blog/deleteComment/${blogData?._id}/${id}`,
        {
          method: "DELETE",
          headers: {
            authorization: "Bearer " + token,
            "content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      if (data.success == true) {
        dispatch(deleteCommentRed(data.blog));
        setBlogData(data.blog);
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

  console.log(state?._id);
  console.log(blogData?.postedBy?._id);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  else {
    return (
      <>
        <Navbar page="blog" />
        <div class="max-w-screen-xl flex mx-auto">
          <section className="  w-0 mx-2 mt-10 md:w-1/6 ">
            <div className="sticky top-20 flex  justify-end">
              <div className=" flex flex-col align-middle mr-10">
                <span className="my-3 text-md ">
                  <span>
                    {likeToggle ? (
                      <button onClick={UnLikeBlog}>
                        {" "}
                        <UnLike />
                      </button>
                    ) : (
                      <button onClick={likeBlog}>
                        <Like />
                      </button>
                    )}
                    <span className="mx-auto">{blog?.like.length}</span>
                  </span>
                </span>
                <span className="my-2">
                  <span>
                    <Comment />
                    <span>{blog?.comments.length}</span>
                  </span>
                </span>
                <span className="my-2">
                  <span>
                    <button onClick={bookmarkBlog}>
                      <BookMark />
                    </button>

                    <span>{blog?.bookmarks.length}</span>
                  </span>
                </span>
              </div>
            </div>
          </section>
          <main class="mt-10 w-3/6 bg-white shadow  ">
            <div
              class="mb-4 md:mb-0  w-full max-w-screen-md mx-auto relative"
              style={{ height: "24em" }}
            >
              <div
                class="absolute  left-0 bottom-0 w-full h-full z-10"
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
                        {blogData.postedBy.name}
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
            <div className="px-10">
              <div class=" px-4 lg:px-0 mt-12 text-justify text-gray-700 max-w-screen-md mx-auto text-lg leading-relaxed">
                <p class="pb-6">{ReactHtmlParser(blogData.content)}</p>
              </div>
            </div>
            <div className="px-10 ">
              <div class="antialiased mx-auto max-w-screen-md">
                <h3 class="mb-4 text-lg font-semibold text-gray-900">
                  Comments
                </h3>

                <div class="space-y-4">
                  {blogData?.comments?.map((comment) => (
                    <div key={comment?._id} class="flex">
                      <div class="flex-shrink-0 mr-3">
                        <img
                          class="mt-2 rounded-full w-8 h-8 sm:w-10 sm:h-10"
                          src={comment?.postedBy?.profilePic}
                          alt=""
                        />
                      </div>
                      <div class="flex-1 border rounded-lg px-4 py-2 sm:px-6 sm:py-4 leading-relaxed">
                        <div className="flex justify-between">
                          <div>
                            {" "}
                            <strong>{comment?.postedBy?.name}</strong>{" "}
                            <p class="text-sm">{comment?.content}</p>
                          </div>
                          {state?._id == blogData?.postedBy?._id && (
                            <div>
                              <button
                                onClick={(e) => deleteComment(e, comment?._id)}
                                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-2 rounded-full"
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                  stroke-width="1.5"
                                  stroke="currentColor"
                                  class="w-4 h-4"
                                >
                                  <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
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
                    class="block  outline-none p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border "
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
          </main>
          <section className="mt-10  w-0 ml-10   md:w-2/6">
            <div class=" bg-gray-200   w-4/6 sticky top-20 flex flex-wrap items-center  justify-center  ">
              <div class="container  bg-white  shadow-lg    transform   duration-200 easy-in-out">
                <div class=" h-20 overflow-hidden">
                  <img
                    class="w-full"
                    src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    alt=""
                  />
                </div>
                <div class="flex justify-center px-5  -mt-6">
                  <img
                    class="h-12 w-12 bg-white p-2 rounded-full   "
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
                    alt=""
                  />
                </div>
                <div class=" ">
                  <div class="text-center px-10">
                    <h2 class="text-gray-800 text-xl font-bold">
                      Mohit Dhiman
                    </h2>
                    <a
                      class="text-gray-400 mt-2 text-sm hover:text-blue-500"
                      href="https://www.instagram.com/immohitdhiman/"
                      target="BLANK()"
                    >
                      @immohitdhiman
                    </a>
                    <br />
                    <Button class="bg-blue-800 text-white my-1">Follow</Button>
                    <p class="mt-2 text-gray-500 text-sm">
                      Lorem Ipsum is simply
                    </p>
                  </div>
                  <hr class="mt-6" />
                  <div class="flex  bg-gray-50 ">
                    <div class="text-center w-1/2 p-4 text-sm hover:bg-gray-100 cursor-pointer">
                      <p>
                        <span class="font-semibold">2.5 k </span> Followers
                      </p>
                    </div>
                    <div class="border"></div>
                    <div class="text-center w-1/2 p-4 text-sm hover:bg-gray-100 cursor-pointer">
                      <p>
                        {" "}
                        <span class="font-semibold">2.0 k </span> Following
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </>
    );
  }
};

export default Blog;
