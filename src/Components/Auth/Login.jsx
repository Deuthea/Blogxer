import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { loginUser } from "../../features/Auth/authSlice";
import { Link, Navigate } from "react-router-dom";
import { api } from "../../config.js";
import { toast } from "react-toastify";
import Loader from "../Loader/Loader";

const endPoint = api.endPoint;

const Login = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const state = useSelector((state) => state.auth.isAuthenticated);
  const [data, setData] = useState({ email: "", password: "" });
  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // console.log(data);
    const res = await fetch(`${endPoint}/api/auth/login`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    // console.log(res);
    const resP = await res.json();
    if (resP.status === "ok") {
      toast.success("Login Successfully 🔥", {
        position: toast.POSITION.TOP_CENTER,
      });
      dispatch(loginUser(resP));
    } else {
      toast.error(`${resP.error}!! 🙂`, {
        position: toast.POSITION.TOP_CENTER,
      });
    }
    setLoading(false);
    console.log(resP);
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
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="card card-auth mb-3">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h4 className="card-title text-center pb-0 ">
                          Login your Account
                        </h4>
                        <p className="text-center small">
                          Enter your details to create account
                        </p>
                      </div>

                      <form className="row g-3 needs-validation" novalidate>
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
                            value={data.password}
                            onChange={handleChange}
                            name="password"
                            className="form-control"
                            id="yourPassword"
                            required
                          />
                        </div>

                        <div className="col-12 mb-2">
                          <button
                            onClick={submit}
                            className="btn btn-secondary w-100"
                            type="submit"
                          >
                            {loading ? <Loader /> : "Login"}
                          </button>
                        </div>
                        <div className="col-12  mt-2 text-center  mb-2">
                          <p className="small mb-0">
                            Don't have an account?{" "}
                            <Link to="/register">Register</Link>
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

export default Login;
