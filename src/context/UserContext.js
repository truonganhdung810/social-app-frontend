// context/UserContext.js
import React, { createContext, useState, useEffect } from 'react'

const UserContext = createContext()

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Lấy dữ liệu người dùng từ localStorage khi ứng dụng khởi tạo
  useEffect(() => {
    const storedUser = {
      id: localStorage.getItem('id'),
      token: localStorage.getItem('token'),
      email: localStorage.getItem('email'),
      name: localStorage.getItem('name'),
      role: localStorage.getItem('role'),
      avatar: localStorage.getItem('avatar'),
      ava_offsetX: localStorage.getItem('ava_offsetX'),
      ava_offsetY: localStorage.getItem('ava_offsetY'),
      ava_width: localStorage.getItem('ava_width'),
      cover: localStorage.getItem('cover'),
      cover_offsetX: localStorage.getItem('cover_offsetX'),
      cover_offsetY: localStorage.getItem('cover_offsetY'),
    }
    console.log('stored User', storedUser)
    if (storedUser) {
      setUser(storedUser)
      console.log(user)
    }
  }, [])

  // Cập nhật user và lưu vào localStorage
  const updateUser = (newUser) => {
    setUser(newUser)
    localStorage.setItem('id', newUser.id)
    localStorage.setItem('token', newUser.token)
    localStorage.setItem('email', newUser.email)
    localStorage.setItem('name', newUser.name)
    localStorage.setItem('role', newUser.role)
    localStorage.setItem('avatar', newUser.avatar)
    localStorage.setItem('ava_offsetX', newUser.ava_offsetX)
    localStorage.setItem('ava_offsetY', newUser.ava_offsetY)
    localStorage.setItem('ava_width', newUser.ava_width)
    localStorage.setItem('cover', newUser.cover)
    localStorage.setItem('cover_offsetX', newUser.cover_offsetX)
    localStorage.setItem('cover_offsetY', newUser.cover_offsetY)
  }

  return (
    <UserContext.Provider value={{ user, updateUser }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }
