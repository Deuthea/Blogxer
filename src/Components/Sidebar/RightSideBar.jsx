import React, { useState } from "react";
import { Link } from "react-router-dom";
import Facebook from "../Icons/Facebook";
import Twitter from "../Icons/Twitter";
import Github from "../Icons/Github";
import Instagram from "../Icons/Instagram";
import Youtube from "../Icons/Youtube";

export const RightSidebar = () => {
  const [state, setState] = useState([
    { path: "/", content: "🏠 Home" },
    { path: "/bookmarks", content: "📃 Reading List" },
    { path: "/tags", content: "🏷️ Tags" },
    { path: "/faq", content: "💡 FAQ" },
    { path: "/about", content: "📍 About" },
    { path: "/contact", content: "📞 Contact" },
    { path: "/guides", content: "📑 Guides" },
  ]);
  return (
    <div className="sticky  top-20">
      <span className="flex justify-between">
        <span>My Tags</span>
        <Link className="text-blue-700 hover:underline">See All</Link>
      </span>
      <div className=" flex p-2 bg-white flex-col my-2 ">
        {/* {state?.map((item) => (
          <Link className=" hover:underline hover:rounded-md p-2 hover:bg-gray-200  hover:text-blue-700">
            # tags
          </Link>
        ))} */}
      </div>
    </div>
  );
};
