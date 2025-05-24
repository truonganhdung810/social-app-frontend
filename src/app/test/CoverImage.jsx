// Đây là Component để hiển thị Cover Photo của user
// Đầu vào được truyền vào props là 1 Object có chứa thông tin của Ảnh Cover, kèm thêm 1 useState cập nhật thông tin chiều rộng Window
import React, { useState } from 'react'
const CoverImage = (imgSrc, width, height, offsetX, offsetY, windowWidth) => {
  const [offX, setOffX] = useState(offsetX)
  const [offY, setOffY] = useState(offsetY)

  if (offsetX == 0) {
    setOffY(offY * (width / windowWidth))
  } else if (offsetY == 0) {
    setOffX(offX * (height / (windowWidth / 3)))
  }
  console.log(windowWidth)
  console.log(imgSrc, width, height, offsetX, offsetY)
  return (
    <img
      src="http://localhost:4000/uploads/images/1747905600514.jpg"
      style={{
        width: '100%',
        top: `${-0}px`,
        left: `${-0}px`,
        position: 'absolute',
        objectFit: 'cover',
      }}
    ></img>
  )
}

export default CoverImage
