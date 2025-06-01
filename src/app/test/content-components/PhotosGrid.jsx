import React from 'react'
import './styles/profile-photos-grid.css'

const PhotosGrid = ({ images }) => {
  const limitedImages = images.slice(0, 9)

  return (
    <div className="profile-photos-grid-container">
      <div className="profile-photos-grid-header">
        <h2 className="profile-photos-grid-title">Photos</h2>
        <a href="#" className="profile-photos-grid-link-all">
          See all photos
        </a>
      </div>

      <div className="profile-photos-grid-images">
        {limitedImages.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`photo-${index}`}
            className="profile-photos-grid-item"
          />
        ))}
      </div>
    </div>
  )
}

export default PhotosGrid
