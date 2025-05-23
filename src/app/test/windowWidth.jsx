import React, { useState, useEffect } from 'react'

const WindowWidth = () => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth)

  // Hàm cập nhật giá trị windowWidth khi kích thước cửa sổ thay đổi
  const handleResize = () => {
    setWindowWidth(window.innerWidth)
  }

  useEffect(() => {
    // Gắn sự kiện resize khi component được render
    window.addEventListener('resize', handleResize)

    // Cleanup event listener khi component bị unmount
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <p>Chiều rộng cửa sổ hiện tại: {windowWidth}px</p>
    </div>
  )
}

export default WindowWidth
