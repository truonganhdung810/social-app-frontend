import { FaCamera } from 'react-icons/fa'
import './styles/avatar-container.css'
import PopupMenu from './PopupMenu'
import { useState, useRef, useEffect } from 'react'
import CropAvatar from './CropAvatar'

const AvatarContainer = ({ windowWidth, windowHeight }) => {
  const [isShowPopupCropAva, setIsShowPopupCropAva] = useState(false)
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false)
  const [newAvatarData, setNewAvatarData] = useState({
    src: '',
    width: 0,
    height: 0,
    rOffsetX: 0,
    rOffsetY: 0,
    cropWidth: 180,
  })
  const buttonRef = useRef()
  const clickEditAvatar = () => {
    setIsShowPopupMenu(!isShowPopupMenu)
  }

  return (
    <div style={{ position: 'relative', pointerEvents: 'none' }}>
      {isShowPopupCropAva && (
        <CropAvatar
          avaData={newAvatarData}
          windowWidth={windowWidth}
        ></CropAvatar>
      )}
      <div className="avatar-container" style={{ width: `${windowWidth}px` }}>
        <div className="group-button">
          <div className="img-container">
            <img
              className="avatar-img"
              src="https://i.pinimg.com/736x/2f/57/79/2f5779092e30a4b4288a083ec450202f.jpg"
              alt="Avatar"
            />
          </div>
          <button className="button-edit-avatar" ref={buttonRef}>
            <FaCamera className="camera" onClick={clickEditAvatar} />
          </button>
          {isShowPopupMenu && (
            <PopupMenu
              isOpen={isShowPopupMenu}
              setIsOpen={setIsShowPopupMenu}
              buttonRef={buttonRef}
              setIsShowPopupCropAva={setIsShowPopupCropAva}
              setNewAvatarData={setNewAvatarData}
            />
          )}
        </div>
        <div className="user-name">
          <h2>Trương Anh Dũng</h2>
        </div>
      </div>
    </div>
  )
}

export default AvatarContainer
