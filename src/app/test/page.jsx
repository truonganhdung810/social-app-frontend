"use client";
import React, { useState, useEffect, useRef } from "react";
import CoverImage from "./CoverImage";
import PopupMenu from "./PopupMenu";
import DragNewCoverImage from "./DragNewCoverImage";

const ProfilePage = () => {
  const coverData = {
    src: "http://localhost:4000/uploads/images/1747939444999.jpg",
    width: 1200,
    height: 300,
    offsetX: 50,
    offsetY: 0,
  };
  const [windowWidth, setWindowWidth] = useState(0);
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false);
  const btnEditCoverRef = useRef();
  const [previewUrl, setPreviewUrl] = useState(null);
  const [compressedData, setCompressedData] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth;
      let w = newWidth < 1200 ? newWidth : 1200;
      if (w < 350) w = 350;
      setWindowWidth(w);
    };
    handleResize(); // Lấy giá trị ban đầu
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const clickBtnEditCover = () => {
    setIsShowPopupMenu(!isShowPopupMenu);
  };

  return (
    <div className="main-container" style={{ width: `${windowWidth}px` }}>
      <div className="top-navigation">
        <h1>Top Navigation</h1>
      </div>
      <CoverImage
        imageData={coverData}
        windowWidth={windowWidth}
        btnEditCoverRef={btnEditCoverRef}
        clickBtnEditCover={clickBtnEditCover}
      ></CoverImage>

      {previewUrl && compressedData && (
        <DragNewCoverImage
          imgSrc={previewUrl}
          width={compressedData.width}
          height={compressedData.height}
          offsetX={compressedData.offsetX}
          offsetY={compressedData.offsetY}
          windowWidth={windowWidth}
        />
      )}

      <div className="vitri-popup">
        {isShowPopupMenu && (
          <PopupMenu
            isOpen={isShowPopupMenu}
            setIsOpen={setIsShowPopupMenu}
            buttonRef={btnEditCoverRef}
            setPreviewUrl={setPreviewUrl}
            setCompressedData={setCompressedData}
          />
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
