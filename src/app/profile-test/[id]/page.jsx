import { cookies } from "next/headers";
import GuestProfileView from "../guestview/GuestProfileView";
import { cache } from "react";

async function ProfilePage({ params }) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { paramsId } = params;

  let currentUser = null;
  let viewMode = "guest"; // default

  // danh sách users được dùng chung ở cả 3 viewmode
  const resUsers = await fetch("http://localhost:4000/api/users/public", {
    cache: "no-store",
  });
  const users = await resUsers.json();

  // Lấy ra thông tin của user id, dùng chung ở cả 3 viewmode
  const resProfileId = await fetch(
    `http://localhost:4000/api/users/public/${id}`,
    {
      cache: "no-store",
    }
  );

  if (!resProfileId.ok) {
    return <div>User not found</div>; // hoặc notFound()
  }
  const { user } = await resProfileId.json();

  // Nếu có token, hãy gọi API kiểm tra token
  // Nếu Token hợp lệ, kiểm tra xem id của token với id params có giống nhau hay không, nếu giống -> ProfileMode, nếu lệch -> FriendMode

  // TH1 nếu không có token -> GuestProfileView
  if (!token) {
    const resPosts = await fetch(
      `http://localhost:4000/api/posts/public/user/${id}`,
      { cache: "no-store" }
    );

    if (!resPosts.ok) {
      return <div>User not found</div>; // hoặc notFound()
    }
    const posts = await resPosts.json();

    return (
      <div
        className="guest-profile-container"
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <GuestProfileView user={user} posts={posts} users={users} />
      </div>
    );
  } else {
    // đầu tiên lấy về id user từ token gửi lên API
    const resId = await fetch(`http://localhost:4000/api/auth/me`, {
      cache: "no-store",
    });
    const id = resId.id;
    if (paramsId == id) {
      // trả về MyProfileView
    } else {
      // trả về FriendsProfile View
      // Lấy ra danh sách bài post dạng public và friend của params id
    }
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
}

export default ProfilePage;
