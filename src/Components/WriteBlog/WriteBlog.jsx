import React, { useState } from "react";
import Navbar from "../Navbar/Navbar";
import "./WriteBlog.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { api } from "../../config.js";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import Loader from "../Loader/Loader";
import { addBlog } from "../../features/blog/blogSlice";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";

const endPoint = api.endPoint;

let data;
const WriteBlog = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const token = localStorage.getItem("token");
  const [tagValue, setTagValue] = useState("");
  const [blog, setBlog] = useState({
    title: "",
    content: "",
    imageUrl: "",
    tags: [],
  });

  const addTags = (e) => {
    if (e.keyCode === 13 && tagValue) {
      const data = { ...blog };
      blog.tags.push(tagValue);
      setBlog(data);
      setTagValue("");
    }
    console.log(blog);
  };

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const submit = async (e) => {
    if (e.keyCode == 13) {
      return e.preventDefault();
    }
    // console.log(blog);
    setLoading(true);
    if (
      blog.title == "" ||
      blog.content == ""
      // blog.imageUrl == "" ||
      // blog.tags == ""
    ) {
      toast.error("All fields are required", {
        position: toast.POSITION.TOP_CENTER,
      });
    } else {
      const res = await fetch(`${endPoint}/api/blog/add`, {
        method: "POST",
        headers: {
          authorization: "Bearer " + token,
          "content-Type": "application/json",
        },
        body: JSON.stringify(blog),
      });
      const resP = await res.json();

      // console.log(resP);
      if (resP.status == "ok") {
        toast.success(`${resP.message}`, {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch(addBlog(resP.blog));
        setBlog({ title: "", content: "" });
        navigate("/");
      } else {
        toast.error(`${resP.error}`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    }
    setLoading(false);
  };

  return (
    <div>
      {" "}
      <Navbar page="write" />
      <div class="lg:w-3/4 lg:mx-auto px-10 ">
        <main class="mt-10">
          <form>
            <input
              type="text"
              placeholder="Enter Title"
              className="w-full mb-4 text-2xl border-0"
              style={{
                outline: "none",
                border: "none",
                padding: "10px",
              }}
              autoFocus
              name="title"
              value={blog.title}
              onChange={handleChange}
              id="yourName"
              // required
            />
            <p>
              {blog?.tags.map((item) => (
                <Button className="text-black font-bold bg-green-400">
                  #{item} &nbsp;
                </Button>
              ))}
            </p>
            <input
              type="text"
              placeholder="Enter Title"
              className="w-full mb-4 text-2xl border-0"
              style={{
                outline: "none",
                border: "none",
                padding: "10px",
              }}
              autoFocus
              name="tags"
              value={tagValue}
              onChange={(e) => setTagValue(e.target.value)}
              onKeyDown={addTags}
              id="yourName"
              // required
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
                type="button"
                className="my-3 btn recommended rounded-pill"
                style={{ padding: "8px 70px" }}
                onClick={submit}
              >
                {loading ? <Loader /> : "Submit Blog"}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default WriteBlog;
