import React from "react";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <div className="card-auth">
      <div className="container">
        <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-lg-4 col-md-6 d-flex flex-column align-items-center justify-content-center">
                <div className="card  mb-3">
                  <div className="card-body">
                    <div className="pt-4 pb-2">
                      <h4 className="card-title text-center pb-0 ">
                        Create BlogXer Account
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
                          className="form-control"
                          id="yourPassword"
                          required
                        />
                      </div>

                      <div className="col-12 mb-2">
                        <button className="btn btn-primary w-100" type="submit">
                          Create Account
                        </button>
                      </div>
                      <div className="col-12 mb-2">
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
