import { useRef } from "react";

const ImageAvatar = ({ avatarData }) => {
  const { src, width, height, rOffsetX, rOffsetY, cropWidth } = avatarData;
  if (src == null) {
    // Chưa có avatar, hiển thị avatar mặc định
    // src = 'avatar mặc định'
  }
  // Kích thước Avatar hiển thị là 180x180px
  // Scale các thông số của ảnh (offsetX, offsetY và cropWidth) về kích thước này rồi hiển thị
  const scaleRatio = useRef(1);

  const offsetX = useRef(0);
  const offsetY = useRef(0);

  scaleRatio.current = 180 / cropWidth;
  offsetX.current = rOffsetX * scaleRatio.current;
  offsetY.current = rOffsetY * scaleRatio.current;

  console.log(
    "Scale",
    scaleRatio.current,
    "OffsetX",
    offsetX.current,
    "OffsetY",
    offsetY.current
  );

  return (
    <div
      className="img-container"
      style={{
        position: "relative",
        width: "180px",
        height: "180px",
        borderRadius: "50%",
        overflow: "hidden",
        border: "5px solid rgb(255, 255, 255)",
        backgroundColor: "#f0f0f0",
      }}
    >
      <img
        className="avatar-img"
        src={src}
        alt="Avatar"
        style={{
          width: `${width * scaleRatio.current}px`,
          height: `${height * scaleRatio.current}px`,
          maxWidth: "none",
          left: `${-offsetX.current}px`,
          top: `${-offsetY.current}px`,
          position: "absolute",
          objectFit: "cover",
        }}
      />
    </div>
  );
};
export default ImageAvatar;
