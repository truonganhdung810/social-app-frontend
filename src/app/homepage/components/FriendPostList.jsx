import React from "react";
import FriendPostItem from "./FriendPostItem";

const FriendPostList = ({ myPosts }) => {
  return (
    <div className="w-full">
      {myPosts.map((post) => (
        <FriendPostItem key={post.id} post={post} />
      ))}
    </div>
  );
};

export default FriendPostList;
