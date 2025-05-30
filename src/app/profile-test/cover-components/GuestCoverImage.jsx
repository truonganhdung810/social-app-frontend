// Đây là Component để hiển thị Cover Photo của user
// Đầu vào được truyền vào props là 1 Object có chứa thông tin của Ảnh Cover,
// kèm thêm 1 useState cập nhật thông tin chiều rộng Window
import React, { useState, useEffect } from 'react'
import './styles/cover-image.css'

const GuestCoverImage = ({ coverData, windowWidth }) => {
  const { src, width, height, offsetX, offsetY } = coverData
  const [scaleRatio, setScaleRatio] = useState(1)

  useEffect(() => {
    if (width && windowWidth) {
      const ratio = Math.max(windowWidth / width, windowWidth / 3 / height)
      setScaleRatio(ratio)
    }
  }, [width, windowWidth])

  return (
    <div
      className="cover-image"
      style={{
        position: 'relative',
        width: `${windowWidth}px`,
        height: `${windowWidth / 3}px`,
        overflow: 'hidden',
      }}
    >
      <img
        src={src}
        style={{
          width: `${width * scaleRatio}px`,
          height: `${height * scaleRatio}px`,
          maxWidth: 'none',
          transform: `translate(${offsetX * scaleRatio}px, ${
            offsetY * scaleRatio
          }px)`,
          position: 'absolute',
          objectFit: 'cover',
        }}
      ></img>
    </div>
  )
}

export default GuestCoverImage
