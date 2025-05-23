"use client";
import React, { useState, useRef, useEffect } from "react";

const CoverImage = ({ imageSrc }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragging, setDragging] = useState(false);

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseDown = (e) => {
    console.log("Mouse down");
    setDragging(true);
  };

  const handleMouseUp = () => {
    console.log("Mouse up");
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
    }
  };

  useEffect(() => {
    // Add event listeners for dragging
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    // Clean up event listeners on component unmount
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [dragging]);

  return (
    <div
      style={{
        background: "red",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <img
        ref={imageRef}
        src={imageSrc}
        alt="Cover"
        style={{
          position: "absolute",
          transition: dragging ? "none" : "top 0.2s, left 0.2s",
        }}
      />
      <div
        style={{
          width: "100%",
          height: "300px",
          overflow: "hidden",
          position: "relative",
          background: "rgba(255, 255, 255, 0)",
          cursor: dragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      ></div>
    </div>
  );
};

export default CoverImage;
