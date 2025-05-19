import './globals.css'

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
        <div>{children}</div>
      </body>
    </html>
  )
}
