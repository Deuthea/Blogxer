import React, { useState, useEffect } from "react";
import { addUserData } from "../../features/Auth/authSlice";
import Navbar from "../Navbar/Navbar";
import { api } from "../../config.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
// const endPointF = api.frontend;
const endPoint = api.endPoint;

const Bookmarks = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [userData, setUserData] = useState();
  useEffect(() => {
    (async () => {
      const response = await fetch(`${endPoint}/api/auth/getUserProfile`, {
        method: "GET",
        headers: {
          authorization: "Bearer " + token,
          "content-Type": "application/json",
        },
      });
      const data = await response.json();

      if (data.success == true) {
        setUserData(data.user);
        dispatch(addUserData(data.user));

        toast.success("Like Added 🚀🚀", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    })();
  }, []);
  console.log(userData);
  return (
    <div>
      <Navbar />
      <div class="flex justify-center my-5">
        <div class="block max-w-md  rounded-lg bg-white shadow-lg">
          {userData?.readingList?.map((savedBlog) => (
            <div class="px-6 pt-5">
              <h5 class="mb-2 text-xl font-medium leading-tight text-black ">
                {savedBlog.title}
              </h5>
              <p>{savedBlog.postedBy.name}</p>
            </div>
          ))}
        </div>
      </div>{" "}
    </div>
  );
};

export default Bookmarks;
