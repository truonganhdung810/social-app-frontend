// src/pages/ProfilePage.js

import { useContext } from 'react'
import { UserContext } from '@/context/UserContext'

const Cover = () => {
  const { user } = useContext(UserContext) // Lấy dữ liệu người dùng từ context
  console.log('data user', user)
  return <div></div>
}

export default Cover
