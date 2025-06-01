import React from 'react'
import './styles/friendgrid.css'
import ImageAvatar from './ImageAvatar'
import { useRef, useState, useEffect } from 'react'
import Link from 'next/link'

const GridListFriends = ({ windowWidth, users }) => {
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
          <Link
            className="friend-item"
            key={index}
            href={`/profile-test/${user.id}`}
          >
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
          </Link>
        ))}
      </div>
    </div>
  )
}

export default GridListFriends
