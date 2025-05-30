import { cookies } from "next/headers";
import GuestProfileView from "../guestview/GuestProfileView";

async function ProfilePage({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { id } = params;

  let currentUser = null;
  let viewMode = "guest"; // default

  // Nếu có token, hãy gọi API kiểm tra token
  // Nếu Token hợp lệ, kiểm tra xem id của token với id params có giống nhau hay không, nếu giống -> ProfileMode, nếu lệch -> FriendMode
  if (token) {
    // const res = await fetch('http://localhost:4000/api/auth/verify', {
    //   headers: {
    //     Cookie: `token=${token}`,
    //   },
    //   cache: 'no-store',
    // })
    // if (res.ok) {
    //   currentUser = await res.json()
    //   viewMode = currentUser.id.toString() === viewedUserId ? 'owner' : 'friend'
    // }
  }

  // ========== OWNER ==========
  // Lấy dữ liệu cho Owner rồi hiển thị MyProfileView
  if (viewMode === "owner") {
    // const res = await fetch(
    //   `http://localhost:4000/api/users/${viewedUserId}/private`,
    //   {
    //     headers: { Cookie: `token=${token}` },
    //     cache: 'no-store',
    //   }
    // )
    // if (!res.ok) return notFound()
    // const { user, posts } = await res.json()
    // return <MyProfileView user={user} posts={posts} />
  }

  // ========== FRIEND ==========
  // Lấy dữ liệu cho Friend rồi hiển thị FriendProfileView
  if (viewMode === "friend") {
    // const res = await fetch(
    //   `http://localhost:4000/api/users/${viewedUserId}/friend`,
    //   {
    //     headers: { Cookie: `token=${token}` },
    //     cache: 'no-store',
    //   }
    // )
    // if (!res.ok) return notFound()
    // const { user, posts } = await res.json()
    // return <FriendProfileView user={user} posts={posts} />
  }

  // ========== GUEST ==========
  // Lấy dữ liệu cho Public rồi hiển thị GuestProfileView
  const res = await fetch(`http://localhost:4000/api/users/public/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>User not found</div>; // hoặc notFound()
  }

  const { user } = await res.json();

  const resData = await fetch(
    `http://localhost:4000/api/posts/public/user/${id}`,
    { cache: "no-store" }
  );

  if (!resData.ok) {
    return <div>User not found</div>; // hoặc notFound()
  }

  const posts = await resData.json();

  const resUsers = await fetch("http://localhost:4000/api/users/public", {
    cache: "no-store",
  });
  const users = await resUsers.json();

  return (
    <div
      className="guest-profile-container"
      style={{ width: "100%", display: "flex", justifyContent: "center" }}
    >
      <GuestProfileView user={user} posts={posts} users={users} />
    </div>
  );
}

export default ProfilePage;
