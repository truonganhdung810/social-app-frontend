import { cookies } from "next/headers";
import PublicHome from "./homepage/PublicHome";
import MyHome from "./homepage/MyHome";

export default async function HomePage() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;
  console.log("token",token)

  const res = await fetch("http://localhost:4000/api/users/public", {
    cache: "no-store",
  });
  const users = await res.json();

  let postData = [];
  try {
    if (!token) {
      // Nếu ko có token trong cookie, lấy toàn bộ post dạng public hiển thị ra
      const res = await fetch("http://localhost:4000/api/posts/public", {
        cache: "no-store",
      });
      postData = await res.json();
      return <PublicHome posts={postData} users={users}></PublicHome>;
    } else {
      // Nếu có token trong cookie, đang đăng nhập, lấy toàn bộ post dạng public và friend hiển thị ra
      const res = await fetch("http://localhost:4000/api/posts/public-friend", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      });
      postData = await res.json();
      return <MyHome token={token} posts={postData} users={users}></MyHome>;
    }
  } catch (err) {
    console.error("Failed to fetch posts", err);
  }
  console.log("danh sach user", users);
}
