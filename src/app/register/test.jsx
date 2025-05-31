import React, { useState } from 'react'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    alert(
      'Đã submit:\n' +
        JSON.stringify({ name, email, password, confirmPassword }, null, 2)
    )
    // TODO: Gọi API ở đây
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Name */}
          <div className="textbox">
            <div
              contentEditable
              className="form-input"
              placeholder="Name"
              onInput={(e) => setName(e.currentTarget.textContent)}
              suppressContentEditableWarning={true}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <input type="hidden" name="name" value={name} />
          </div>

          {/* Email */}
          <div className="textbox">
            <div
              contentEditable
              className="form-input"
              placeholder="Email"
              onInput={(e) => setEmail(e.currentTarget.textContent)}
              suppressContentEditableWarning={true}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <input type="hidden" name="email" value={email} />
          </div>

          {/* Password */}
          <div className="textbox">
            <div
              contentEditable
              className="form-input"
              placeholder="Password"
              onInput={(e) => setPassword(e.currentTarget.textContent)}
              suppressContentEditableWarning={true}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <input type="hidden" name="password" value={password} />
          </div>

          {/* Confirm Password */}
          <div className="textbox">
            <div
              contentEditable
              className="form-input"
              placeholder="Confirm Password"
              onInput={(e) => setConfirmPassword(e.currentTarget.textContent)}
              suppressContentEditableWarning={true}
              style={{
                padding: '10px',
                border: '1px solid #ccc',
                borderRadius: '4px',
              }}
            />
            <input
              type="hidden"
              name="confirmPassword"
              value={confirmPassword}
            />
          </div>

          <button type="submit" className="btn">
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

export default Register
