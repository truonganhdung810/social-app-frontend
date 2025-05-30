import React, { useRef, useState, useEffect } from 'react'
import { PiResizeBold } from 'react-icons/pi'
import './styles/crop-avatar.css'
import { RiDragMove2Fill } from 'react-icons/ri'

const CropAvatar = ({
  isShowPopupCropAva,
  setIsShowPopupCropAva,
  cropAvaData,
  setUserAvaData,
  windowWidth,
}) => {
  if (!cropAvaData || cropAvaData.file === null) return null
  if (!isShowPopupCropAva) return null
  const { file, src, width, height, rOffsetX, rOffsetY, cropWidth } =
    cropAvaData

  const isResize = useRef(false)
  const isDragging = useRef(false)

  const minCropWidth = 180

  let popupWidth = (4 * windowWidth) / 5
  let popupHeight = (4 * popupWidth) / 5
  if (popupHeight < 600) popupHeight = 600

  let scaleX = popupWidth / width
  let scaleY = popupHeight / height
  const scaleRatio = useRef(0)
  scaleRatio.current = Math.min(scaleX, scaleY)

  const imgWidth = useRef(0)
  const imgHeight = useRef(0)
  imgWidth.current = scaleRatio.current * width
  imgHeight.current = scaleRatio.current * height

  const cropW = useRef(0)
  cropW.current = Math.min(imgWidth.current, imgHeight.current)

  const [offsetX, setOffsetX] = useState(rOffsetX * scaleRatio.current)
  const [offsetY, setOffsetY] = useState(rOffsetY * scaleRatio.current)

  const [nowCropWidth, setNowCropWidth] = useState(cropW.current)
  const startPos = useRef({ x: 0, y: 0 })

  const handleResizeMouseDown = (e) => {
    e.preventDefault()
    e.stopPropagation() // không cho lan lên crop-box
    isResize.current = true
    isDragging.current = false

    startPos.current = { x: e.clientX, y: e.clientY }

    // Lắng nghe khi kéo chuột và thả chuột
    window.addEventListener('mousemove', handleResizeMouseMove)
    window.addEventListener('mouseup', handleResizeMouseUp)
  }

  const handleResizeMouseMove = (e) => {
    e.stopPropagation() // không cho lan lên crop-box
    if (!isResize.current) return

    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    const delta = Math.min(Math.abs(dx), Math.abs(dy)) // Đảm bảo hình vuông

    const maxSize = Math.min(
      imgWidth.current - offsetX,
      imgHeight.current - offsetY
    )
    const newSize =
      dx < 0 || dy < 0
        ? Math.max(nowCropWidth - delta, minCropWidth)
        : Math.min(nowCropWidth + delta, maxSize)
    setNowCropWidth(newSize)
  }

  const handleDragMouseDown = (e) => {
    e.preventDefault()
    isResize.current = false
    isDragging.current = true

    startPos.current = { x: e.clientX, y: e.clientY }

    window.addEventListener('mousemove', handleDragMouseMove)
    window.addEventListener('mouseup', handleDragMouseUp)
  }

  const handleDragMouseMove = (e) => {
    // Nếu không phải đang resize thì bắt đầu drag
    if (!isDragging.current) return
    const dx = e.clientX - startPos.current.x
    const dy = e.clientY - startPos.current.y
    startPos.current = { x: e.clientX, y: e.clientY }

    setOffsetX((prev) => {
      let newOffsetX = prev + dx
      const minOffsetX = 0
      const maxOffsetX = imgWidth.current - nowCropWidth
      if (newOffsetX < minOffsetX) newOffsetX = minOffsetX
      else if (newOffsetX > maxOffsetX) newOffsetX = maxOffsetX
      return newOffsetX
    })

    setOffsetY((prev) => {
      let newOffsetY = prev + dy
      const minOffsetY = 0
      const maxOffsetY = imgHeight.current - nowCropWidth
      if (newOffsetY < minOffsetY) newOffsetY = minOffsetY
      else if (newOffsetY > maxOffsetY) newOffsetY = maxOffsetY
      return newOffsetY
    })
  }

  const handleResizeMouseUp = () => {
    window.removeEventListener('mousemove', handleResizeMouseMove)
    window.removeEventListener('mouseup', handleResizeMouseUp)
    isResize.current = false
    isDragging.current = false
  }

  const handleDragMouseUp = () => {
    window.removeEventListener('mousemove', handleDragMouseMove)
    window.removeEventListener('mouseup', handleDragMouseUp)
    isResize.current = false
    isDragging.current = false
  }

  // upload avatar lên server
  async function uploadFile() {
    const token = localStorage.getItem('token') // Lấy token từ localStorage hoặc cookie
    const userId = localStorage.getItem('id') // id của người dùng từ localStorage
    const name = localStorage.getItem('name')
    const formData = new FormData()
    formData.append('avatar-image', file)

    const realOffsetX = offsetX / scaleRatio.current
    const realOffsetY = offsetY / scaleRatio.current
    const cropWidth = nowCropWidth / scaleRatio.current

    const response = await fetch('http://localhost:4000/api/upload/avatar', {
      method: 'POST',
      headers: {
        authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        id: userId,
        name: encodeURIComponent(name),
        offsetX: realOffsetX,
        offsetY: realOffsetY,
        cropWidth: cropWidth,
      },
      body: formData, // Gửi FormData chứa ảnh
    })

    const res = await response.json()
    if (res.message == 'OK') {
      const fileName = res.fileUrl

      // Tách chuỗi từ phần '_size'
      const sizePart = fileName.split('_size')[1]
      const dimensions = sizePart.split('.')[0].split('x')

      // Lấy width và height
      const width = parseInt(dimensions[0], 10)
      const height = parseInt(dimensions[1], 10)

      localStorage.setItem('avatar', res.fileUrl)
      localStorage.setItem('ava_offsetX', realOffsetX)
      localStorage.setItem('ava_offsetY', realOffsetY)
      localStorage.setItem('ava_width', cropWidth)

      const saveData = {
        src: res.fileUrl,
        width,
        height,
        rOffsetX: realOffsetX,
        rOffsetY: realOffsetY,
        cropWidth,
      }
      setUserAvaData(saveData)
      setIsShowPopupCropAva(false)
    }
  }

  const cancelCrop = () => {
    setIsShowPopupCropAva(false)
  }
  const saveCrop = () => {
    uploadFile()
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
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        className="crop-avatar-confirm-change"
        style={{
          position: 'absolute',
          display: 'flex',
          width: `${imgWidth.current}px`,
          minHeight: '30px',
          zIndex: '10000',
          justifyContent: 'space-between',
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
          alignItems: 'center' /* nếu muốn căn giữa theo chiều dọc */,
          paddingTop: '5px',
          paddingBottom: '5px',
        }}
      >
        <div className="crop-text-group">
          <RiDragMove2Fill
            className="crop-icon"
            style={{
              color: 'white',
              marginLeft: '20px',
              transform: 'scale(1.5)',
            }}
          />
          <span
            className="crop-text"
            style={{ color: 'white', marginLeft: '5px' }}
          >
            "Click and drag to crop your avatar"
          </span>
        </div>
        <div className="crop-button-group">
          <button
            className="crop-btn-cancel"
            style={{
              pointerEvents: 'auto',
            }}
            onClick={cancelCrop}
          >
            Cancel
          </button>
          <button
            className="crop-btn-save"
            style={{
              pointerEvents: 'auto',
            }}
            onClick={saveCrop}
          >
            Save
          </button>
        </div>
      </div>
      <div
        className="crop-img-container"
        style={{
          width: `${imgWidth.current}px`,
          height: `${imgHeight.current}px`,
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
            width: `${imgWidth.current}px`,
            height: `${imgHeight.current}px`,
            objectFit: 'contain',
            borderWidth: '0px',
            borderColor: 'black',
            pointerEvents: 'auto',
          }}
        />
        <div
          className="crop-box"
          style={{
            position: 'absolute',
            left: `${offsetX}px`,
            top: `${offsetY}px`,
            width: `${nowCropWidth}px`,
            height: `${nowCropWidth}px`,
            border: '1px solid white',
            boxShadow: '0 0 0 9999px rgba(0, 0, 0, 0.5)',
            cursor: 'move',
            pointerEvents: 'auto',
          }}
          onMouseDown={handleDragMouseDown}
          onMouseMove={handleDragMouseMove}
          onMouseUp={handleDragMouseUp}
        >
          <PiResizeBold
            style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: `${cropW.current / 30}px`,
              height: `${cropW.current / 30}px`,
              background: 'transparent',
              color: 'white',
              cursor: 'se-resize',
              transform: 'scaleX(-1.5) scaleY(1.5)',
              pointerEvents: 'auto', // cho phép click được dù cha đang pointerEvents: none
            }}
            onMouseDown={handleResizeMouseDown}
            onMouseMove={handleResizeMouseMove}
            onMouseUp={handleResizeMouseUp}
            // dùng riêng để resize
          ></PiResizeBold>
        </div>
      </div>
    </div>
  )
}

export default CropAvatar
