import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./WriteBlog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

let data;
const WriteBlog = () => {
  const [blog, setBlog] = useState({ title: "", description: "" });

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
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
            class="form-control mb-4 title-input border-0"
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
                setBlog({ ...blog, description: data });
              }}
              name="description"
              value={blog.description}
            />
          </div>
          <div className="col-12 text-center">
            <button
              className="my-3 btn recommended rounded-pill"
              style={{ padding: "8px 70px" }}
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
