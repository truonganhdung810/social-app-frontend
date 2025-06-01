// Đây là component hiển thị new Cover Photo và cho người dùng kéo thả để chọn vị trí cho cover mới

import React, { useState, useEffect, useRef } from "react";
import "./styles/drag-new-cover.css";
import { RiDragMove2Fill } from "react-icons/ri";

const DragNewCoverImage = ({
  token,
  newCoverData,
  windowWidth,
  setIsPreviewNewCover,
  setSaveCoverData,
}) => {
  if (!newCoverData || newCoverData.file === null) return null;
  const { file, src, width, height, rOffsetX, rOffsetY } = newCoverData;
  const [scaleRatio, setScaleRatio] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    // Ví dụ: thực hiện tác vụ khi windowWidth thay đổi
    if (isDragging) {
      // Nếu đang dragging mà kích thước màn hình thay đổi, lập trức dừng dragging
      // Ở đây có thể dừng bằng cách cho isDragging = false
      setIsDragging(false);
    }
    // Sau đó các thông số scaleX, scaleY, width, height sẽ được reset về ban đầu nhưng theo tỉ lệ với windowWidth mới
    let scaleX = windowWidth / width;
    let scaleY = windowWidth / 3 / height;
    setScaleRatio(Math.max(scaleX, scaleY));

    setOffsetX(rOffsetX * Math.max(scaleX, scaleY));
    setOffsetY(rOffsetY * Math.max(scaleX, scaleY));
  }, [windowWidth]); // Lắng nghe sự thay đổi của windowWidth

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    setOffsetY((prev) => {
      const newOffsetY = prev + dy;
      const maxOffsetY = 0;
      const minOffsetY = windowWidth / 3 - height * scaleRatio;
      return Math.max(Math.min(newOffsetY, maxOffsetY), minOffsetY);
    });
    setOffsetX((prev) => {
      const newOffsetX = prev + dx;
      const maxOffsetX = 0;
      const minOffsetX = windowWidth - width * scaleRatio;
      return Math.max(Math.min(newOffsetX, maxOffsetX), minOffsetX);
    });
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // upload ảnh lên server
  async function uploadFile() {
    const userId = localStorage.getItem("id"); // id của người dùng từ localStorage
    const name = localStorage.getItem("name");
    const formData = new FormData();
    const realOffsetX = scaleRatio * offsetX;
    const realOffsetY = scaleRatio * offsetY;

    formData.append("cover-image", file);
    formData.append("id", userId);
    formData.append("name", name);
    formData.append("offsetX", realOffsetX);
    formData.append("offsetY", realOffsetY);

    const response = await fetch("http://localhost:4000/api/upload/cover", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`, // Thêm token vào header Authorization
      },
      body: formData, // Gửi FormData chứa ảnh
    });

    console.log("response", response);

    const result = await response.json();

    if (response.ok) {
      const fileName = result.fileUrl;

      // Tách chuỗi từ phần '_size'
      const sizePart = fileName.split("_size")[1];
      const dimensions = sizePart.split(".")[0].split("x");

      // Lấy width và height
      const width = parseInt(dimensions[0], 10);
      const height = parseInt(dimensions[1], 10);

      console.log(`Width: ${width}, Height: ${height}`);

      localStorage.setItem("cover", result.fileUrl);
      localStorage.setItem("cover_offsetX", realOffsetX);
      localStorage.setItem("cover_offsetY", realOffsetY);

      const saveData = {
        src: result.fileUrl,
        width,
        height,
        offsetX: realOffsetX,
        offsetY: realOffsetY,
      };
      setSaveCoverData(saveData);
      setIsPreviewNewCover(false);
    }
  }

  const cancelEdit = () => {
    setIsPreviewNewCover(false);
  };
  const saveEdit = () => {
    uploadFile();
  };

  return (
    <div
      className="drag-container"
      style={{
        position: "relative",
        width: `${windowWidth}px`,
        height: `${windowWidth / 3}px`,
        overflow: "hidden",
        cursor: "move",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <div className="confirm-change">
        <div className="drag-cover-text-group">
          <RiDragMove2Fill
            className="crop-icon"
            style={{
              color: "white",
              marginLeft: "20px",
              transform: "scale(1.5)",
            }}
          />
          <span
            className="crop-text"
            style={{ color: "white", marginLeft: "5px" }}
          >
            "Click and drag to crop your cover photo"
          </span>
        </div>
        <div className="drag-cover-btn-group">
          <button className="btn-cancel" onClick={cancelEdit}>
            Cancel
          </button>
          <button className="btn-save" onClick={saveEdit}>
            Save changes
          </button>
        </div>
      </div>

      <img
        src={src}
        alt="Cover"
        draggable={false}
        style={{
          position: "absolute",
          objectFit: "cover",
          transform: `translate(${offsetX}px, ${offsetY}px)`,
          width: `${width * scaleRatio}px`,
          height: `${height * scaleRatio}px`,
          maxWidth: "none",
          userSelect: "none",
        }}
      />
    </div>
  );
};
export default DragNewCoverImage;
