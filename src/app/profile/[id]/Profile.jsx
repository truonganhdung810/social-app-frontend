// src/pages/ProfilePage.js
'use client'
import CoverContainer from '../cover-components/CoverContainer'
import AvatarContainer from '../avatar-components/AvatarContainer'
import React, { useState, useEffect, useRef } from 'react'
import ProfileContainer from '../content-components/ProfileContainer'

const ProfileLayout = () => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [isShowPopupCropAva, setIsShowPopupCropAva] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)

  // Các thông số của Avatar
  let src = localStorage.getItem('avatar')
  let cropWidth = localStorage.getItem('ava_width')
  if (src === 'null') {
    src = '/default-avatar_size200x200.jpg'
    cropWidth = 200
  }
  // Tách chuỗi từ phần '_size'
  const sizePart = src.split('_size')[1]
  const dimensions = sizePart.split('.')[0].split('x')

  // Lấy width và height
  const width = parseInt(dimensions[0], 10)
  const height = parseInt(dimensions[1], 10)

  const rOffsetX = localStorage.getItem('ava_offsetX')
  const rOffsetY = localStorage.getItem('ava_offsetY')
  const [userAvaData, setUserAvaData] = useState({
    src,
    width,
    height,
    rOffsetX,
    rOffsetY,
    cropWidth,
  })

  const userName = localStorage.getItem('name')

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
          userName={userName}
          userAvaData={userAvaData}
          setUserAvaData={setUserAvaData}
          isShowPopupCropAva={isShowPopupCropAva}
          setIsShowPopupCropAva={setIsShowPopupCropAva}
        ></AvatarContainer>
        <div className="mt-16">
          <ProfileContainer
            userName={userName}
            userAvaData={userAvaData}
          ></ProfileContainer>
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
