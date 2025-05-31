'use client'

import { usePathname, useRouter } from 'next/navigation'
import useAuth from '../hooks/useAuth'
import Link from 'next/link'

export default function Navigation() {
  const pathname = usePathname()
  const hideAuthLinks = ['/login', '/register'].includes(pathname)
  const { isLoggedIn, user, logout } = useAuth()

  return (
    <div
      className="navbar-container"
      style={{
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        position: 'fixed',
        zIndex: '1000',
      }}
    >
      <nav className="navbar">
        <Link href="/" className="logo">
          SocialApp
        </Link>

        <div className="nav-links">
          {!hideAuthLinks && !isLoggedIn && (
            <>
              <span style={{ color: 'green', textDecoration: 'underline' }}>
                You are currently viewing as a Guest
              </span>
              <Link href="/login">Login</Link>
              <Link href="/register">Register</Link>
            </>
          )}
          {isLoggedIn && (
            <>
              <span style={{ color: 'green', textDecoration: 'underline' }}>
                Welcome, {user?.name}
              </span>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault()
                  logout()
                  router.push('/')
                }}
              >
                Logout
              </a>
            </>
          )}
        </div>
      </nav>
    </div>
  )
}
