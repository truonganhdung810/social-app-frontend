// app/login/page.js

import React from 'react'
import '../../styles/login.css'

// Server Component (được render trên server)
const Login = ({ cookies, searchParams }) => {
  // Kiểm tra nếu có token trong cookies
  //const token = cookies.token

  // if (token) {
  //   // Nếu đã có token, chuyển hướng người dùng tới dashboard
  //   return (
  //     <div>
  //       <h2>Bạn đã đăng nhập rồi!</h2>
  //       <a href="/dashboard">Đi đến trang dashboard của bạn</a>
  //     </div>
  //   )
  // }

  // Xử lý lỗi nếu có
  let errorMessage = null
  if (searchParams.error) {
    errorMessage = 'Thông tin đăng nhập không đúng. Vui lòng thử lại.'
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        {errorMessage && <p className="error">{errorMessage}</p>}
        <form onSubmit>
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
          <button className="btn" type="submit">
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

// Hàm này xử lý việc lấy thông tin từ cookies và query params
export async function generateMetadata({ cookies, searchParams }) {
  // Trả về thông tin cookies và query params để có thể sử dụng trong page component
  return {
    props: {
      cookies,
      searchParams,
    },
  }
}

export default Login
