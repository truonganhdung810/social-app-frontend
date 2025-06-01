// src/pages/ProfilePage.js
'use client'
import CoverContainer from '../cover-components/CoverContainer'
import AvatarContainer from '../avatar-components/AvatarContainer'
import React, { useState, useEffect, useRef } from 'react'
import ProfileContainer from '../content-components/ProfileContainer'

const MyProfileView = ({ token, userId, users }) => {
  const [windowWidth, setWindowWidth] = useState(0)
  const [isShowPopupCropAva, setIsShowPopupCropAva] = useState(false)
  const [windowHeight, setWindowHeight] = useState(0)
  const [userAvaData, setUserAvaData] = useState({
    src: '/default-avatar_size200x200.jpg',
    width: 200,
    height: 200,
    rOffsetX: 0,
    rOffsetY: 0,
    cropWidth: 200,
  })
  const [userName, setUserName] = useState('')
  const [coverData, setCoverData] = useState({
    src: '/default_cover_size1200x400.png',
    width: 1200,
    height: 400,
    offsetX: 0,
    offsetY: 0,
  })

  // User Effect lấy ra các thông số của Avatar và Cover
  useEffect(() => {
    // Thông số avatar
    let ava_src = localStorage.getItem('avatar')
    let ava_cropWidth = localStorage.getItem('ava_width')

    if (ava_src === 'null' || ava_src === null) {
      ava_src = '/default-avatar_size200x200.jpg'
      ava_cropWidth = 200
    }

    // Tách phần size
    let ava_width = 200
    let ava_height = 200
    const ava_sizePart = ava_src.split('_size')[1]
    if (ava_sizePart) {
      const ava_dimensions = ava_sizePart.split('.')[0].split('x')
      ava_width = parseInt(ava_dimensions[0], 10)
      ava_height = parseInt(ava_dimensions[1], 10)
    }

    const ava_rOffsetX = Number(localStorage.getItem('ava_offsetX')) || 0
    const ava_rOffsetY = Number(localStorage.getItem('ava_offsetY')) || 0

    setUserAvaData({
      src: ava_src,
      width: ava_width,
      height: ava_height,
      rOffsetX: ava_rOffsetX,
      rOffsetY: ava_rOffsetY,
      cropWidth: Number(ava_cropWidth) || 200,
    })

    // UserName
    setUserName(localStorage.getItem('name') || '')

    // Thông số cho cover
    const cover_src =
      localStorage.getItem('cover') === 'null'
        ? '/default_cover_size1200x400.png'
        : localStorage.getItem('cover')
    // Tách chuỗi từ phần '_size'
    const cover_sizePart = cover_src.split('_size')[1]
    const cover_dimensions = cover_sizePart.split('.')[0].split('x')

    // Lấy width và height
    const cover_width = parseInt(cover_dimensions[0], 10)
    const cover_height = parseInt(cover_dimensions[1], 10)

    const cover_offsetX = localStorage.getItem('cover_offsetX')
    const cover_offsetY = localStorage.getItem('cover_offsetY')

    setCoverData({
      src: cover_src,
      width: cover_width,
      height: cover_height,
      offsetX: cover_offsetX,
      offsetY: cover_offsetY,
    })
  }, [])

  // Effect kiểm tra kích thước trình duyệt
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      let w = newWidth < 1200 ? newWidth : 1200
      if (w < 350) w = 350
      setWindowWidth((prevWidth) => {
        if (prevWidth !== w) {
          return w
        }
        return prevWidth // không cập nhật nếu không thay đổi
      })
    }
    handleResize() // Lấy giá trị ban đầu
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return (
    <div className="profile-container">
      <div className="profile-layout">
        <div className="image-profile">
          <CoverContainer
            token={token}
            coverData={coverData}
            setCoverData={setCoverData}
            windowWidth={windowWidth}
          />
          <AvatarContainer
            token={token}
            windowWidth={windowWidth}
            userName={userName}
            userAvaData={userAvaData}
            setUserAvaData={setUserAvaData}
            isShowPopupCropAva={isShowPopupCropAva}
            setIsShowPopupCropAva={setIsShowPopupCropAva}
          ></AvatarContainer>
        </div>
        <div className="mt-16">
          <ProfileContainer
            token={token}
            userId={userId}
            userName={userName}
            userAvaData={userAvaData}
            windowWidth={windowWidth}
            users={users}
          ></ProfileContainer>
        </div>
      </div>
    </div>
  )
}

export default MyProfileView
