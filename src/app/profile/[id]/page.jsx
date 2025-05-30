'use client'

import * as React from 'react'

import { UserProvider } from '@/context/UserContext'
import AuthGuard from '../../../components/AuthGuard'
import { useParams } from 'next/navigation'
import ProfileLayout from './Profile'

function ProfilePage() {
  return (
    <div>
      {/* <UserProvider>
        <AuthGuard> */}
      <div
        className="body-container"
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <ProfileLayout></ProfileLayout>
      </div>
      {/* </AuthGuard>
      </UserProvider> */}
    </div>
  )
}

export default ProfilePage
