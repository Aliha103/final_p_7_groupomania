import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import io from "socket.io-client";
import login__logo from "../../Assets/login__logo.png";
import "./login.css";

const socket = io("http://localhost:3001"); 

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["userToken"]);

  useEffect(() => {
    // Check if user is already authenticated
    const userToken = cookies.userToken;
    if (userToken) {
      // Redirect to authenticated route or perform any other action
      console.log("User is already authenticated:", userToken);
    }

    // Connect to socket.io server
    socket.on("connect", () => {
      console.log("Connected to socket.io server");
    });

    // Clean up when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [cookies.userToken]);

  const handleLogin = (e) => {
    e.preventDefault();
    
    // Perform login logic here
    // If login is successful, set user token in cookies
    const userToken = "your_generated_token"; // Replace with your actual token
    setCookie("userToken", userToken, { path: "/" });

    // Optionally, emit an event to the socket server on successful login
    socket.emit("login", { userToken });

    // Redirect to authenticated route or perform any other action
    console.log("Login successful");
  };

  return (
    <div className="login_page">
      <img className="login__logo" src={login__logo} alt="Groupomania logo" />
      <div className="login_detail">
        <h1 className="login_form_title"> Login </h1>
        <form onSubmit={handleLogin}>
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
