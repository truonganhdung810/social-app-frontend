// app/page.tsx
// Nhập layout.tsx để sử dụng layout trong trang này

import GetToken from '../components/GetToken'
import TopNavigation from '../components/TopNavigation'

export default function Home() {
  return (
    <div>
      <GetToken />
      <TopNavigation />
    </div>
  )
}
