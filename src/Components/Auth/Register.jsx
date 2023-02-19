import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { registerUser } from "../../features/Auth/authSlice";
import "./Register.css";
import { api } from "../../config.js";
import Loader from "../Loader/Loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const endPoint = api.endPoint;

const Register = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.auth.isAuthenticated);
  const [data, setData] = useState({
    name: "",
    // username: "",
    email: "",
    password: "",
  });

  const submit = async (e) => {
    e.preventDefault();
    console.log(data);
    setLoading(true);
    try {
      const res = await fetch(`${endPoint}/api/auth/register`, {
        method: "POST",
        headers: {
          "content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(res);
      const resP = await res.json();
      console.log(resP);
      if (resP.status === "ok") {
        toast.success("Register Successfully 🔥", {
          position: toast.POSITION.TOP_CENTER,
        });
        dispatch(registerUser(resP));
      } else {
        toast.error(`${resP.error}!! 🙂`, {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (error) {
      console.log("erorrrrrrrrrrrrrrr", error);
    }

    setLoading(false);
    // console.log(resP);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  if (state) return <Navigate replace to="/" />;
  else {
    return (
      <div className="">
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container ">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="card card-auth  mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h4 className="card-title text-center pb-0 ">
                          Create{" "}
                          <span className="font-weight-bold">Blogxer</span>{" "}
                          Account
                        </h4>
                        <p className="text-center small">
                          Enter your details to create account
                        </p>
                      </div>

                      <form className="row g-3 needs-validation" novalidate>
                        <div className="col-12 mb-2">
                          <label for="yourName" className="form-label">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            className="form-control"
                            id="yourName"
                            required
                          />
                        </div>

                        {/* <div className="col-12 mb-2">
                          <label for="yourName" className="form-label">
                            Username
                          </label>
                          <input
                            type="text"
                            name="username"
                            value={data.username}
                            onChange={handleChange}
                            className="form-control"
                            id="yourName"
                            required
                          />
                        </div> */}

                        <div className="col-12 mb-2">
                          <label for="yourEmail" className="form-label">
                            Email Address
                          </label>
                          <input
                            type="email"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            className="form-control"
                            id="yourEmail"
                            required
                          />
                        </div>

                        <div className="col-12 mb-2">
                          <label for="yourPassword" className="form-label">
                            Password
                          </label>
                          <input
                            type="password"
                            name="password"
                            value={data.password}
                            onChange={handleChange}
                            className="form-control"
                            id="yourPassword"
                            required
                          />
                        </div>

                        <div className="col-12 mb-2">
                          <button
                            className="btn btn-secondary w-100"
                            type="submit"
                            onClick={submit}
                          >
                            {loading ? <Loader /> : "Create Account"}
                          </button>
                        </div>
                        <div className="col-12 mt-2 text-center mb-2">
                          <p className="small mb-0">
                            Already have an account?{" "}
                            <Link to="/login">Log in</Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    );
  }
};

export default Register;
