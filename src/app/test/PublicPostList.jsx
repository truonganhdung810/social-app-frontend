import React from 'react'
import PublicPostItem from './PublicPostItem'

const PublicPostList = ({ posts }) => {
  return (
    <div className="w-full">
      {posts.map((post) => (
        <PublicPostItem key={post.id} post={post} />
      ))}
    </div>
  )
}

export default PublicPostList
