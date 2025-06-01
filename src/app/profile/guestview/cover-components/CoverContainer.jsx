// Component chứa toàn bộ các phần tử con của phần Hiển thị Cover Photo

'use client'
import React, { useState, useEffect, useRef } from 'react'
import CoverImage from './GuestCoverImage'
import PopupMenu from './PopupMenu'
import DragNewCoverImage from './DragNewCoverImage'

const CoverContainer = ({ windowWidth }) => {
  const src =
    localStorage.getItem('cover') === 'null'
      ? '/default_cover_size1200x400.png'
      : localStorage.getItem('cover')
  // Tách chuỗi từ phần '_size'
  const sizePart = src.split('_size')[1]
  const dimensions = sizePart.split('.')[0].split('x')

  // Lấy width và height
  const width = parseInt(dimensions[0], 10)
  const height = parseInt(dimensions[1], 10)

  const offsetX = localStorage.getItem('cover_offsetX')
  const offsetY = localStorage.getItem('cover_offsetY')
  const [coverData, setCoverData] = useState({
    src,
    width,
    height,
    offsetX,
    offsetY,
  })

  const [newCoverData, setNewCoverData] = useState({
    file: null,
    src: '',
    width: 0,
    height: 0,
    rOffsetX: 0,
    rOffsetY: 0,
  })

  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false)
  const btnEditCoverRef = useRef()
  const [isPreviewNewCover, setIsPreviewNewCover] = useState(false)

  const clickBtnEditCover = () => {
    setIsShowPopupMenu(!isShowPopupMenu)
  }

  return (
    <div
      className="main-container"
      style={{ width: `${windowWidth}px`, height: `${windowWidth / 3}px` }}
    >
      <div
        style={{
          position: 'relative',
          width: `${windowWidth}px`,
          height: `${windowWidth / 3}px`,
        }}
      >
        <div style={{ position: 'absolute' }}>
          <CoverImage
            className="cover"
            imageData={coverData}
            windowWidth={windowWidth}
          ></CoverImage>
        </div>
        {isPreviewNewCover && (
          <div style={{ position: 'absolute' }}>
            <DragNewCoverImage
              className="drag-new-cover"
              newCoverData={newCoverData}
              windowWidth={windowWidth}
              setSaveCoverData={setCoverData}
              setIsPreviewNewCover={setIsPreviewNewCover}
            />
          </div>
        )}
      </div>

      <div className="vitri-popup">
        {isShowPopupMenu && (
          <PopupMenu
            isOpen={isShowPopupMenu}
            setIsOpen={setIsShowPopupMenu}
            buttonRef={btnEditCoverRef}
            setNewCoverData={setNewCoverData}
            setIsPreviewNewCover={setIsPreviewNewCover}
          />
        )}
      </div>
    </div>
  )
}

export default CoverContainer
