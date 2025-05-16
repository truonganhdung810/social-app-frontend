// app/login/page.js

import React from 'react'
import '../../styles/login.css'

// Server Component (được render trên server)
const Login = ({ cookies, searchParams }) => {
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form action="/api/auth/login" method="POST">
          <div className="textbox">
            <input type="email" name="email" placeholder="Email" required />
          </div>
          <div className="textbox">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="textbox">
            <input
              type="password"
              name="password"
              placeholder="Confirm Password"
              required
            />
          </div>
          <button className="btn" type="submit">
            Register
          </button>
          <p className="register-link">
            Do have an account? <a href="/login">Login here</a>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Login
