'use client'
import React from 'react'
import { useState, useRef, useEffect } from 'react'
import '../../styles/login-register.css'
import { BiShow } from 'react-icons/bi'

// Server Component (được render trên server)
const Register = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isPasswordHidden, setIsPasswordHidden] = useState(false)
  const passwordRef = useRef(null)
  const confirmPassRef = useRef(null)
  const [realPassword, setRealPassword] = useState('')
  const lastLengthRef = useRef(0)
  const [showPassword, setShowPassword] = useState(false)
  const [isHasPassword, setIsHasPassword] = useState(false)

  const handlePasswordChange = (e) => {
    if (e.target.value.length > 0) setIsHasPassword(true)
    const input = e.target
    const newMaskedValue = input.value
    const newLength = newMaskedValue.length
    const selectionPos = input.selectionStart
    const oldValue = realPassword

    if (newLength > lastLengthRef.current) {
      // Gõ thêm ký tự
      const addedChar = newMaskedValue[newLength - 1]
      if (addedChar === ' ') return // Vô hiệu hoá dấu cách
      const insertPos = selectionPos - 1
      const updated =
        oldValue.slice(0, insertPos) + addedChar + oldValue.slice(insertPos)
      setRealPassword(updated)
    } else {
      // Xoá ký tự
      const deleteCount = lastLengthRef.current - newLength
      const deletePos = selectionPos
      const updated =
        oldValue.slice(0, deletePos) + oldValue.slice(deletePos + deleteCount)
      setRealPassword(updated)
    }

    lastLengthRef.current = newLength
    console.log('Password', realPassword)
  }

  const handleMouseDown = () => setShowPassword(true)
  const handleMouseUp = () => setShowPassword(false)

  const handleSubmitTest = () => {
    console.log('Submit', realPassword)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

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
        alert(data.message)
        return
      }
      alert(data.message)
      setName('')
      setEmail('')
      setPassword('')
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
              name="text"
              autoComplete="off"
              placeholder="New Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div
            className="textbox"
            style={{ display: 'flex', alignItems: 'center' }}
          >
            <input
              ref={passwordRef}
              type="text"
              name="text"
              autoComplete="off"
              placeholder="Password"
              value={
                showPassword ? realPassword : '*'.repeat(realPassword.length)
              }
              onChange={handlePasswordChange}
              required
            />
            {isHasPassword && (
              <button
                type="button"
                onMouseDown={handleMouseDown}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                style={{ marginLeft: '10px', marginRight: '10px' }}
              >
                <BiShow
                  style={{
                    scale: '1.2',
                    color: showPassword ? 'rgb(44, 134, 81)' : 'inherit',
                  }}
                ></BiShow>
              </button>
            )}
          </div>
          <div className="textbox">
            <input
              ref={confirmPassRef}
              type="text"
              name="text"
              autoComplete="off"
              placeholder="Confirm Password"
              value={confirmPassword}
              required
            />
          </div>
          <button className="btn" onClick={handleSubmitTest}>
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
