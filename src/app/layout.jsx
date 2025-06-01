// app/layout.jsx
import './globals.css'
import Link from 'next/link'
import Navigation from './Navigation'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Social App',
  description: 'Mạng xã hội đơn giản',
}

export default async function RootLayout({ children }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const isLoggedIn = !!token
  return (
    <html lang="en">
      <body>
        <Navigation isLoggedIn={isLoggedIn}></Navigation>
        <div
          className="page-wrapper"
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          {children}
        </div>
      </body>
    </html>
  )
}
