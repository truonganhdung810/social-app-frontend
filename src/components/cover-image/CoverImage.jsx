import { useState, useRef, useEffect } from "react";
import "../cover-image/cover-image.css";
import { FaCamera } from "react-icons/fa";
import PopupMenu from "@/components/cover-image/PopupMenu";

let imgUrl = "";
let originImg = "https://images.unsplash.com/photo-1747372248943-33e9064aefab";
export default function CoverImage() {
  // Url của Cover
  const [coverUrl, setCoverUrl] = useState(originImg);

  const btnEditCoverRef = useRef(null);
  const coverRef = useRef(null);
  const coverContainerRef = useRef(null);

  const [fullWidth, setFullWidth] = useState(1280);

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
  const [offsetY, setOffsetY] = useState(0);
  const [startY, setStartY] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [containerHeight, setContainerHeight] = useState(400);
  const [imageHeight, setImageHeight] = useState(800);

  // Effect Lấy ra chiều cao (Height) của image Cover
  useEffect(() => {
    const imgCom = new Image();
    imgCom.src = coverUrl;
    imgCom.onload = () => {
      console.log("Kich thuoc ảnh: " + imgCom.width + " x " + imgCom.height);
      // scale ảnh to lên hoặc nhỏ lại cho bằng width của container
      const imgH = (imgCom.height * fullWidth) / imgCom.width;
      const imgW = (imgCom.width * fullWidth) / imgCom.width;
      console.log("Kich thuoc ảnh scale: " + imgW + " x " + imgH);
      setImageHeight(imgH);
    };
    imgCom.onerror = () => setError("Failed to load image");
  }, [coverUrl]);

  useEffect(() => {
    if (coverContainerRef.current) {
      const w = coverContainerRef.current.offsetWidth; // Lấy chiều rộng container
      console.log("chiều rộng container: " + w);
      setFullWidth(w);
    }

    // Optional: Cập nhật width khi cửa sổ thay đổi kích thước
    const handleResize = () => {
      if (coverContainerRef.current) {
        //console.log(coverContainerRef.current.offsetWidth);
        //setFullWidth(coverContainerRef.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [fullWidth]);

  // Các hàm để thực hiện kéo thả vị trí cho ảnh Cover
  // Set 3 hàm này truyền vào cover-container để bắt sự kiện click, kéo, thả của chuột
  // chỉ thực hiện khi đang preview ảnh Cover, isPreviewCover=true
  // Khi bắt đầu click chuột:
  const handleMouseDown = (e) => {
    if (isPreviewCover) {
      setStartY(e.clientY);
      console.log(startY);
      setDragging(true);
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging) return;
    if (isPreviewCover) {
      const dy = e.clientY - startY;
      setStartY(e.clientY);

      // Giới hạn kéo không quá mức ảnh
      setOffsetY((prev) => {
        const newOffset = prev + dy;
        const maxOffset = 0;
        const minOffset = containerHeight - imageHeight;
        return Math.max(Math.min(newOffset, maxOffset), minOffset);
      });
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
    setIsPreviewCover(true);
    originImg = coverUrl;
    setCoverUrl(urlImG);
  };

  // Crop Cover theo phần hiển thị trên Cover Container
  const cropCoverImage = () => {
    // Sau khi kéo thả, hiện tại Cover đang hiển thị với thông số fullWidth x imageHeight, vị trí OffsetY
    // Lấy dữ liệu từ canvas và tạo ảnh mới
    const croppedDataUrl = canvas.toDataURL();
    setCroppedImage(croppedDataUrl);
  };

  function cancelEdit() {
    console.log(originImg);
    setCoverUrl(originImg);
    setIsPreviewCover(false);
  }
  function saveEdit() {
    originImg = coverUrl;
    console.log(offsetY);
    setIsPreviewCover(false);
  }
  return (
    <div>
      <div className="cover-container">
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
          ref={coverContainerRef}
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
              height: { imageHeight },
              transform: `translateY(${offsetY}px)`,
              transition: dragging ? "none" : "transform 0.2s",
            }}
          ></img>
        </div>

        {coverLoaded && (
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
          />
        )}
      </div>
    </div>
  );
}
