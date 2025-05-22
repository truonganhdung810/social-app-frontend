"use client";
import { useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { UserContext } from "@/context/UserContext";

export default function AuthGuard({ children }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const hasStoredUser = localStorage.getItem("id") !== null;
    console.log("Co user", hasStoredUser);
    if (!hasStoredUser) {
      router.push("/login");
    } else if (user) {
      // Nếu có user hoặc đang load từ localStorage → cho hiển thị
      setLoading(false);
    }
  }, [user]);

  if (loading) return <div>Loading...</div>;

  return children;
}
