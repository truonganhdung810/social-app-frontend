import React, { useState, useEffect, useRef } from "react";

const DragNewCoverImage = ({
  imgSrc,
  width,
  height,
  offsetX,
  offsetY,
  windowWidth,
}) => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;

    const dx = e.clientX - startPos.x;
    const dy = e.clientY - startPos.y;

    setOffsetX((prev) => prev + dx);
    setOffsetY((prev) => prev + dy);

    setStartPos({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <div
      style={{
        width: "100%",
        height: "33vw", // tỉ lệ 1:3 như Facebook
        overflow: "hidden",
        position: "relative",
        border: "1px solid #ccc",
        cursor: "grab",
      }}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onMouseDown={handleMouseDown}
    >
      <img
        src={imgSrc}
        alt="Cover"
        draggable={false}
        style={{
          position: "absolute",
          left: offsetX,
          top: offsetY,
          width: width,
          height: height,
          userSelect: "none",
        }}
      />
    </div>
  );
};
export default DragNewCoverImage;
