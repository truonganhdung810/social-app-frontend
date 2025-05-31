'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'
import '../../styles/login-register.css'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include', // gửi + nhận cookie
      })

      const data = await response.json()

      if (!response.ok) {
        alert(data.message || 'Login failed')
        return
      }
      alert('Login successful')
      console.log('Data', data)
      if (data.user.role === 'user') {
        //lưu dữ liệu user vào Local Storate
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
        router.push(`/profile-test/${data.user.id}`)
      } else if (data.user.role === 'admin') {
        // Đi tới trang admin
        router.push('/admin')
      }
    } catch (err) {
      alert('Something went wrong')
      console.error(err)
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
