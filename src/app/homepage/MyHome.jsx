"use client";

import { useEffect, useState } from "react";
import FriendPostList from "./components/FriendPostList";
import HomeCreateNewPost from "./components/HomeCreateNewPost";
import UsersList from "./components/UsersList";
import "./styles/home.css";

const MyHome = ({ token, posts, users }) => {
  const [myPosts, setMyPosts] = useState([]);
  useEffect(() => {
    setMyPosts(posts);
  }, [posts]);

  const [userAvaData, setUserAvaData] = useState({
    src: "/default-avatar_size200x200.jpg",
    width: 200,
    height: 200,
    rOffsetX: 0,
    rOffsetY: 0,
    cropWidth: 200,
  });
  const [userName, setUserName] = useState("");
  const [coverData, setCoverData] = useState({
    src: "/default_cover_size1200x400.png",
    width: 1200,
    height: 400,
    offsetX: 0,
    offsetY: 0,
  });

  // User Effect lấy ra các thông số của Avatar và Cover
  useEffect(() => {
    // Thông số avatar
    let ava_src = localStorage.getItem("avatar");
    let ava_cropWidth = localStorage.getItem("ava_width");

    if (ava_src === "null" || ava_src === null) {
      ava_src = "/default-avatar_size200x200.jpg";
      ava_cropWidth = 200;
    }

    // Tách phần size
    let ava_width = 200;
    let ava_height = 200;
    const ava_sizePart = ava_src.split("_size")[1];
    if (ava_sizePart) {
      const ava_dimensions = ava_sizePart.split(".")[0].split("x");
      ava_width = parseInt(ava_dimensions[0], 10);
      ava_height = parseInt(ava_dimensions[1], 10);
    }

    const ava_rOffsetX = Number(localStorage.getItem("ava_offsetX")) || 0;
    const ava_rOffsetY = Number(localStorage.getItem("ava_offsetY")) || 0;

    setUserAvaData({
      src: ava_src,
      width: ava_width,
      height: ava_height,
      rOffsetX: ava_rOffsetX,
      rOffsetY: ava_rOffsetY,
      cropWidth: Number(ava_cropWidth) || 200,
    });

    // UserName
    setUserName(localStorage.getItem("name") || "");

    // Thông số cho cover
    let cover_src = localStorage.getItem("cover")
     if (cover_src === "null" || cover_src === null) {
      cover_src = "/default-cover_size200x200.jpg";
     
    }
    const cover_sizePart = cover_src.split("_size")[1];
    const cover_dimensions = cover_sizePart.split(".")[0].split("x");

    // Lấy width và height
    const cover_width = parseInt(cover_dimensions[0], 10);
    const cover_height = parseInt(cover_dimensions[1], 10);

    const cover_offsetX = localStorage.getItem("cover_offsetX");
    const cover_offsetY = localStorage.getItem("cover_offsetY");

    setCoverData({
      src: cover_src,
      width: cover_width,
      height: cover_height,
      offsetX: cover_offsetX,
      offsetY: cover_offsetY,
    });
  }, []);

  console.log("danh sach post", posts);

  return (
    <div className="public-home-container-layout">
      <div className="public-home-left-content">
        <HomeCreateNewPost
          token={token}
          setPosts={setMyPosts}
          userAvaData={userAvaData}
          userName={userName}
        ></HomeCreateNewPost>
        <FriendPostList myPosts={myPosts}></FriendPostList>
      </div>
      <div className="public-home-right-content">
        <UsersList className="profile-list-friends" users={users}></UsersList>
      </div>
    </div>
  );
};
export default MyHome;
