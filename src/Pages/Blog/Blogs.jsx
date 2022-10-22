import React, { useState } from "react";
import { Link } from "react-router-dom";

const Blogs = () => {
  const [blogs, setBlogs] = useState([
    {
      title: "1",
      tags: "abcd",
      content: "no worries",
    },
    {
      title: "1",
      tags: "abcd",
      content: "no worries",
    },
    {
      title: "1",
      tags: "abcd",
      content: "no worries",
    },
    {
      title: "1",
      tags: "abcd",
      content: "no worries",
    },
    {
      title: "1",
      tags: "abcd",
      content: "no worries",
    },
  ]);
  const deleteNote = (id) => {};
  return (
    <div className="grid px-20 lg:grid-cols-3 lg:gap-10 grid-cols-1 text-[#a6adba]">
      {blogs?.map((blog) => (
        <Link
          to="/blog/123"
          className="shadow-[#2a303c] my-2  rounded-2xl lg:w-full lg:px-10 lg:py-10 px-4 py-5 bg-[#2a303c]"
        >
          <h1 className="text-3xl font-bold mb-3">{blog.title}</h1>
          <p className="border w-auto inline-block px-3 py-1 rounded-full">
            {blog.tags}
          </p>
          <p className="text-2xl my-3">{blog.content}</p>
          <div className="flex justify-start items-center">
            <Link to="/editBlog">
              <i class="far px-6 bg-green-800 py-3 fa-edit text-white rounded-l-3xl"></i>
            </Link>
            <i
              onClick={() => deleteNote(blog._id)}
              class="far rounded-r-3xl fa-trash-alt px-6 bg-red-800 py-3  text-white"
            ></i>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default Blogs;
