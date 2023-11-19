// Signup.jsx
import React, { useState } from "react";
import { Link } from "react-router-dom";
import io from "socket.io-client";
import login__logo from "../../Assets/login__logo.png";
import "./Signup.css";

const socket = io("http://localhost:3001");

function Signup() {
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e) => {
    e.preventDefault();

    // Performing signup logic here

    // Emit an event to the socket server on successful signup
    socket.emit("signup", { firstname, lastname, email, password });

    // Redirect to another page or perform any other action
    console.log("Signup successful");
  };

  return (
    <div className="signup_page">
      <img className="signup__logo" src={login__logo} alt="Groupomania logo" />
      <div className="signup_detail">
        <h1 className="signup_form_title"> Sign up </h1>
        <form onSubmit={handleSignup}>
          <div className="firstname_section">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter your First Name"
              name="firstname"
              value={firstname}
              onChange={(e) => setFirstname(e.target.value)}
              required
            />
          </div>
          <div className="lastname_section">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              placeholder="Enter your Last Name"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastname(e.target.value)}
              required
            />
          </div>
          <div className="email_section">
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              placeholder="Enter your Email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="password_section">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="form_submit_btn">
            <button className="btn btn-primary" type="submit">
              Sign Up
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
