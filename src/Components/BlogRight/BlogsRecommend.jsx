import React from "react";
import "./BlogsRecommended.css";

const BlogsRecommend = () => {
  return (
    <div className="">
      <div className="text-center">
        <button
          className="btn recommended rounded-pill"
          style={{ padding: "8px 70px" }}
        >
          Top Liked Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogsRecommend;
