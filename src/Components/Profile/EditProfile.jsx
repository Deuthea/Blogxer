import React, { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser, updateUser } from "../../features/Auth/authSlice";
import { api } from "../../config.js";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import logo from "../../assets/OIP.jpg";
import Navbar from "../Navbar/Navbar";

const endPoint = api.endPoint;

const EditProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const state = useSelector((state) => state.auth.userProfile);
  console.log(state);
  const token = localStorage.getItem("token");
  const [data, setData] = useState({
    name: state?.name,
    // username: "",
    email: state?.email,
    profilePic: state?.profilePic || "",
    role: state?.role || "",
    about: state?.about || "",
    github: state?.github || "",
    instagram: state?.instagram || "",
    facebook: state?.facebook || "",
    twitter: state?.twitter || "",
    linkedin: state?.linkedin || "",
    youtube: state?.youtube || "",
    dribble: state?.dribble || "",
  });

  const nextButton = () => {
    setPageNumber(pageNumber + 1);
  };
  const prevButton = () => {
    setPageNumber(pageNumber - 1);
  };

  const handleImageUpload = () => {
    const { files } = document.querySelector('input[type="file"]');
    const formData = new FormData();
    formData.append("file", files[0]);
    // replace this with your upload preset name
    formData.append("upload_preset", "qv5rfbwg");
    const options = {
      method: "POST",
      body: formData,
    };

    // replace cloudname with your Cloudinary cloud_name
    return fetch(
      "https://api.Cloudinary.com/v1_1/:cloud_name/image/upload",
      options
    )
      .then((res) => res.json())
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  const submit = async () => {
    console.log(data);

    const res = await fetch(`${endPoint}/api/auth/updateUser`, {
      method: "PATCH",
      headers: {
        authorization: "Bearer " + token,
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const resP = await res.json();
    console.log(resP);
    if (resP.status == "ok") {
      toast.success(`${resP.message}`, {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(updateUser(resP));
      setData({
        name: "",
        email: "",
        profilePic: "",
        role: "",
        about: "",
        github: "",
        instagram: "",
        facebook: "",
        twitter: "",
        linkedin: "",
        youtube: "",
        dribble: "",
      });
      navigate("/profile");
    } else {
      toast.error(`${resP.error}`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  return (
    <div>
      <Navbar />{" "}
      <div class="mt-10 flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div class="border card-auth p-10 w-full max-w-md space-y-8">
          <div>
            <p class="mt-2 mb-2 text-xl text-gray-600">
              Step {pageNumber} of 3
            </p>
            <hr />
          </div>
          <form class="mt-8 space-y-6">
            {pageNumber == 1 && (
              <div class="mb-5 text-center">
                <div class="mx-auto w-32 h-32 mb-2 border rounded-full relative bg-gray-100 mb-4 shadow-inset">
                  <img
                    src={state?.profilePic}
                    id="image"
                    class="object-contain w-full h-32 rounded-full"
                  />
                </div>

                <label
                  for="fileInput"
                  type="button"
                  class="cursor-pointer inine-flex justify-between items-center focus:outline-none border py-2 px-4 rounded-lg shadow-sm text-left text-gray-600 bg-white hover:bg-gray-100 font-medium"
                >
                  Browse Photo
                </label>
              </div>
            )}

            {pageNumber == 2 && (
              <div class="-space-y-px rounded-md shadow-sm">
                <div>
                  <div>
                    <label for="password" class="sr-only">
                      Full Name
                    </label>
                    <input
                      id="password"
                      value={data.name}
                      onChange={handleChange}
                      name="name"
                      type="text"
                      autocomplete="current-password"
                      required
                      class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Full Name"
                    />
                  </div>
                  <label for="email-address" class="sr-only">
                    Email address
                  </label>
                  <input
                    id="email-address"
                    name="email"
                    disabled
                    title="You can not edit Primary Email"
                    onChange={handleChange}
                    value={data.email}
                    type="email"
                    autocomplete="email"
                    required
                    class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Email address"
                  />
                  <label for="email-address" class="sr-only">
                    Position / Role
                  </label>
                  <input
                    id="email-address"
                    name="role"
                    onChange={handleChange}
                    value={data.role}
                    type="text"
                    autocomplete="text"
                    required
                    class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Position / role / What you do"
                  />
                  <label for="email-address" class="sr-only">
                    About
                  </label>
                  <textarea
                    id="email-address"
                    name="about"
                    onChange={handleChange}
                    value={data.about}
                    type="text"
                    required
                    class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="About Yourself"
                  />
                </div>
              </div>
            )}

            {pageNumber == 3 && (
              <div class="-space-y-px rounded-md shadow-sm">
                <div>
                  <div>
                    <label for="password" class="sr-only">
                      Github
                    </label>
                    <input
                      id="password"
                      value={data.github}
                      onChange={handleChange}
                      name="github"
                      type="text"
                      required
                      class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Github Url"
                    />
                  </div>
                  <div>
                    <label for="password" class="sr-only">
                      LinkedIN
                    </label>
                    <input
                      id="password"
                      value={data.linkedin}
                      onChange={handleChange}
                      name="linkedin"
                      type="text"
                      required
                      class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="LinkedIn Url"
                    />
                  </div>
                  <div>
                    <label for="password" class="sr-only">
                      Twitter
                    </label>
                    <input
                      id="password"
                      value={data.twitter}
                      onChange={handleChange}
                      name="twitter"
                      type="text"
                      required
                      class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Twitter Url"
                    />
                  </div>
                  <div>
                    <label for="password" class="sr-only">
                      Instagram
                    </label>
                    <input
                      id="password"
                      value={data.instagram}
                      onChange={handleChange}
                      name="instagram"
                      type="text"
                      required
                      class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Instagram Url"
                    />
                  </div>
                  <div>
                    <label for="password" class="sr-only">
                      Facebook
                    </label>
                    <input
                      id="password"
                      value={data.facebook}
                      onChange={handleChange}
                      name="facebook"
                      type="text"
                      required
                      class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Facebook Url"
                    />
                  </div>
                  <div>
                    <label for="password" class="sr-only">
                      Instagram
                    </label>
                    <input
                      id="password"
                      value={data.dribble}
                      onChange={handleChange}
                      name="dribble"
                      type="text"
                      required
                      class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Dribble Url"
                    />
                  </div>
                  <div>
                    <label for="password" class="sr-only">
                      Instagram
                    </label>
                    <input
                      id="password"
                      value={data.youtube}
                      onChange={handleChange}
                      name="youtube"
                      type="text"
                      required
                      class="relative block w-full rounded-md border-0 py-2.5 px-4 my-3  text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      placeholder="Youtube Url"
                    />
                  </div>
                </div>
              </div>
            )}

            <div className="flex justify-around">
              {pageNumber != 1 && (
                <button
                  type="button"
                  onClick={prevButton}
                  class="align-middle group relative flex w-25 justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-5 h-5 mr-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M21 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953l7.108-4.062A1.125 1.125 0 0121 8.688v8.123zM11.25 16.811c0 .864-.933 1.405-1.683.977l-7.108-4.062a1.125 1.125 0 010-1.953L9.567 7.71a1.125 1.125 0 011.683.977v8.123z"
                    />
                  </svg>

                  <span> {loading ? <Loader /> : "Prev"}</span>
                </button>
              )}
              {pageNumber != 3 ? (
                <button
                  type="button"
                  onClick={nextButton}
                  class="align-middle group relative flex w-25 justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span> {loading ? <Loader /> : "Next"}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-5 ml-2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M3 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062A1.125 1.125 0 013 16.81V8.688zM12.75 8.688c0-.864.933-1.405 1.683-.977l7.108 4.062a1.125 1.125 0 010 1.953l-7.108 4.062a1.125 1.125 0 01-1.683-.977V8.688z"
                    />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={submit}
                  class="align-middle group relative flex w-25 justify-center rounded-md bg-green-600 py-2 px-3 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <span> {loading ? <Loader /> : "Submit"}</span>
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
