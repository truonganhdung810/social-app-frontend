import { FaCamera } from "react-icons/fa";
import "./styles/avatar-container.css";
import PopupMenu from "./PopupMenu";
import { useState, useRef, useEffect } from "react";
import CropAvatar from "./TestCrop";
import ImageAvatar from "./ImageAvatar";

const AvatarContainer = ({
  windowWidth,
  isShowPopupCropAva,
  setIsShowPopupCropAva,
}) => {
  let src = localStorage.getItem("avatar");
  let cropWidth = localStorage.getItem("ava_width");
  if (src === "null") {
    src = "/default-avatar_size200x200.jpg";
    cropWidth = 200;
  }
  // Tách chuỗi từ phần '_size'
  const sizePart = src.split("_size")[1];
  const dimensions = sizePart.split(".")[0].split("x");

  // Lấy width và height
  const width = parseInt(dimensions[0], 10);
  const height = parseInt(dimensions[1], 10);

  const rOffsetX = localStorage.getItem("ava_offsetX");
  const rOffsetY = localStorage.getItem("ava_offsetY");
  const userName = localStorage.getItem("name");

  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false);
  const [userAvaData, setUserAvaData] = useState({
    src,
    width,
    height,
    rOffsetX,
    rOffsetY,
    cropWidth,
  });
  const [cropAvatarData, setCropAvatarData] = useState({});
  console.log(userAvaData);
  const buttonRef = useRef();
  const clickEditAvatar = () => {
    setIsShowPopupMenu(!isShowPopupMenu);
  };

  return (
    <div style={{ position: "relative", pointerEvents: "none" }}>
      {isShowPopupCropAva && (
        <CropAvatar
          isShowPopupCropAva={isShowPopupCropAva}
          setIsShowPopupCropAva={setIsShowPopupCropAva}
          cropAvaData={cropAvatarData}
          setUserAvaData={setUserAvaData}
          windowWidth={windowWidth}
        ></CropAvatar>
      )}
      <div className="avatar-container" style={{ width: `${windowWidth}px` }}>
        <div className="group-button">
          <ImageAvatar avatarData={userAvaData}></ImageAvatar>
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
  );
};

export default AvatarContainer;
