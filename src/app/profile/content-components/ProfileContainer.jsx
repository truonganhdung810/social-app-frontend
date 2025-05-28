import CreateNewPost from './CreateNewPost'
import PostsList from './PostsList'
import PhotosGrid from './PhotosGrid'
import ListFriends from './ListFriends'
import React, { useState, useEffect, useRef } from 'react'
import './styles/profile-container.css'

export default function ProfileContainer() {
  const [posts, setPosts] = useState([])
  const token = localStorage.getItem('token')
  const userId = localStorage.getItem('id')
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
  return (
    <div className="profile-container-layout">
      <div className="profile-left-content">
        <PhotosGrid
          className="profile-photos-grid"
          images={listImages}
        ></PhotosGrid>
        <ListFriends className="profile-list-friends"></ListFriends>
      </div>
      <div className="profile-right-content">
        <CreateNewPost></CreateNewPost>
        <PostsList posts={posts}></PostsList>
      </div>
    </div>
  )
}
