"use client";
import React, { useState } from "react";
import WindowWidth from "./windowWidth";
import CoverImage from "./Test";

const FileInput = () => {
  const [coverData, setCoverData] = useState({
    src: "http://localhost:4000/uploads/images/1747905600514.jpg",
    width: 1200,
    height: 800,
    offsetX: 0,
    offsetY: 0,
  });
  const [fileInfo, setFileInfo] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Lấy file đầu tiên trong danh sách
    if (file) {
      const reader = new FileReader();

      // Đọc file ảnh để lấy kích thước
      reader.onload = (e) => {
        const img = new Image();
        img.onload = () => {
          const width = img.width; // Lấy chiều rộng của ảnh
          const height = img.height; // Lấy chiều cao của ảnh

          // Đổi tên file
          const newFileName = `${
            file.name.split(".")[0]
          }_size${width}x${height}.${file.name.split(".").pop()}`;

          setFileInfo(
            `New file name: ${newFileName} | Size: ${width}x${height}`
          );
        };
        img.src = e.target.result;
      };

      reader.readAsDataURL(file); // Đọc file ảnh
    }
  };

  return (
    <div style={{ width: "1200px" }}>
      <CoverImage imageSrc={coverData.src} />
    </div>
  );
};

export default FileInput;
