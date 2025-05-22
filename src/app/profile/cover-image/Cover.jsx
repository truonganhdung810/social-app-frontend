"use client";

import { UserContext } from "@/context/UserContext";
import { useContext } from "react";

const Cover = () => {
  const { user } = useContext(UserContext); // Lấy dữ liệu người dùng từ context
  if (user) {
    console.log("data user", user);
    //let originImg = user.cover; // url cover được lưu trong localStorage
    //let defaultOffsetY = user.cover_offsetY;
    //let defaultOffsetX = user.cover_offsetX;
    // console.log("Url image", originImg);
    console.log("Cover_offsetX", user.cover_offsetX);
  }
  return <div></div>;
};

export default Cover;
