"use client";
import { useState, useRef, useEffect, use } from "react";
import "./cover-image.css";
import { FaCamera } from "react-icons/fa";
import PopupMenu from "./PopupMenu";
import React, { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import { startTransition } from "react";

let imageRatio = 3;
let scaleRatio = 1;
let defaultScaleRatio = 1;
let fullWidth = 1200;
let fullHeight = 400;

export default function CoverImage() {
  // Ảnh cover có 4 trường hợp kích thước:
  // 1200x400 đối với thiết bị trên 1280
  // 750x250 đối với thiết bị từ 767 đến 1280
  // FullWidth đối với thiết bị từ 350 đến 767
  // MinWidth là 350
  // Tỉ lệ ảnh luôn là 3:1 ở tất cả các trường hợp
  // Khi lưu trữ ảnh lên server, lưu kèm 1 giá trị là OffsetY hoặc OffsetX (giá trị này xác định vị trí hiển thị của ảnh cover ở trong container)
  // Nếu tỉ lệ ảnh lớn hơn 3:1 (tức ảnh bị dẹt hơn tỉ lệ này) chúng ta cố định height, đặt vị trí theo OffsetX (di chuyển ngang)
  // Nếu tỉ lệ ảnh nhỏ hơn 3:1 (tức ảnh rộng hơn) chúng ta cố định width, đặt vị trí theo OffsetY (di chuyển dọc)
  // Nếu tỉ lệ ảnh là 3:1, không cần phải đặt vị trí

  const btnEditCoverRef = useRef(null);
  const coverRef = useRef(null);
  const coverContainerRef = useRef(null);

  // Lấy thông tin User ra từ UserContext
  const { user } = useContext(UserContext); // Lấy dữ liệu người dùng từ context
  if (!user) {
    return <div>Loading...</div>; // hoặc return null để chờ
  }

  let originImg = user.cover; // url cover được lưu trong localStorage
  let defaultOffsetY = user.cover_offsetY;
  let defaultOffsetX = user.cover_offsetX;

  // Lấy kích thước container-cover
  useEffect(() => {
    if (coverContainerRef.current) {
      fullWidth = coverContainerRef.current.offsetWidth; // Lấy chiều rộng container
      fullHeight = coverContainerRef.current.offsetHeight; // Lấy chiều dài container
      console.log("container: ", fullWidth, fullHeight);

      //   if (defaultOffsetX != 0) {
      //     scaleRatio = fullHeight / 1200; // chiều rộng của ảnh là 1200
      //     console.log("Scale Ratio theo X", scaleRatio);
      //   } else if (defaultOffsetY != 0) {
      //     scaleRatio = w / 1200; // chiều cao của ảnh là 1200
      //     console.log("Scale Ratio theo Y", scaleRatio);
      //   } else {
      //     // trường hợp ảnh đúng tỉ lệ
      //     scaleRatio = w / 1200;
      //   }
      //   defaultScaleRatio = scaleRatio;
      //   defaultOffsetX = defaultOffsetX * scaleRatio;
      //   defaultOffsetY = defaultOffsetY * scaleRatio;
    }

    // Optional: Cập nhật width khi cửa sổ thay đổi kích thước
    const handleResize = () => {
      if (coverContainerRef.current) {
        // Nếu có sự thay đổi width, lập tức hủy bỏ sự thay đổi Cover (đảm bảo hiển thị đẹp của Cover) -> gọi Hàm cancel
        // Người dùng muốn thay đổi cover, phải giữ nguyên width của thiết bị
        console.log(
          "Cover Container Width",
          coverContainerRef.current.offsetWidth
        );
        cancelEdit();
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!user) {
    //quay ra trang Login
    return;
  }

  // useState để lưu file Ảnh Cover được chọn từ máy
  const [fileImage, setFileImage] = useState(null);
  // Url của Cover
  const [coverUrl, setCoverUrl] = useState(user.cover);

  // Kích thước của Container chứa Cover
  // Được lấy ra ngay ban đầu khi kiểm tra kích thước màn hình thiết bị

  // State kiểm tra cover đã load được ảnh chưa
  const [coverLoaded, setCoverLoaded] = useState(false);

  // State bật tắt PopupMenu
  const [isShowPopupMenu, setIsShowPopupMenu] = useState(false);

  // State kiểm tra có đang ở trạng thái Preview Cover
  const [isPreviewCover, setIsPreviewCover] = useState(false);

  // Dùng useEffect kiểm tra ảnh cover tải xong, setState để hiển thị button
  useEffect(() => {
    const img = coverRef.current;

    // Kiểm tra nếu ảnh đã load từ cache
    if (img && img.complete && img.naturalWidth !== 0) {
      setCoverLoaded(true);
      return;
    }

    // Gắn sự kiện onload và onerror
    const handleLoad = () => setCoverLoaded(true);
    const handleError = () => console.log("Không thể load ảnh");

    img.addEventListener("load", handleLoad);
    img.addEventListener("error", handleError);

    // Dọn dẹp sự kiện khi component unmount
    return () => {
      img.removeEventListener("load", handleLoad);
      img.removeEventListener("error", handleError);
    };
  }, [coverRef]);

  // Bật tắt PopupMenu bằng Button
  function clickBtnEditCover() {
    setIsShowPopupMenu(!isShowPopupMenu);
  }

  // Các giá trị tọa độ để hiển thị cover
  // OffsetY là vị trí hiển thị của ảnh Cover so với container, đây là 1 trường cần lưu trữ kèm theo ảnh để hiển thị ảnh cho đẹp
  const [offsetY, setOffsetY] = useState(defaultOffsetY);
  const [offsetX, setOffsetX] = useState(defaultOffsetX);

  let isDragX = false;
  let isDragY = false;

  const [startX, setStartX] = useState(null);
  const [startY, setStartY] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [containerHeight, setContainerHeight] = useState(400);
  const [imageHeight, setImageHeight] = useState(800);
  const [containerWidth, setContainerWidth] = useState(1200);
  const [imageWidth, setImageWidth] = useState(1200);

  // Effect lấy ra chiều cao của image Cover khi kéo dọc, lấy ra width khi kéo ngang
  useEffect(() => {
    const imgCom = new Image();
    imgCom.src = coverUrl;
    imgCom.onload = () => {
      console.log("Kich thuoc ảnh: " + imgCom.width + " x " + imgCom.height);
      console.log("Full width height", fullWidth, fullHeight);
      let w = imgCom.width;
      let h = imgCom.height;
      imageRatio = w / h;
      console.log(imageRatio);

      // Kiểm tra tỉ lệ của ảnh so với tỉ lệ 3:1 mặc định
      if (imageRatio > 3) {
        // di chuyển ngang
        // scale ảnh to lên hoặc nhỏ lại cho bằng height của container, width của ảnh to hơn width của container
        const imgH = fullHeight;
        const imgW = (w * fullHeight) / h;
        scaleRatio = fullHeight / h;
        isDragX = true;
        isDragY = false;

        // nếu đang upload ảnh cover mới từ file, tạo điểm offset cho ảnh hiển thị chính giữa container
        if (isPreviewCover) {
          defaultOffsetX = -(imgW - fullWidth) / 2;
          defaultOffsetY = 0;
        }
        startTransition(() => {
          setImageHeight(imgH);
          setImageWidth(imgW);
          setOffsetY(0);
          setOffsetX(scaleRatio * defaultOffsetX);
        });
      } else if (imageRatio < 3) {
        // di chuyển dọc
        // scale ảnh to lên hoặc nhỏ lại cho bằng width của container, height của ảnh to hơn height của container
        const imgH = (h * fullWidth) / w;
        const imgW = fullWidth;
        scaleRatio = fullWidth / w;
        isDragX = false;
        isDragY = true;
        // nếu đang upload ảnh cover mới từ file, tạo điểm offset cho ảnh hiển thị chính giữa container
        if (isPreviewCover) {
          defaultOffsetX = 0;
          defaultOffsetY = -(imgH - fullHeight) / 2;
        }
        startTransition(() => {
          setOffsetX(0);
          setOffsetY(scaleRatio * defaultOffsetY);
          setImageHeight(imgH);
          setImageWidth(imgW);
        });
      } else {
        // tỉ lệ bằng khoảng 3:1 (cho sai số 5%), ko cần drag ảnh
        scaleRatio = fullWidth / w;
        const imgW = fullWidth;
        const imgH = fullHeight;
        isDragX = false;
        isDragY = false;
        startTransition(() => {
          setOffsetY(0);
          setOffsetX(0);
          setImageHeight(imgH);
          setImageWidth(imgW);
        });
      }
    };
    imgCom.onerror = () => setError("Failed to load image");
  }, [coverUrl]);

  // Các hàm để thực hiện kéo thả vị trí cho ảnh Cover (dùng trên desktop, các hàm trên mobile phải set riêng)
  // Set 3 hàm này truyền vào cover-container để bắt sự kiện click, kéo, thả của chuột
  // chỉ thực hiện khi đang preview ảnh Cover, isPreviewCover=true
  // Khi bắt đầu click chuột:
  const handleMouseDown = (e) => {
    if (isPreviewCover) {
      if (isDragY) {
        // Kéo thả theo chiều dọc (OffsetY)
        setStartY(e.clientY);
        console.log("start Y", startY);
        setDragging(true);
      } else if (isDragX) {
        // Kéo thả theo chiều ngang (OffsetX)
        setStartX(e.clientX);
        console.log("start X", startX);
        setDragging(true);
      }
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    if (isPreviewCover) {
      if (isDragY) {
        // Drag theo chiều dọc
        const dy = e.clientY - startY;
        setStartY(e.clientY);
        // Giới hạn kéo không quá mức ảnh
        setOffsetY((prev) => {
          const newOffset = prev + dy;
          const maxOffset = 0;
          const minOffset = containerHeight - imageHeight;
          return Math.max(Math.min(newOffset, maxOffset), minOffset);
        });
      } else if (isDragX) {
        // Drag theo chiều ngang
        const dx = e.clientX - startX;
        setStartX(e.clientX);
        // Giới hạn kéo không quá mức ảnh
        setOffsetX((prev) => {
          const newOffset = prev + dx;
          const maxOffset = 0;
          const minOffset = containerWidth - imageWidth;
          return Math.max(Math.min(newOffset, maxOffset), minOffset);
        });
      }
    }
  };

  // Khi thả chuột
  const handleMouseUp = () => {
    if (isPreviewCover) {
      console.log(offsetY);
      setDragging(false);
    }
  };
  // Kêt thúc các sự kiện cho việc kéo thả vị trí ảnh Cover

  const setNewCoverImage = (urlImG) => {
    // Ở hàm này, chúng ta set hiển thị ảnh cover mới bằng 1 url hình ảnh, được generate từ file ảnh lấy trong máy.
    // Ảnh có nhiều tỉ lệ kích thước, nhưng chỉ hiển thị 1 phần theo tỉ lệ cover mặc định
    // Sử dụng kéo thả để chọn phần hiển thị cho Cover

    // Khởi tạo lại OffsetY=0 là giá trị mặc định, nếu có dữ liệu OffsetY theo ảnh thì cài đặt giá trị này
    // Ở đây chương trình không lưu lại giá trị OffsetY của ảnh nên dùng giá trị mặc định khi thay 1 ảnh cover mới
    // Nếu chạy trên mobile, giá trị OffsetY này phải là giá trị khác
    setOffsetY(0);
    setOffsetX(0);
    setIsPreviewCover(true);
    originImg = coverUrl;
    setCoverUrl(urlImG);
  };

  function cancelEdit() {
    console.log("Cancel Edit:", originImg);
    scaleRatio = defaultScaleRatio;
    isDragX = false;
    isDragY = false;
    startTransition(() => {
      console.log(originImg);
      setCoverUrl(originImg);
      setIsPreviewCover(false);
      setOffsetX(defaultOffsetX * scaleRatio);
      setOffsetY(defaultOffsetY * scaleRatio);
    });
  }

  // upload ảnh lên server
  async function uploadFile() {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage hoặc cookie
    const userId = localStorage.getItem("id"); // id của người dùng từ localStorage
    console.log("Token upload cover", token);
    console.log("Id upload cover", userId);
    const formData = new FormData();
    formData.append("cover-image", fileImage);

    const realOffsetX = scaleRatio * offsetX;
    const realOffsetY = scaleRatio * offsetY;

    const response = await fetch("http://localhost:4000/api/upload/cover", {
      method: "POST",
      headers: {
        authorization: `Bearer ${token}`, // Thêm token vào header Authorization
        id: userId,
        offsetX: realOffsetX,
        offsetY: realOffsetY,
      },
      body: formData, // Gửi FormData chứa ảnh
    });
    const res = await response.json();
    if (res.message == "OK") {
      localStorage.setItem("cover", res.fileUrl);
      localStorage.setItem("cover_offsetX", realOffsetX);
      localStorage.setItem("cover_offsetY", realOffsetY);
    }

    console.log("Response upload cover", res);
  }

  function saveEdit() {
    originImg = coverUrl;
    isDragX = false;
    isDragY = false;
    setIsPreviewCover(false);
    uploadFile();
  }
  return (
    <div>
      <div className="cover-container" ref={coverContainerRef}>
        {isPreviewCover && (
          <div className="confirm-change">
            <button className="btn-cancel" onClick={cancelEdit}>
              Cancel
            </button>
            <button className="btn-save" onClick={saveEdit}>
              Save changes
            </button>
          </div>
        )}
        <div
          className={`cover-img-container ${dragging ? "dragging" : ""}`}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <img
            ref={coverRef}
            className="cover-image"
            src={coverUrl}
            style={{
              height: `${imageHeight}px`,
              width: `${imageWidth}px`,
              transform: ` translateX(${offsetX}px) translateY(${offsetY}px)`,
              transition: dragging ? "none" : "transform 0.2s",
            }}
          ></img>
        </div>

        {coverLoaded && !isPreviewCover && (
          <button
            className="btn-edit-cover"
            ref={btnEditCoverRef}
            onClick={clickBtnEditCover}
          >
            <FaCamera className="camera-icon" />
            <div className="btn-edit-cover-text"> Edit Cover </div>
          </button>
        )}
      </div>
      <div className="vitri-popup">
        {isShowPopupMenu && (
          <PopupMenu
            isOpen={isShowPopupMenu}
            setIsOpen={setIsShowPopupMenu}
            buttonRef={btnEditCoverRef}
            setCoverUrl={setNewCoverImage}
            fileImage={fileImage}
            setFileImage={setFileImage}
          />
        )}
      </div>
    </div>
  );
}
