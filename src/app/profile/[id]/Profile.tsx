// src/pages/ProfilePage.js

import { useContext } from 'react'
import CoverImage from '../../../components/cover-image/CoverImage'
import { UserContext } from '@/context/UserContext'
import Cover from './Cover'

const ProfilePage = () => {
  return (
    <div>
      <Cover />
    </div>
  )
}

export default ProfilePage
