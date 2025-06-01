import React from "react";
import "../styles/postitem.css";
import ImageAvatar from "./ImageAvatar";
import { MdOutlinePublic } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { RiGitRepositoryPrivateFill } from "react-icons/ri";
import Link from "next/link";

const PublicPostItem = ({ post }) => {
  const { id, content, image, created_at, visibility } = post;
  return (
    <div className="profile-post-item">
      <div className="post-item-header">
        <Link
          href={`/profile/${post.user.id}`}
          className="post-item-user-avatar-container"
        >
          <ImageAvatar userData={post.user} dislaySize={40}></ImageAvatar>
        </Link>
        <div>
          <Link
            href={`/profile/${post.user.id}`}
            className="post-item-username"
          >
            {post.user.name}
          </Link>
          <div style={{ display: "flex" }}>
            <div className="post-item-date">
              {new Date(created_at).toLocaleString()}
            </div>
            {visibility == "public" && (
              <MdOutlinePublic style={{ color: "gray", scale: "0.8" }} />
            )}
            {visibility == "friends" && (
              <FaUserFriends style={{ color: "gray", scale: "0.8" }} />
            )}
            {visibility == "private" && (
              <RiGitRepositoryPrivateFill
                style={{ color: "gray", scale: "0.8" }}
              />
            )}
          </div>
        </div>
      </div>

      <p className="post-item-content">{content}</p>

      {image && <img src={image} alt="post" className="post-item-image" />}
    </div>
  );
};

export default PublicPostItem;
