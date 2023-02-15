import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./WriteBlog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { api } from "../../config.js";

const endPoint = api.endPoint;

let data;
const WriteBlog = () => {
  const token = localStorage.getItem("token");
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    imageUrl: "",
    tags: [],
  });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    e.preventDefault();
    console.log(blog);
    const res = await fetch(`${endPoint}/api/blog/add`, {
      method: "POST",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(blog),
    });
    console.log(res);
    const resP = await res.json();
    console.log(resP);
    setBlog({ title: "", content: "" });
  };

  return (
    <div>
      {" "}
      <Navbar page="write" />
      <div className="container my-5">
        <form>
          <input
            type="text"
            placeholder="Enter Title"
            className="form-control mb-4 title-input border-0"
            style={{
              fontSize: "40px",
              outline: "none",
              border: "none",
              padding: "0",
            }}
            autoFocus
            name="title"
            value={blog.title}
            onChange={handleChange}
            id="yourName"
            required
          />

          <div className="form-group">
            <CKEditor
              editor={ClassicEditor}
              onChange={(event, editor) => {
                data = editor.getData();
                setBlog({ ...blog, content: data });
              }}
              name="content"
              value={blog.content}
            />
          </div>
          <div className="col-12 text-center">
            <button
              className="my-3 btn recommended rounded-pill"
              style={{ padding: "8px 70px" }}
              onClick={submit}
            >
              Submit Blog
            </button>
          </div>
          {/* <button type="button" className="btn btn-success" onClick={submit}>
            Submit
          </button> */}
        </form>
      </div>
    </div>
  );
};

export default WriteBlog;
