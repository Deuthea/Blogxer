import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loginUser, registerUser } from "../../features/Auth/authSlice";
import "./Register.css";
import { api } from "../../config.js";

const endPoint = api.endPoint;

const Register = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState({ name: "", email: "", password: "" });

  const submit = async (e) => {
    e.preventDefault();
    console.log(data);
    const res = await fetch(`${endPoint}/api/auth/register`, {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    console.log(res);
    const resP = await res.json();
    dispatch(registerUser(resP));
    console.log(resP);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  return (
    <div className="">
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container ">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card card-auth  mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h4 className="card-title text-center pb-0 ">
                        Create <span className="font-weight-bold">Blogxer</span>{" "}
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
                          Create Account
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
};

export default Register;
