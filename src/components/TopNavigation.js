'use client'
import Link from 'next/link'
import '../styles/navigation.css'
import { useState, useEffect } from 'react'

const TopNavigation = () => {
  const defaultAvatar = '/avatar.jpg'
  const [name, setName] = useState('')
  const [avatar, setAvatar] = useState(defaultAvatar)
  const [id, setId] = useState(null)

  useEffect(() => {
    // Giả sử dữ liệu user được lưu trong localStorage

    setName(localStorage.getItem('name'))
    setId(localStorage.getItem(id))
    if (!localStorage.getItem('avatar'))
      setAvatar(localStorage.getItem('avatar'))
  }, [name, avatar])

  return (
    <nav className="navbar">
      <div className="nav-full-width"></div>
      <ul className="nav-list">
        <li className="nav-item">
          <Link className="social-app-link" href="/">
            Social App
          </Link>
        </li>
        <li className="nav-item">
          <Link href="/profile/">
            <div className="profile-info">
              <span>{name}</span>
              {/* Đây là avatar giả, hãy thay thế avatar bằng biến avatar của user */}
              <img src={avatar} alt="Avatar" className="avatar" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default TopNavigation
