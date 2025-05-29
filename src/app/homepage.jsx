'use client'
import { useState } from 'react'
import '../styles/homepage.css' // Import CSS thuần

export default function HomePage() {
  const [showUserList, setShowUserList] = useState(false)

  const dummyPosts = [
    {
      id: 1,
      content: 'Bài viết đầu tiên',
      user: { name: 'Alice', avatar: '/avatar1.png' },
    },
    {
      id: 2,
      content: 'Bài viết thứ hai',
      user: { name: 'Bob', avatar: '/avatar2.png' },
    },
  ]

  const dummyUsers = [
    { id: 1, name: 'Alice', avatar: '/avatar1.png' },
    { id: 2, name: 'Bob', avatar: '/avatar2.png' },
    { id: 3, name: 'Charlie', avatar: '/avatar3.png' },
  ]

  return (
    <div className="homepage">
      {/* Main content */}
      <div className="content">
        <div className="post-list">
          {dummyPosts.map((post) => (
            <div key={post.id} className="post">
              <div className="post-header">
                <img
                  src={post.user.avatar}
                  alt={post.user.name}
                  className="avatar"
                />
                <span className="username">{post.user.name}</span>
              </div>
              <p>{post.content}</p>
            </div>
          ))}
        </div>

        <div className="user-list desktop-only">
          <h4>Friends</h4>
          {dummyUsers.map((user) => (
            <div key={user.id} className="user-item">
              <img src={user.avatar} className="avatar-small" />
              <span>{user.name}</span>
              <span className="online-dot"></span>
            </div>
          ))}
        </div>
      </div>

      {/* Floating button + user list on mobile */}
      <div className="floating-user-list mobile-only">
        <button
          className="floating-btn"
          onClick={() => setShowUserList(!showUserList)}
        >
          👥
        </button>

        {showUserList && (
          <div className="user-popup">
            <h4>Friends</h4>
            {dummyUsers.map((user) => (
              <div key={user.id} className="user-item">
                <img src={user.avatar} className="avatar-small" />
                <span>{user.name}</span>
                <span className="online-dot"></span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
