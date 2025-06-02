'use client'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import '../../styles/login-register.css'
import MaskedPasswordInput from './MaskedPasswordInput'

const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const passwordRef = useRef(null)
  const confirmPassRef = useRef(null)

  const isValidEmail = (email) => {
    const regex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/
    return regex.test(email)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Kiểm tra các điều kiện
    if (!name || !email || !password || !confirmPassword) {
      alert('Plesea enter full of informations')
      return
    }
    // if (!isValidEmail(email)) {
    //   alert('Email is invalid')
    //   return
    // }

    if (password !== confirmPassword) {
      alert('Confirm password is not match')
      return
    }

    try {
      const response = await fetch('http://localhost:4000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      })

      const data = await response.json()
      if (!response.ok) {
        alert(data.message || 'Failed to register')
        return
      }
      // Đăng ký thành công
      document.cookie = `token=${data.token}; path=/`
      alert(data.message)
      router.push(`/profile/${data.id}`)
    } catch (error) {
      console.error(error)
      alert('Failed to connect to server')
    }
  }
  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Register</h2>
        <form autoComplete="off">
          <div className="textbox">
            <input
              type="text"
              name="text"
              autoComplete="off"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="textbox">
            <input
              type="text"
              name="email"
              autoComplete="off"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <MaskedPasswordInput
            className="textbox"
            ref={passwordRef}
            value={password}
            setPassword={setPassword}
            name="password"
            placeholder="Password"
          ></MaskedPasswordInput>
          <MaskedPasswordInput
            className="textbox"
            ref={confirmPassRef}
            value={confirmPassword}
            setPassword={setConfirmPassword}
            name="password"
            placeholder="Confirm Password"
          ></MaskedPasswordInput>
          <button className="btn" onClick={handleSubmit}>
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
