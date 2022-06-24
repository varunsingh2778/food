import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginConfig } from "../../../Axiosconfig";
import '../Signup/Signup.css'
const Signup = () => {
  const [data, setData] = useState({});
  const navigate = useNavigate();
  useEffect(() => {
    let tokenid = JSON.parse(localStorage.getItem("Token"));
    if (tokenid) {
      navigate('/dashboard')
    }
  }, [])
  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };
  const sendApi = () => {
    loginConfig()
      .post(`/user/register`, data)
      .then((result) => {
        navigate("/login");
        console.log(result);
      })
      .catch((e) => {
        console.log(e.response.data.error);
      });
  };
  return (
    <>
      <section id="signUpcontainers">
        <div className="container h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-lg-12 col-xl-11">
              <div className="card text-black" id="signUpBoxx">
                <div className="card-body p-md-5">
                  <div className="row justify-content-center">
                    <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                      <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">
                        Sign up
                      </p>

                      <form className="mx-1 mx-md-4">
                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              id="fname"
                              type="text"
                              name="firstname"
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="name">
                              First Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              id="lname"
                              type="text"
                              name="lastname"
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="name">
                              Last Name
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              id="username"
                              type="text"
                              name="username"
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="name">
                              Username
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              id="email"
                              type="email"
                              name="email"
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="email">
                              Your Email
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              id="number"
                              type="number"
                              name="phone"
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="number" htmlFor="form3Example4cd">
                              Your Mobile Number
                            </label>
                          </div>
                        </div>

                        <div className="d-flex flex-row align-items-center mb-4">
                          <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                          <div className="form-outline flex-fill mb-0">
                            <input
                              id="password"
                              type="password"
                              name="password"
                              onChange={handleChange}
                              className="form-control"
                            />
                            <label className="form-label" htmlFor="password">
                              Password
                            </label>
                          </div>
                        </div>

                        <div className="form-check d-flex justify-content-center mb-5">
                          Already have an account? &nbsp;
                          <Link to="/login">Log In</Link>
                        </div>

                        <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                          <button
                            type="button"
                            className="btn btn-primary btn-lg"
                            onClick={sendApi}
                          >
                            Register
                          </button>
                        </div>
                      </form>
                    </div>
                    <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                      <img
                        src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/draw1.webp"
                        className="img-fluid"
                        alt="Sample image"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Signup