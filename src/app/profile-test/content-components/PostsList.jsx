import React from "react";
import PostItem from "./PostItem";

const PostList = ({ posts, userName, avaData }) => {
  return (
    <div className="w-full">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          userName={userName}
          avaData={avaData}
        />
      ))}
    </div>
  );
};

export default PostList;
