'use client'

import React from 'react'
import './styles/friendgrid.css'
import ImageAvatar from './ImageAvatar'
import { useRef, useState, useEffect } from 'react'

const GridListFriends = ({ users }) => {
  const [windowWidth, setWindowWidth] = useState(1200)

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
    <div className="friend-grid-container">
      <div className="friend-grid-header">
        <h2 className="friend-grid-title">People</h2>
        <a href="#" className="friend-grid-link-all">
          See all people
        </a>
      </div>
      <div className="friend-grid">
        {users.map((user, index) => (
          <div className="friend-item" key={index}>
            <ImageAvatar
              avaData={{
                src: user.avatar,
                rOffsetX: user.ava_offsetX,
                rOffsetY: user.ava_offsetY,
                cropWidth: user.ava_width,
              }}
              dislaySize={((windowWidth - 20) / 2.5 - 56) / 3}
              borderRadius={6}
              alt={user.name}
              className="friend-avatar"
            />
            <p className="friend-name">{user.name}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default GridListFriends
