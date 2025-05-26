import React, { useRef, useState } from "react";
import { IoMdResize } from "react-icons/io";

const CropAvatar = ({
  isShowPopupCropAva,
  setIsShowPopupCropAva,
  avaData,
  windowWidth,
}) => {
  if (!avaData || avaData.file === null) return null;
  const { file, src, width, height, rOffsetX, rOffsetY, cropWidth } = avaData;
  const [image, setImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  const isResize = useRef(false);
  const isDragging = useRef(false);

  const minCropWidth = 180;

  let popupWidth = (4 * windowWidth) / 5;
  let popupHeight = (4 * popupWidth) / 5;
  if (popupHeight < 600) popupHeight = 600;

  let scaleX = popupWidth / width;
  let scaleY = popupHeight / height;
  let scaleRatio = Math.min(scaleX, scaleY);

  const imgWidth = useRef(scaleRatio * width);
  const imgHeight = useRef(scaleRatio * height);

  const cropW = useRef(Math.min(imgWidth.current, imgHeight.current));
  const defaultOffsetX = useRef((popupWidth - cropW.current) / 2);
  const defaultOffsetY = useRef((popupHeight - cropW.current) / 2);
  const [offsetX, setOffsetX] = useState(defaultOffsetX.current);
  const [offsetY, setOffsetY] = useState(defaultOffsetY.current);
  const [nowCropWidth, setNowCropWidth] = useState(cropW.current);
  const startPos = useRef({ x: 0, y: 0 });

  const handleResizeMouseDown = (e) => {
    e.preventDefault();
    e.stopPropagation(); // ⛔ không cho lan lên crop-box
    isResize.current = true;
    isDragging.current = false;
    console.log("Click button Resize");
    startPos.current = { x: e.clientX, y: e.clientY };

    // Lắng nghe khi kéo chuột và thả chuột
    window.addEventListener("mousemove", handleResizeMouseMove);
    window.addEventListener("mouseup", handleResizeMouseUp);
  };

  const handleResizeMouseMove = (e) => {
    //e.stopPropagation(); // ⛔ không cho lan lên crop-box
    if (!isResize.current) return;

    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    const delta = Math.max(Math.abs(dx), Math.abs(dy)); // Đảm bảo hình vuông
    let newSize;
    if (dx < 0 || dy < 0) {
      newSize = Math.max(nowCropWidth - delta, minCropWidth);
    } else {
      newSize = Math.min(nowCropWidth + delta, cropW.current);
    }

    setNowCropWidth(newSize);
  };

  const handleDragMouseDown = (e) => {
    e.preventDefault();
    isResize.current = false;
    isDragging.current = true;
    console.log("Click button Drag");

    startPos.current = { x: e.clientX, y: e.clientY };

    window.addEventListener("mousemove", handleDragMouseMove);
    window.addEventListener("mouseup", handleDragMouseUp);
  };

  const handleDragMouseMove = (e) => {
    // Nếu không phải đang resize thì bắt đầu drag
    if (!isDragging.current) return;
    const dx = e.clientX - startPos.current.x;
    const dy = e.clientY - startPos.current.y;
    startPos.current = { x: e.clientX, y: e.clientY };

    setOffsetX((prev) => {
      let newOffsetX = prev + dx;
      const minOffsetX =
        imgWidth.current >= imgHeight.current ? 0 : defaultOffsetX.current;
      const maxOffsetX = minOffsetX + imgWidth.current - nowCropWidth;
      if (newOffsetX < minOffsetX) newOffsetX = minOffsetX;
      else if (newOffsetX > maxOffsetX) newOffsetX = maxOffsetX;
      return newOffsetX;
    });

    setOffsetY((prev) => {
      let newOffsetY = prev + dy;
      const minOffsetY =
        imgWidth.current < imgHeight.current ? 0 : defaultOffsetY.current;
      const maxOffsetY = minOffsetY + imgHeight.current - nowCropWidth;
      if (newOffsetY < minOffsetY) newOffsetY = minOffsetY;
      else if (newOffsetY > maxOffsetY) newOffsetY = maxOffsetY;
      return newOffsetY;
    });
  };

  const handleResizeMouseUp = () => {
    if (isResize.current) console.log("Resize Mouse Up");
    if (isDragging.current) console.log("Drag Mouse Up");
    window.removeEventListener("mousemove", handleResizeMouseMove);
    window.removeEventListener("mouseup", handleResizeMouseUp);
    isResize.current = false;
    isDragging.current = false;
  };

  const handleDragMouseUp = () => {
    window.removeEventListener("mousemove", handleDragMouseMove);
    window.removeEventListener("mouseup", handleDragMouseUp);
    isResize.current = false;
    isDragging.current = false;
  };

  return (
    <div
      className="crop-avatar-container"
      style={{
        top: `${windowWidth / 10}px`,
        left: "50%" /* Đặt phần tử ở giữa theo chiều ngang */,
        transform:
          "translateX(-50%)" /* Dịch chuyển về phía trái để căn giữa */,
        zIndex: "100",
        position: "fixed",
        backgroundColor: "white",
        boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.3)",
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
          padding: "0px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#E2E5E9",
          overflow: "hidden",
          position: "relative",
        }}
      >
        <img
          src={src}
          alt="Selected"
          style={{
            width: `${imgWidth.current}px`,
            height: `${imgHeight.current}px`,
            objectFit: "contain",
            borderWidth: "0px",
            borderColor: "black",
            pointerEvents: "auto",
          }}
        />
        <div
          className="crop-box"
          style={{
            position: "absolute",
            left: `${offsetX}px`,
            top: `${offsetY}px`,
            width: `${nowCropWidth}px`,
            height: `${nowCropWidth}px`,
            border: "1px solid #fff",
            boxShadow: "0 0 0 9999px rgba(0, 0, 0, 0.5)",
            cursor: "move",
            pointerEvents: "auto",
          }}
          onMouseDown={handleDragMouseDown}
          onMouseMove={handleDragMouseMove}
          onMouseUp={handleDragMouseUp}
        >
          <IoMdResize
            style={{
              position: "absolute",
              bottom: `-${cropW.current / 55}px`,
              right: `-${cropW.current / 55}px`,
              width: `${cropW.current / 25}px`,
              height: `${cropW.current / 25}px`,
              background: "transparent",
              color: "rgb(255, 255, 255)",
              borderWidth: "2px",
              cursor: "se-resize",
              transform: "scaleX(-1)",
              pointerEvents: "auto", // cho phép click được dù cha đang pointerEvents: none
            }}
            onMouseDown={handleResizeMouseDown}
            onMouseMove={handleResizeMouseMove}
            onMouseUp={handleResizeMouseUp}
            // dùng riêng để resize
          ></IoMdResize>
        </div>
      </div>
    </div>
  );
};

export default CropAvatar;
