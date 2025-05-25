// src/pages/ProfilePage.js
"use client";
import CoverContainer from "../cover-components/CoverContainer";
import AvatarContainer from "../avatar-components/AvatarContainer";
import React, { useState, useEffect, useRef } from "react";

const ProfileLayout = () => {
  const [windowWidth, setWindowWidth] = useState(0);
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      let w = newWidth < 1200 ? newWidth : 1200;
      if (w < 350) w = 350;
      setWindowWidth(w);
    };
    handleResize(); // Lấy giá trị ban đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return (
    <div>
      <CoverContainer windowWidth={windowWidth} />
      <AvatarContainer windowWidth={windowWidth}></AvatarContainer>
    </div>
  );
};

export default ProfileLayout;
