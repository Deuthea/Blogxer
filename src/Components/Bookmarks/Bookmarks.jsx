import React, { useState, useEffect } from "react";
import { addUserData } from "../../features/Auth/authSlice";
import Navbar from "../Navbar/Navbar";
import { api } from "../../config.js";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";
// const endPointF = api.frontend;
const endPoint = api.endPoint;

const Bookmarks = () => {
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState();
  const avgWordsPM = 250;

  useEffect(() => {
    (async () => {
      setLoading(true);
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
        setLoading(false);

        toast.success("Like Added 🚀🚀", {
          position: toast.POSITION.TOP_CENTER,
        });
      }
      setLoading(false);
    })();
  }, []);

  console.log(loading);
  console.log(userData);
  return (
    <div className="">
      <Navbar />
      {loading ? (
        <div>
          <Loader />
        </div>
      ) : (
        <div class="flex justify-center my-5 px-10">
          <div class="block max-w-2xl  rounded-lg bg-white shadow-lg">
            {userData?.readingList?.map((savedBlog) => (
              <div class="px-6 flex align-middle pt-5">
                <div>
                  <dd className="mr-1">
                    <img
                      class="h-8 w-8 rounded-full  object-contain"
                      src="https://source.unsplash.com/random"
                      alt=""
                    />
                  </dd>
                </div>
                <div>
                  {" "}
                  <h4 class="mb-2 font-bold text-xl leading-tight text-black ">
                    {savedBlog.title}
                  </h4>
                  <p>
                    {savedBlog.postedBy.name} *{" "}
                    {new Date(savedBlog.createdAt).toDateString()} *{" "}
                    {Math.ceil(
                      savedBlog?.content.split(" ").length / avgWordsPM
                    )}
                    min read
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Bookmarks;
