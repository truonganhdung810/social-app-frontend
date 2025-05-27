// src/pages/ProfilePage.js
'use client'
import CoverContainer from '../cover-components/CoverContainer'
import AvatarContainer from '../avatar-components/AvatarContainer'
import React, { useState, useEffect, useRef } from 'react'

const ProfileLayout = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [isShowPopupCropAva, setIsShowPopupCropAva] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newHeight = window.innerHeight
      let w = newWidth < 1200 ? newWidth : 1200
      let h = newHeight > 700 ? newHeight : 700
      if (w < 350) w = 350
      if (h > 1200) h = 1200
      setWindowWidth((prevWidth) => {
        if (prevWidth !== w) {
          setIsShowPopupCropAva(false)
          return w
        }
        return prevWidth // không cập nhật nếu không thay đổi
      })
      setWindowHeight(h)
    }
    handleResize() // Lấy giá trị ban đầu
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return (
    <div className="profile-container">
      <div className="profile-layout">
        <CoverContainer windowWidth={windowWidth} />
        <AvatarContainer
          windowWidth={windowWidth}
          isShowPopupCropAva={isShowPopupCropAva}
          setIsShowPopupCropAva={setIsShowPopupCropAva}
        ></AvatarContainer>
      </div>
    </div>
  )
}

export default ProfileLayout
