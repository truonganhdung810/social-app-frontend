import { FaCamera } from 'react-icons/fa'
import './styles/avatar-container.css'
import PopupMenu from './PopupMenu'
import { useState, useRef, useEffect } from 'react'
import CropAvatar from './CropAvatar'
import ImageAvatar from './ImageAvatar'

const AvatarContainer = ({
  token,
  windowWidth,
  userName,
  userAvaData,
  setUserAvaData,
  isShowPopupCropAva,
  setIsShowPopupCropAva,
}) => {
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false)
  const [cropAvatarData, setCropAvatarData] = useState({})

  const buttonRef = useRef()
  const clickEditAvatar = () => {
    setIsShowPopupMenu(!isShowPopupMenu)
  }

  return (
    <div style={{ position: 'relative', pointerEvents: 'none' }}>
      {isShowPopupCropAva && (
        <CropAvatar
          token={token}
          isShowPopupCropAva={isShowPopupCropAva}
          setIsShowPopupCropAva={setIsShowPopupCropAva}
          cropAvaData={cropAvatarData}
          setUserAvaData={setUserAvaData}
          windowWidth={windowWidth}
        ></CropAvatar>
      )}
      <div className="avatar-container" style={{ width: `${windowWidth}px` }}>
        <div className="group-button">
          <ImageAvatar avatarData={userAvaData} dislaySize={180}></ImageAvatar>
          <button className="button-edit-avatar" ref={buttonRef}>
            <FaCamera className="camera" onClick={clickEditAvatar} />
          </button>
          {isShowPopupMenu && (
            <PopupMenu
              isOpen={isShowPopupMenu}
              setIsOpen={setIsShowPopupMenu}
              buttonRef={buttonRef}
              setIsShowPopupCropAva={setIsShowPopupCropAva}
              setCropAvatarData={setCropAvatarData}
            />
          )}
        </div>
        <div className="user-name">
          <h2>{userName}</h2>
        </div>
      </div>
    </div>
  )
}

export default AvatarContainer
