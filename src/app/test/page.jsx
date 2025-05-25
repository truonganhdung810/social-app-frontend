'use client'
import React, { useState, useEffect, useRef } from 'react'
import CoverImage from './CoverImage'
import PopupMenu from './PopupMenu'
import DragNewCoverImage from './DragNewCoverImage'

const ProfilePage = () => {
  const src = localStorage.getItem('cover')

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
  const [windowWidth, setWindowWidth] = useState(0)
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false)
  const btnEditCoverRef = useRef()
  const [isPreviewNewCover, setIsPreviewNewCover] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      let w = newWidth < 1200 ? newWidth : 1200
      if (w < 350) w = 350
      setWindowWidth(w)
    }
    handleResize() // Lấy giá trị ban đầu
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const clickBtnEditCover = () => {
    console.log('Click button', isShowPopupMenu)
    setIsShowPopupMenu(!isShowPopupMenu)
  }

  return (
    <div className="main-container" style={{ width: `${windowWidth}px` }}>
      <div className="top-navigation">
        <h1>Top Navigation</h1>
      </div>
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

export default ProfilePage
