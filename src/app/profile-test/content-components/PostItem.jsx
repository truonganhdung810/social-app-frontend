import React from 'react'
import './styles/postitem.css'
import { MdOutlinePublic } from 'react-icons/md'

import ImageAvatar from './ImageAvatar'

const PostItem = ({ post, userName, avaData }) => {
  const { id, content, image, created_at, visibility } = post
  return (
    <div className="guest-profile-post-item">
      <div className="guest-post-item-header">
        <div className="guest-post-item-user-avatar-container">
          <ImageAvatar
            avaData={avaData}
            dislaySize={40}
            borderRadius={50}
          ></ImageAvatar>
        </div>
        <div>
          <div className="guest-post-item-username">{userName}</div>
          <div style={{ display: 'flex' }}>
            <div className="guest-post-item-date">
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

      {image && (
        <img src={image} alt="post" className="guest-post-item-image" />
      )}
    </div>
  )
}

export default PostItem
