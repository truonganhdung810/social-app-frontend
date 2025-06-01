// CoverAvatarSection.jsx
// Đây là section chứa Cover và Avatar của Profile
// Vì phần này bắt buộc sử dụng Window Width để hiển thị đẹp nên cần phải để CSR
"use client";

import { useEffect, useState } from "react";
import GuestCoverImage from "./cover-components/GuestCoverImage";
import GuestAvatarContainer from "./avatar-components/GuestAvatarContainer";

export default function CoverAvatarSection({ avaData, coverData, userName }) {
  const [windowWidth, setWindowWidth] = useState(1200);
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      let w = newWidth < 1200 ? newWidth : 1200;
      if (w < 350) w = 350;
      setWindowWidth((prevWidth) => {
        if (prevWidth !== w) {
          return w;
        }
        return prevWidth; // không cập nhật nếu không thay đổi
      });
    };
    handleResize(); // Lấy giá trị ban đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="cover-avatar-container-section">
      <GuestCoverImage coverData={coverData} windowWidth={windowWidth} />
      <GuestAvatarContainer
        avaData={avaData}
        windowWidth={windowWidth}
        userName={userName}
      />
    </div>
  );
}
