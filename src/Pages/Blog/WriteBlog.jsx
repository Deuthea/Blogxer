import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../Components/Navbar";
import MarkdownEditor from "@uiw/react-md-editor";
import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";

const WriteBlog = () => {
  const [blogData, setBlogData] = useState({
    title: "",
    tags: "",
  });
  const [markdown, setMarkdown] = useState("");
  // console.log(markdown);

  const handleChange = (e) => {
    const { value, name } = e.target;
    setBlogData({ ...blogData, [name]: value });
  };

  const submit = (e) => {
    e.preventDefault();
    const data = {
      title: blogData.title,
      tags: blogData.tags,
      content: markdown,
    };
    console.log(data);
    setMarkdown("");
    setBlogData({
      tags: "",
      title: "",
    });
  };
  return (
    <div>
      <Navbar />
      <div className="text-[#a6adba] bg-[#242933] lg:px-10 px-5 py-4 lg:py-4">
        <div className="shadow-[#2a303c]  rounded-2xl lg:w-full lg:px-10 lg:py-10 px-4 py-5 bg-[#2a303c]">
          <div className="px-3">
            <label className="text-sm">Title</label>
            <br />
            <textarea
              type="text"
              rows={1}
              name="title"
              value={blogData.title}
              onChange={handleChange}
              placeholder="Notes Title . . ."
              className="p-3 my-2 w-full bg-[#2a303c] border rounded-lg outline-none border-[#a6adba]"
            />
          </div>
          <div className="px-3">
            <label className="text-sm">Tags</label>
            <br />
            <input
              type="text"
              value={blogData.tags}
              name="tags"
              onChange={handleChange}
              placeholder="tags ( separate by comma )"
              className="p-3 w-full my-2 bg-[#2a303c] border rounded-lg outline-none border-[#a6adba]"
            />
          </div>
          <div data-color-mode="dark" className="px-3">
            <label className="text-sm">Content</label>

            <MarkdownEditor
              className="border my-2 p-3 outline-none border-[#a6adba]"
              style={{
                borderRadius: "20px",
                minHeight: "50vh",
                overflow: "hidden",
                height: "200px",
              }}
              value={markdown}
              name="markdown"
              onChange={(value, viewUpdate) => setMarkdown(value)}
            />
          </div>
          <div className="flex pt-4 px-3">
            <button
              onClick={submit}
              className="px-10 py-3  text-md rounded-lg font-semibold bg-[#6419e6] text-white hover:bg-[#48199a]"
            >
              Save
            </button>
          </div>
          <br />
        </div>
      </div>
    </div>
  );
};

export default WriteBlog;
