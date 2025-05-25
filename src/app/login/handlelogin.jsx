// File này chỉ lưu code

import { setCookie } from 'cookies-next' // Thư viện cookies-next giúp dễ dàng thao tác với cookies trong Next.js

const handleLogin = async (data) => {
  try {
    if (data.user.role === 'user') {
      // Lưu token vào cookie
      setCookie('token', data.token, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
      }) // Cookie hết hạn sau 7 ngày

      // Lưu thông tin người dùng vào localStorage
      localStorage.setItem('name', data.user.name)
      localStorage.setItem('email', data.user.email)
      localStorage.setItem('avatar', data.user.avatar)
      localStorage.setItem('ava_offsetX', data.user.ava_offsetX)
      localStorage.setItem('ava_offsetY', data.user.ava_offsetY)
      localStorage.setItem('ava_width', data.user.ava_width)
      localStorage.setItem('cover', data.user.cover_photo)
      localStorage.setItem('cover_offsetX', data.user.cover_offsetX)
      localStorage.setItem('cover_offsetY', data.user.cover_offsetY)

      // Redirect đến trang Home
      router.push('/')
    } else if (data.user.role === 'admin') {
      // Redirect đến trang Admin
      router.push('/admin')
    }
  } catch (err) {
    toast.error('Failed to connect to the server!')
  }
}
