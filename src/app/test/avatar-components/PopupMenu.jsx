// Menu được bật lên khi nhấn nút Edit Cover

import { GrGallery } from 'react-icons/gr'
import { BsUpload } from 'react-icons/bs'
import './styles/popup-menu.css'
import { useState, useRef, useEffect } from 'react'
import compressAvatar from './compressAvatar'

export default function PopupMenu({
  isOpen,
  setIsOpen,
  buttonRef,
  setIsShowPopupCropAva,
  setCropAvatarData,
}) {
  const fileInputRef = useRef(null)

  // handle các sự kiện click vào từng item của PopupMenu
  const onSelect = (select) => {
    console.log(select)
    if (select === 'upload') {
      fileInputRef.current.click()
    } else if (select === 'gallery') {
      console.log('Select', select)
    }
  }

  // Nhận file từ local
  const handleFileChange = async (event) => {
    const file = event.target.files[0]
    console.log('file', file)
    if (!file) return
    try {
      const newAvatar = await compressAvatar(file)
      console.log('New Aavatar Data', newAvatar)
      setCropAvatarData((prevData) => ({
        ...prevData, // Sao chép dữ liệu cũ
        file: newAvatar.file, // Cập nhật file mới
        src: newAvatar.src, // Cập nhật src mới
        width: newAvatar.width, // Cập nhật chiều rộng mới
        height: newAvatar.height, // Cập nhật chiều cao mới
        rOffsetX: newAvatar.rOffsetX, // Cập nhật offset X mới
        rOffsetY: newAvatar.rOffsetY, // Cập nhật offset Y mới
        cropWidth: newAvatar.cropWidth,
      }))
      setIsShowPopupCropAva(true)
      setIsOpen(false)
    } catch (error) {
      console.error('Lỗi nén ảnh:', error)
    }
  }

  // useEffect dùng để bắt sự kiện click ra ngoài Popup Menu thì tắt nó đi
  const componentRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
      ) {
        setIsOpen(false)
      }
    }

    // Gắn sự kiện click
    document.addEventListener('click', handleClickOutside)

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      document.removeEventListener('click', handleClickOutside)
    }
  }, [buttonRef, isOpen, setIsOpen])

  if (!isOpen) return null

  return (
    <div className="avatar-popup-menu" ref={componentRef}>
      <div className="popup-menu-item" onClick={() => onSelect('gallery')}>
        <GrGallery className="popup-menu-icon"></GrGallery>
        From Gallery
      </div>
      <div className="popup-menu-item" onClick={() => onSelect('upload')}>
        <BsUpload className="popup-menu-icon"></BsUpload>
        Upload Photo
        <input
          type="file"
          accept="image/*"
          ref={fileInputRef}
          onChange={handleFileChange}
          style={{ display: 'none' }} // ẩn input
        />
      </div>
    </div>
  )
}
