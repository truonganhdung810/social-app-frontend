// app/login/page.js

'use client'
import React, { useEffect } from 'react'
import { useState } from 'react'
import '../../styles/login-register.css'
import 'react-toastify/dist/ReactToastify.css'
import { useRouter } from 'next/navigation'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    // Xóa toàn bộ dữ liệu trước khi login
    localStorage.clear()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
      console.log('Check response: ', response)
      const data = await response.json()

      if (!response.ok) {
        console.log(data.message || 'Login failed')
        return
      }
      if (data.user.role === 'user') {
        //lưu dữ liệu user vào Local Storate
        localStorage.setItem('token', data.token)
        localStorage.setItem('name', data.user.name)
        localStorage.setItem('id', data.user.id)
        localStorage.setItem('email', data.user.email)
        localStorage.setItem('role', data.user.role)
        localStorage.setItem('avatar', data.user.avatar)
        localStorage.setItem('ava_offsetX', data.user.ava_offsetX)
        localStorage.setItem('ava_offsetY', data.user.ava_offsetY)
        localStorage.setItem('ava_width', data.user.ava_width)
        localStorage.setItem('cover', data.user.cover_photo)
        localStorage.setItem('cover_offsetX', data.user.cover_offsetX)
        localStorage.setItem('cover_offsetY', data.user.cover_offsetY)

        //đi tới trang home
        router.push('/')
      } else if (data.user.role === 'admin') {
        // Đi tới trang admin
        router.push('/admin')
      }
    } catch (err) {
      console.log('Failed to connect to the server!')
    }
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <form>
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
          <button className="btn" onClick={handleSubmit}>
            Login
          </button>
          <p className="register-link">
            Do not have an account? <a href="/register">Register here</a>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Login
