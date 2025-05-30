import React from 'react'
import PostItem from './PostItem'

const PostList = ({ posts, userName, userAvaData, handleDeletePost }) => {
  return (
    <div className="w-full">
      {posts.map((post) => (
        <PostItem
          key={post.id}
          post={post}
          userName={userName}
          userAvaData={userAvaData}
          onDelete={handleDeletePost}
        />
      ))}
    </div>
  )
}

export default PostList
