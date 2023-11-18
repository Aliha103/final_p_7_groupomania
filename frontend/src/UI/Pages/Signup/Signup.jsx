import React from "react";
import login__logo from "../../Assets/login__logo.png";
import { Link } from "react-router-dom";
import "./Signup.css";

function Signup() {
  return (
    <div className="signup_page">
      <img className="signup__logo" src={login__logo} alt="Groupomania logo" />
      <div className="signup_detail">
        <h1 className="signup_form_title"> Sign up </h1>
        <form action="signup_detail_form">
          <div className="firstname_section">
            {" "}
            {/* label for the input */}
            <label htmlFor="firstname">First Name</label>
            {/* Input element without text content */}
            <input
              type="text"
              id="firstname"
              placeholder="Enter your First Name"
              name="firstname"
              required
            />
          </div>
          <div className="lastname_section">
            {/* label for the input */}
            <label htmlFor="lastname">Last Name</label>
            {/* Input element without text content */}
            <input
              type="text"
              id="lastname"
              placeholder="Enter your Last Name"
              name="lastname"
              required
            />
          </div>
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
          <div className="form_submit_btn">
            <button className="btn btn-primary" type="submit">
              {" "}
              Sign Up{" "}
            </button>
            <p className="login_link"> Already have an account? </p>
            <Link to="/login" className="btn btn-secondary">
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Signup;
