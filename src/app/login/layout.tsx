import '../../styles/navigation.css'

export const metadata = {
  title: 'Social App - Login',
  description: 'Mạng xã hội đơn giản',
}
export default function LoginLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div>{children}</div>
}
