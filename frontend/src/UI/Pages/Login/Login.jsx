import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import login__logo from "../../Assets/login__logo.png";
import "./login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cookies, setCookie] = useCookies(["userToken"]);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already authenticated
    const userToken = cookies.userToken;
    if (userToken) {
      // Redirect to authenticated route or perform any other action
      console.log("User is already authenticated:", userToken);
    }
  }, [cookies.userToken]);

  const handleLogin = async (e) => {
    e.preventDefault();

    // Log email and password values
    console.log("Email:", email);
    console.log("Password:", password);

    // Make an API call to your server-side script
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    // Handle the response
    if (response.ok) {
      const data = await response.json();
      const userToken = data.token; // Assuming your server returns a token

      // Set user token in cookies
      setCookie("userToken", userToken, { path: "/" });

      // Log successful login
      console.log("Login successful");
      navigate("/home");
    } else {
      console.error("Login failed");
    }
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="forgot_password">
            Forgot Password?
            <a href="/Signup" role="button">
              Click here
            </a>
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
}

export default Login;
