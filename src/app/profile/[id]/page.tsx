"use client";
import { useRouter } from "next/navigation";
import * as React from "react";
import { useEffect } from "react";

function ProfilePage({ params }) {
  // asynchronous access of `params.id`.
  const { id } = React.use(params);
  const router = useRouter();
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Lấy token từ localStorage
        const token = localStorage.getItem("token");
        console.log("Token", token);

        if (token == null) {
          router.push("/login");
          return;
        }

        const response = await fetch(`http://localhost:4000/api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        if (response.ok) {
          console.log("Danh sach user", data);
        } else {
          alert(data.message || "Lỗi khi lấy thông tin người dùng!");
        }
      } catch (error) {
        console.error(error);
        alert("Không thể kết nối tới server!");
      }
    };

    fetchUserData();
  }, []);

  return <p>ID: {id}</p>;
}

export default ProfilePage;
