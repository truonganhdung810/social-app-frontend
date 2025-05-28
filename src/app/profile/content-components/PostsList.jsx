import React from 'react'
import PostItem from './PostItem'

const PostList = ({ posts, handleDeletePost }) => {
  return (
    <div className="w-full">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onDelete={handleDeletePost} />
      ))}
    </div>
  )
}

export default PostList
