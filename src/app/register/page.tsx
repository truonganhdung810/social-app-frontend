// app/login/page.js

"use client";
import React from "react";
import { useState } from "react";
import "../../styles/login.css";

// Server Component (được render trên server)
const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message || "Registration failed");
        alert(data.message);
        return;
      }

      setMessage("Registration successful!");
      alert(data.message);
      setName("");
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setMessage("Failed to connect to server");
    }
  };
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form>
          <div className="textbox">
            <input
              type="text"
              name="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <button className="btn" onClick={handleSubmit}>
            Register
          </button>
          <p className="register-link">
            Do have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  );
};
export default Register;
