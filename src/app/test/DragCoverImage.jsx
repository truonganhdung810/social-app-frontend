'use client'
import React, { useState, useEffect, useRef } from 'react'

const DraggableCoverImage = ({ coverData }) => {
  const { src, width, height, offsetX, offsetY } = coverData

  // Khởi tạo state để lưu vị trí offset của ảnh
  const [dragging, setDragging] = useState(false)
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 })
  const [currentOffset, setCurrentOffset] = useState({ x: offsetX, y: offsetY })

  const imageRef = useRef(null) // Để tham chiếu đến ảnh

  // Lấy kích thước của component container
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // Lấy kích thước của component chứa ảnh
    const updateContainerSize = () => {
      if (imageRef.current) {
        const { width, height } =
          imageRef.current.parentElement.getBoundingClientRect()
        setContainerSize({ width, height })
      }
    }

    // Cập nhật kích thước khi component được render
    updateContainerSize()

    // Cập nhật kích thước khi cửa sổ thay đổi
    window.addEventListener('resize', updateContainerSize)

    return () => {
      window.removeEventListener('resize', updateContainerSize)
    }
  }, [])

  // Hàm bắt đầu kéo ảnh
  const handleMouseDown = (e) => {
    console.log('Mouse Down', e.clientX, e.clientY)
    setDragging(true)
    setDragStart({ x: e.clientX, y: e.clientY })
  }

  // Hàm khi kéo ảnh
  const handleMouseMove = (e) => {
    if (!dragging) return
    // console.log('Mouse Move', e.clientX, e.clientY)
    // const deltaX = e.clientX - dragStart.x
    // const deltaY = e.clientY - dragStart.y

    // const newOffsetX = Math.max(
    //   Math.min(currentOffset.x + deltaX, containerSize.width - width),
    //   0
    // )

    // const newOffsetY = Math.max(
    //   Math.min(currentOffset.y + deltaY, containerSize.height - height),
    //   0
    // )

    //setCurrentOffset({ x: newOffsetX, y: newOffsetY })
  }

  // Hàm kết thúc kéo ảnh
  const handleMouseUp = () => {
    console.log('Mouse Up')
    if (dragging) setDragging(false)
  }

  // Đảm bảo chỉ xử lý khi kéo ảnh trên ảnh
  const handleMouseLeave = () => {
    if (dragging) {
      setDragging(false)
    }
  }

  return (
    <div>
      <div
        ref={imageRef}
        style={{
          position: 'relative',
          width: '100%',
          height: '33.33vh',
          border: '1px solid #ccc',
          overflow: 'hidden',
          cursor: dragging ? 'grabbing' : 'grab', // Thêm thay đổi con trỏ khi đang kéo
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onMouseDown={handleMouseDown}
      >
        <img
          src={src}
          alt="Cover"
          style={{
            position: 'absolute',
            top: currentOffset.y,
            left: currentOffset.x,
            width: width,
            height: height,
            transition: dragging
              ? 'none'
              : 'top 0.2s ease-out, left 0.2s ease-out',
          }}
        />
      </div>
      <div>
        <p>Width: {width}px</p>
        <p>Height: {height}px</p>
        <p>
          Offset X: {Math.round((currentOffset.x / containerSize.width) * 100)}%
        </p>
        <p>
          Offset Y: {Math.round((currentOffset.y / containerSize.height) * 100)}
          %
        </p>
      </div>
    </div>
  )
}

export default DraggableCoverImage
