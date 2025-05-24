'use client'
import React, { useState, useEffect, useRef } from 'react'
import WindowWidth from './windowWidth'
import CoverImage from './CoverImage'
import './test.css'

const ProfilePage = () => {
  const coverData = useRef({
    src: 'http://localhost:4000/uploads/images/1747905600514.jpg',
    width: 1200,
    height: 800,
    offsetX: 0,
    offsetY: 0,
  })
  const newWidth = window.innerWidth
  let w = newWidth < 1200 ? newWidth : 1200
  const [windowWidth, setWindowWidth] = useState(w)

  console.log(coverData.width)

  const handleResize = () => {
    const newWidth = window.innerWidth
    setWindowWidth(newWidth < 1200 ? newWidth : 1200)
  }

  // Sử dụng useEffect để gắn sự kiện resize khi component được mount
  useEffect(() => {
    // Gắn sự kiện resize
    window.addEventListener('resize', handleResize)

    // Dọn dẹp sự kiện khi component bị unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, []) // Chạy một lần khi component mount

  return (
    <div className="main-container" style={{ width: `${windowWidth}px` }}>
      <div className="top-navigation">
        <h1>Top Navigation</h1>
      </div>
      <div
        className="cover-image"
        style={{
          width: `${windowWidth}px`,
          height: `${windowWidth / 3}px`,
        }}
      >
        <CoverImage
          imgSrc={coverData.current.src}
          width={coverData.current.width}
          height={coverData.current.height}
          offsetX={coverData.current.offsetX}
          offsetY={coverData.current.offsetY}
          windowWidth={1200}
        ></CoverImage>
      </div>
    </div>
  )
}

export default ProfilePage
