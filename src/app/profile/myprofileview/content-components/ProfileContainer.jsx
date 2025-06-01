import CreateNewPost from './CreateNewPost'
import PostsList from './PostsList'
import PhotosGrid from './PhotosGrid'
import React, { useState, useEffect, useRef } from 'react'
import './styles/profile-container.css'
import GridListFriends from './GridListFriends'

export default function ProfileContainer({
  token,
  windowWidth,
  userName,
  userId,
  userAvaData,
  users,
}) {
  const [posts, setPosts] = useState([])
  const [listImages, setListImages] = useState([])

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch(
          `http://localhost:4000/api/posts/user/${userId}`,
          {
            method: 'GET',
            headers: {
              authorization: `Bearer ${token}`, // 👈 truyền token
              id: userId, // 👈 nếu server yêu cầu thêm
            },
          }
        )
        const data = await res.json()

        const images = data.posts
          .filter((post) => post.image && post.image.trim() !== '')
          .map((post) => post.image)
        setListImages(images)
        setPosts(data.posts)
      } catch (err) {
        console.error('Failed to fetch posts', err)
      }
    }

    fetchPosts()
  }, [userId])

  const handleDeletePost = async (postId) => {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this post? ' + 'id = ' + `${postId}`
    )
    if (!confirmDelete) return

    try {
      const response = await fetch(
        `http://localhost:4000/api/posts/${postId}`,
        {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${token}`, // 👈 truyền token
            id: userId,
          },
        }
      )

      if (!response.ok) {
        const data = await response.json()
        alert(data.message || 'Failed to delete post')
        return
      }

      // Cập nhật danh sách post sau khi xóa
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId))
    } catch (err) {
      console.error('Error deleting post:', err)
      alert('Server error')
    }
  }
  return (
    <div className="profile-container-layout">
      <div className="profile-left-content">
        <PhotosGrid
          className="profile-photos-grid"
          images={listImages}
        ></PhotosGrid>
        {/* <GridListFriends
          windowWidth={windowWidth}
          users={users}
        ></GridListFriends> */}
      </div>
      <div className="profile-right-content">
        <CreateNewPost token={token} setPosts={setPosts}></CreateNewPost>
        <PostsList
          posts={posts}
          userName={userName}
          userAvaData={userAvaData}
          handleDeletePost={handleDeletePost}
        ></PostsList>
      </div>
    </div>
  )
}
