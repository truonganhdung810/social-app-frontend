import React from 'react'
import './styles/postitem.css'
import { FiDelete } from 'react-icons/fi'

const PostItem = ({ post, onDelete }) => {
  const { id, content, image, created_at, name, avatar } = post

  return (
    <div className="profile-post-item">
      <button
        onClick={() => onDelete(id)}
        className="post-item-delete-button"
        title="Delete"
      >
        <FiDelete />
      </button>

      <div className="post-item-header">
        <img src={avatar} alt="avatar" className="post-item-user-avatar" />
        <div>
          <div className="post-item-username">{name}</div>
          <div className="post-item-date">
            {new Date(created_at).toLocaleString()}
          </div>
        </div>
      </div>

      <p className="post-item-content">{content}</p>

      {image && <img src={image} alt="post" className="post-item-image" />}
    </div>
  )
}

export default PostItem
