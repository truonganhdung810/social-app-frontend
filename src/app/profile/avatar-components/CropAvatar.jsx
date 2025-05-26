import React, { useState } from 'react'

const CropAvatar = ({
  isShowPopupCropAva,
  setIsShowPopupCropAva,
  avaData,
  windowWidth,
}) => {
  if (!avaData || avaData.file === null) return null
  const { file, src, width, height, rOffsetX, rOffsetY, cropWidth } = avaData
  const [image, setImage] = useState(null)
  const [showPopup, setShowPopup] = useState(false)

  const [isReSize, setIsReSize] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [nowCropWidth, setNowCropWidth] = useState(180)
  const [offsetX, setOffsetX] = useState(0)
  const [offsetY, setOffsetY] = useState(0)

  const minCropWidth = 180

  let popupWidth = (4 * windowWidth) / 5
  let popupHeight = (4 * popupWidth) / 5
  if (popupHeight < 600) popupHeight = 600

  let scaleX = popupWidth / width
  let scaleY = popupHeight / height
  let scaleRatio = Math.min(scaleX, scaleY)

  let imgWidth = scaleRatio * width
  let imgHeight = scaleRatio * height

  let cropW = Math.min(imgWidth, imgHeight)
  // setOffsetX((popupWidth - cropW) / 2)
  // setOffsetY((popupHeight - cropW) / 2)
  //setNowCropWidth(cropW)

  const handleResizeMouseDown = (e) => {
    e.stopPropagation() // ⛔ không cho lan lên crop-box
    setIsReSize(true)
    setIsDragging(false)
    console.log('Click button Resize')
  }

  const handleResizeMouseMove = (e) => {
    e.stopPropagation() // ⛔ không cho lan lên crop-box
  }

  const handleDragMouseDown = (e) => {
    // Nếu không phải đang resize thì bắt đầu drag
    setIsReSize(false)
    setIsDragging(true)
    console.log('Click button Drag')
  }

  const handleDragMouseMove = (e) => {
    // Nếu không phải đang resize thì bắt đầu drag
  }

  const handleMouseUp = () => {
    setIsReSize(false)
    setIsDragging(false)
  }

  return (
    <div
      className="crop-avatar-container"
      style={{
        top: `${windowWidth / 10}px`,
        left: '50%' /* Đặt phần tử ở giữa theo chiều ngang */,
        transform:
          'translateX(-50%)' /* Dịch chuyển về phía trái để căn giữa */,
        zIndex: '100',
        position: 'fixed',
        backgroundColor: 'white',
        boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.3)',
      }}
    >
      <div>
        <span>Crop Avatar</span>
        <button>Save</button>
        <button>Cancel</button>
      </div>
      <div
        className="crop-img-container"
        style={{
          width: `${popupWidth}px`,
          height: `${popupHeight}px`,
          padding: '0px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: '#E2E5E9',
          overflow: 'hidden',
          position: 'relative',
        }}
      >
        <img
          src={src}
          alt="Selected"
          style={{
            width: `${imgWidth}px`,
            height: `${imgHeight}px`,
            objectFit: 'contain',
            borderWidth: '0px',
            borderColor: 'black',
            pointerEvents: 'none',
          }}
        />
        <div
          class="crop-box"
          style={{
            position: 'absolute',
            left: `${(popupWidth - cropW) / 2}px`,
            top: `${(popupHeight - cropW) / 2}px`,
            width: `${cropW}px`,
            height: `${cropW}px`,
            border: '1px solid #fff',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            cursor: 'move',
            pointerEvents: 'auto',
          }}
          onMouseDown={handleDragMouseDown}
          onMouseMove={handleDragMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <button
            style={{
              position: 'absolute',
              bottom: '0',
              right: '0',
              width: '24px',
              height: '24px',
              background: 'transparent',
              border: 'none',
              cursor: 'se-resize',
              pointerEvents: 'auto', // cho phép click được dù cha đang pointerEvents: none
            }}
            onMouseDown={handleResizeMouseDown}
            onMouseMove={handleResizeMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            // dùng riêng để resize
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#fff"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="17" y1="17" x2="22" y2="22" />
              <line x1="15" y1="21" x2="21" y2="21" />
              <line x1="21" y1="15" x2="21" y2="21" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default CropAvatar
