import './globals.css'
import Link from 'next/link'

export const metadata = {
  title: 'Social App',
  description: 'Mạng xã hội đơn giản',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <nav className="navbar">
          <Link href="/homepage" className="logo">
            SocialApp
          </Link>
          <div className="nav-links">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        </nav>
        <div>{children}</div>
      </body>
    </html>
  )
}
