import { cookies } from 'next/headers'
import GuestProfileView from '../guestview/GuestProfileView'
import { cache } from 'react'
import MyProfileView from '../../profile/[id]/MyProfileView'

async function ProfilePage({ params }) {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const { id } = await params
  console.log(token)

  let currentUser = null
  let viewMode = 'guest' // default

  // danh sách users được dùng chung ở cả 3 viewmode
  const resUsers = await fetch('http://localhost:4000/api/users/public', {
    cache: 'no-store',
  })
  const users = await resUsers.json()

  // Lấy ra thông tin của user id, dùng chung ở cả 3 viewmode
  const resProfileId = await fetch(
    `http://localhost:4000/api/users/public/${id}`,
    {
      cache: 'no-store',
    }
  )

  if (!resProfileId.ok) {
    return <div>User not found</div> // hoặc notFound()
  }
  const { user } = await resProfileId.json()

  // TH1 nếu không có token -> GuestProfileView
  if (!token) {
    const resPosts = await fetch(
      `http://localhost:4000/api/posts/public/user/${id}`,
      { cache: 'no-store' }
    )

    if (!resPosts.ok) {
      return <div>User not found</div> // hoặc notFound()
    }
    const posts = await resPosts.json()

    return (
      <div
        className="guest-profile-container"
        style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
      >
        <GuestProfileView user={user} posts={posts} users={users} />
      </div>
    )
  } else {
    // TH2 nếu  có token
    // đầu tiên lấy về id user từ token gửi lên API
    const resId = await fetch(`http://localhost:4000/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    })
    const data = await resId.json()
    console.log('User ID', data.id)
    if (data.id == id) {
      // trả về MyProfileView
      return (
        <div
          className="my-profile-container"
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <MyProfileView token={token} users={users} userId={id} />
        </div>
      )
    } else {
      // trả về FriendsProfile View
      // Lấy ra danh sách bài post dạng public và friend của params id
      const resPosts = await fetch(
        `http://localhost:4000/api/posts/public-friend/user/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          cache: 'no-store',
        }
      )

      if (!resPosts.ok) {
        return <div>User not found</div> // hoặc notFound()
      }
      const posts = await resPosts.json()
      return (
        <div
          className="guest-profile-container"
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <GuestProfileView user={user} posts={posts} users={users} />
        </div>
      )
    }
  }
}

export default ProfilePage
