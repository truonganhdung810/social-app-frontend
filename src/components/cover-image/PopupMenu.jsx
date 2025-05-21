import { GrGallery } from 'react-icons/gr'
import { BsUpload } from 'react-icons/bs'
import '@/components/cover-image/popup-menu.css'
import { useState, useRef, useEffect } from 'react'
import compressImage from '@/lib/compressImage'

export default function PopupMenu({
  isOpen,
  setIsOpen,
  buttonRef,
  setCoverUrl,
  fileImage,
  setFileImage,
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
    console.log(event)
    const file = event.target.files[0]
    if (file) {
      if (file && file.type.startsWith('image/')) {
        const compressedImage = await compressImage(file)
        setFileImage(compressedImage)
        const imageUrl = URL.createObjectURL(compressedImage)
        console.log(imageUrl)
        setCoverUrl(imageUrl)
        setIsOpen(false)
      }
    }
  }

  // useEffect dùng để bắt sự kiện click ra ngoài Popup Menu thì tắt nó đi
  const componentRef = useRef(null)
  useEffect(() => {
    console.log('use Effect: ' + isOpen)
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
    <div className="popup-menu" ref={componentRef}>
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
