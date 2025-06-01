// Component chứa toàn bộ các phần tử con của phần Hiển thị Cover Photo

'use client'
import React, { useState, useEffect, useRef } from 'react'
import CoverImage from './CoverImage'
import PopupMenu from './PopupMenu'
import DragNewCoverImage from './DragNewCoverImage'

const CoverContainer = ({ token, windowWidth, coverData, setCoverData }) => {
  console.log('Cover Data', coverData)
  console.log('WindowWidth', windowWidth)
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
            setCoverData={setCoverData}
            windowWidth={windowWidth}
            btnEditCoverRef={btnEditCoverRef}
            clickBtnEditCover={clickBtnEditCover}
          ></CoverImage>
        </div>
        {isPreviewNewCover && (
          <div style={{ position: 'absolute' }}>
            <DragNewCoverImage
              token={token}
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
