'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

export default function GetAllUsers() {
  const [listUsers, setListUsers] = useState([])
  const router = useRouter()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem('token')
        console.log('Token', token)

        if (token == null) {
          console.error('Chưa đăng nhập!')
          router.push('/login')
          return
        }

        const response = await fetch('http://localhost:4000/api/users', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })

        const data = await response.json()

        if (response.ok) {
          console.log('Danh sach user', data)
          setListUsers(data)
        } else {
          console.log(data.message || 'Lỗi khi lấy thông tin người dùng!')
        }
      } catch (error) {
        console.error(error)
        console.log('Không thể kết nối tới server!')
      }
    }

    fetchUserData()
  }, [])

  return (
    <div>
      {listUsers.map((user) => (
        <div key={user.id}>
          <p>ID: {user.id}</p>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <img src={user.avatar} alt={user.name} />
        </div>
      ))}
    </div>
  )
}
