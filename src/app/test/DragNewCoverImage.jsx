"use client";
import React, { useState, useRef, useEffect } from "react";

const CoverImage = ({ imageSrc }) => {
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);
  const [dragging, setDragging] = useState(false);

  const containerRef = useRef(null);
  const imageRef = useRef(null);

  const handleMouseDown = (e) => {
    console.log("mouse down", e.clientX, e.clientY);
    setDragging(true);
  };

  const handleMouseUp = () => {
    setDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragging) {
      const container = containerRef.current;
      const image = imageRef.current;

      // Get the container's bounds
      const containerRect = container.getBoundingClientRect();

      // Calculate the new offset values, preventing the image from going out of bounds
      let newOffsetX = e.clientX - containerRect.left;
      let newOffsetY = e.clientY - containerRect.top;

      const maxOffsetX = Math.max(0, image.width - containerRect.width);
      const maxOffsetY = Math.max(0, image.height - containerRect.height);

      newOffsetX = Math.min(Math.max(newOffsetX, 0), maxOffsetX);
      newOffsetY = Math.min(Math.max(newOffsetY, 0), maxOffsetY);

      setOffsetX(newOffsetX);
      setOffsetY(newOffsetY);
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
      ref={containerRef}
      style={{
        width: "1200px",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "300px",
          overflow: "hidden",
          position: "relative",
          cursor: dragging ? "grabbing" : "grab",
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      ></div>
      <img
        src={imageSrc}
        alt="Cover"
        style={{
          position: "absolute",
          top: -offsetY,
          left: -offsetX,
          transition: dragging ? "none" : "top 0.2s, left 0.2s",
        }}
      />
    </div>
  );
};

export default CoverImage;
