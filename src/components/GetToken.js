'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function GetToken() {
  const router = useRouter()
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem('token')
        console.log('Token', token)

        if (token == null) {
          toast.error('Chưa đăng nhập!')
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
        } else {
          toast.error(data.message || 'Lỗi khi lấy thông tin người dùng!')
        }
      } catch (error) {
        console.error(error)
        toast.error('Không thể kết nối tới server!')
      }
    }

    fetchUserData()
  }, [])

  return null
}
