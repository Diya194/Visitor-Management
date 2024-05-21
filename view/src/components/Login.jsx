import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(values);
    axios
      .post("http://localhost:3000/employee/login", values)
      .then((result) => {
        console.log("Server Response:", result.data);
        if (result.data.message === "Authentication successful!!") {
          localStorage.setItem("valid", true);
          navigate("/dashboard");
        } else {
          console.error("Something went wrong:", result.data.message);
          // Optionally, you can handle other error cases here
        }
      })
      .catch((err) => console.log(err));
  };

  const handleForgotPassword = () => {
    navigate("/forgotpassword");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };
  const handleVisitor = () => {
    navigate("/visitorform");
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 loginPage">
      <div className="p-3 rounded w-29 border loginForm">
        <h2>Login Page</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email:</strong>
            </label>
            <input
              type="email"
              name="email"
              autoComplete="off"
              placeholder="Enter Email"
              onChange={(e) => setValues({ ...values, email: e.target.value })}
              className="form-control rounded-0"
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password:</strong>
            </label>
            <input
              type="password"
              name="password"
              autoComplete="off"
              placeholder="Enter Password"
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              className="form-control rounded-0"
            />
          </div>
          <button
            className="btn btn-success w-100 rounded-0 mb-2"
            onClick={handleSubmit}
          >
            Log in
          </button>
        </form>
        <p className="forgotPassword" onClick={handleForgotPassword}>
          Forgot Password?
        </p>
        <p className="signUpLink" onClick={handleSignUp}>
          New User Register?
        </p>
        <p className="signUpLink" onClick={handleVisitor}>
          A Visitor?Fill in
        </p>
      </div>
    </div>
  );
};

export default Login;
