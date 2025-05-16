// app/api/auth/login/route.js
import { NextResponse } from 'next/server'

export async function POST(request) {
  try {
    // Đọc dữ liệu từ form URL Encoded
    const body = await request.text()
    const params = new URLSearchParams(body)
    const data = Object.fromEntries(params.entries())

    const { email, password } = data

    // Kiểm tra định dạng email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { message: 'Email không hợp lệ' },
        { status: 400 }
      )
    }

    const res = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const result = await res.json()
    console.log('Data nhận được:', result.message)
    if (result.message === 'Invalid email or password') {
      const response = NextResponse.redirect('http://localhost:3000/login')
      response.cookies.set('token', '', {
        httpOnly: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24, // 1 day
        path: '/',
      })
      return response
    }

    if (!res.ok) {
      return NextResponse.json(result, { status: res.status })
    }

    // Set token vào cookie nếu login thành công
    const response = NextResponse.redirect('http://localhost:3000')
    response.cookies.set('token', result.token, {
      httpOnly: true,
      sameSite: 'lax',
      maxAge: 60 * 60 * 24, // 1 day
      path: '/',
    })
    return response
  } catch (error) {
    console.error('Error:', error)
    return NextResponse.json(
      { message: 'Failed to receive message' },
      { status: 500 }
    )
  }
}
