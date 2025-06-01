"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [avatarData, setAvatarData] = useState(null);
  const [coverData, setCoverData] = useState(null);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch("http://localhost:4000/api/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    setAvatarData(null);
    setCoverData(null);

    // Xoá localStorage nếu cần
    localStorage.clear();

    // Chuyển hướng về trang home
    router.push("/");
  };

  useEffect(() => {
    const id = localStorage.getItem("id");
    const name = localStorage.getItem("name");
    const avatar = localStorage.getItem("avatar");
    const cover_photo = localStorage.getItem("cover_photo");
    if (id && name) {
      setUser({ id, name });
      setAvatarData({
        avatar,
        offsetX: localStorage.getItem("ava_offsetX"),
        offsetY: localStorage.getItem("ava_offsetY"),
        cropWidth: localStorage.getItem("ava_width"),
      });
      setCoverData({
        cover_photo,
        offsetX: localStorage.getItem("cover_offsetX"),
        offsetY: localStorage.getItem("cover_offsetY"),
      });
    }
  }, [pathname]);

  return {
    user,
    avatarData,
    coverData,
    isLoggedIn: !!user,
    logout: () => {
      handleLogout();
    },
  };
}
