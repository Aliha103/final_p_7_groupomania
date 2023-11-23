import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login__logo from "../../Assets/login__logo.png";
import "./login.css";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    if (email.trim() === "" || password.trim() === "") {
      setNotification("Email and password are required.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      console.log("Response from server:", response);

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("token", data.token);
        localStorage.setItem("userEmail", data.user.email);
        localStorage.setItem("firstname", data.user.firstname); // Store the user's first name
        localStorage.setItem("lastname", data.user.lastname); // Store the user's last name
        setNotification("Login successful");
        console.log("Login successful");
        navigate("/home");
      } else {
        const data = await response.json();
        setNotification(data.error || "Email or Password not found");
        console.error("Login failed:", data.error);
      }
    } catch (error) {
      setNotification("An error occurred");
      console.error("An error occurred:", error.message);
    }
  };

  return (
    <div className="login_page">
      <img className="login__logo" src={login__logo} alt="Groupomania logo" />
      <div className="login_detail">
        <h1 className="login_form_title"> Login </h1>
        <form onSubmit={handleLogin}>
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

          {/* Display notification message if present */}
          {notification && (
            <p className="notification_message">{notification}</p>
          )}

          <div className="forgot_password">
            Forgot Password?
            <Link to="/signup" role="button">
              Click here
            </Link>
          </div>

          <div className="form_submit_btn">
            <button className="btn btn-primary" type="submit">
              {" "}
              Login{" "}
            </button>
            <p className="signup_link"> Don't have an account? </p>
            <Link to="/signup" className="btn btn-secondary">
              Sign Up
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LogIn;
