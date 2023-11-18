import React from "react";
import { Link } from "react-router-dom";
import login__logo from "../../Assets/login__logo.png";
import "./login.css";

function Login() {
  return (
    <div className="login_page">
      <img className="login__logo" src={login__logo} alt="Groupomania logo" />
      <div className="login_detail">
        <h1 className="login_form_title"> Login </h1>
        <form action="login_detail_form">
          <div className="email_section">
            {/* label for the input */}
            <label htmlFor="email">Email</label>
            {/* Input element without text content */}
            <input
              type="text"
              id="email"
              placeholder="Enter your Email"
              name="email"
              required
            />
          </div>
          <div className="password_section">
            {/* label for the input */}
            <label htmlFor="password">Password</label>
            {/* Input element without text content */}
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              required
            />
          </div>
          <div className="forgot_password">
            Forgot Password?
            <a href="#" role="button">
              Click here
            </a>
          </div>

          <div className="form_submit_btn">
            <button className="btn btn-primary" type="submit">
              {" "}
              Login{" "}
            </button>
            <p className="signup_link"> Don't have an account? </p>
            <Link to="/Signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
