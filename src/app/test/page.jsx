import { cookies } from 'next/headers'
import Home from './Home'

export default async function HomePage() {
  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value

  let postData = []
  try {
    if (!token) {
      const res = await fetch('http://localhost:4000/api/posts/public', {
        cache: 'no-store',
      })
      postData = await res.json()
    }
  } catch (err) {
    console.error('Failed to fetch posts', err)
  }

  const res = await fetch('http://localhost:4000/api/users/public', {
    cache: 'no-store',
  })
  const users = await res.json()
  console.log('danh sach user', users)

  return (
    <div
      className="body-container"
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <Home posts={postData} users={users}></Home>
    </div>
  )
}
