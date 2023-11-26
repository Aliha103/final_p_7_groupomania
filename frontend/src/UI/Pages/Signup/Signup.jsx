import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import login__logo from "../../Assets/login__logo.png";
import "./Signup.css";

const SignUp = () => {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (firstname.trim() === "") {
      console.error("First Name is required.");
      // Optionally, display an error message to the user.
      return;
    }

    const userData = {
      firstname,
      lastname,
      email,
      password,
    };

    try {
      const response = await fetch("http://localhost:8000/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        // Save user data to localStorage
        localStorage.setItem("firstname", data.firstname);
        localStorage.setItem("lastname", data.lastname);
        localStorage.setItem("email", data.email);
        localStorage.setItem("userId", data.id);
        // Navigate to HomePage
        navigate("/home");
        console.log("Sign-up successful");
      } else {
        // Handle an error response from your backend
        const data = await response.json();
        console.error("Sign-up failed:", data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  return (
    <div className="signup_page">
      <img className="signup__logo" src={login__logo} alt="Groupomania logo" />
      <div className="signup_detail">
        <h1 className="signup_form_title"> Sign up </h1>
        <form onSubmit={handleSubmit}>
          <div className="firstname_section">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              placeholder="Enter your First Name"
              name="firstname"
              value={firstname}
              onChange={(e) => setfirstname(e.target.value)}
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
              onChange={(e) => setlastname(e.target.value)}
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
              onChange={(e) => setemail(e.target.value)}
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
};

export default SignUp;
