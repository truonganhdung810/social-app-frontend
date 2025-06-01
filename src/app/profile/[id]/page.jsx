'use client'

import * as React from 'react'

import { UserProvider } from '@/context/UserContext'
import AuthGuard from '../../../components/AuthGuard'
import { useParams } from 'next/navigation'
import ProfileLayout from './Profile'
import { cookies } from 'next/headers'
import MyProfileView from './MyProfileView'
import { redirect } from 'next/navigation'

async function ProfilePage({ params }) {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  const userId = params.id

  if (!token) {
    // Chưa đăng nhập => Guest
    return (
      <div>
        <div
          className="body-container"
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <GuestProfileLayout></GuestProfileLayout>
        </div>
      </div>
    )
  }
  try {
    const res = await fetch('http://localhost:4000/api/auth/me', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })

    if (!res.ok) {
      // Token không hợp lệ => cũng hiển thị Guest
      return <GuestProfileView profileId={profileId} />
    }

    const data = await res.json()
    const userId = data.id?.toString() // Đảm bảo cùng kiểu string để so sánh

    if (userId === profileId) {
      return <MyProfileView user={data} />
    } else {
      return <FriendProfileView profileId={profileId} viewerId={userId} />
    }
  } catch (error) {
    console.error('Error verifying token', error)
    return <GuestProfileView profileId={profileId} />
  }
}

export default ProfilePage
