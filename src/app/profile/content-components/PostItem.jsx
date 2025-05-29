import React from 'react'
import './styles/postitem.css'
import { FiDelete } from 'react-icons/fi'
import { MdOutlinePublic } from 'react-icons/md'
import { FaUserFriends } from 'react-icons/fa'
import { RiGitRepositoryPrivateFill } from 'react-icons/ri'

import ImageAvatar from './ImageAvatar'

const PostItem = ({ post, userName, userAvaData, onDelete }) => {
  console.log('avatar nhận ở post item', userAvaData)
  const { id, content, image, created_at, visibility } = post
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
        <div className="post-item-user-avatar-container">
          <ImageAvatar userAvaData={userAvaData} dislaySize={40}></ImageAvatar>
        </div>
        <div>
          <div className="post-item-username">{userName}</div>
          <div style={{ display: 'flex' }}>
            <div className="post-item-date">
              {new Date(created_at).toLocaleString()}
            </div>
            {visibility == 'public' && (
              <MdOutlinePublic style={{ color: 'gray', scale: '0.8' }} />
            )}
            {visibility == 'friends' && (
              <FaUserFriends style={{ color: 'gray', scale: '0.8' }} />
            )}
            {visibility == 'private' && (
              <RiGitRepositoryPrivateFill
                style={{ color: 'gray', scale: '0.8' }}
              />
            )}
          </div>
        </div>
      </div>

      <p className="post-item-content">{content}</p>

      {image && <img src={image} alt="post" className="post-item-image" />}
    </div>
  )
}

export default PostItem
