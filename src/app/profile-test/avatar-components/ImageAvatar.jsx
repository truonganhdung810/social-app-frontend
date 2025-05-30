const ImageAvatar = ({ avaData, dislaySize }) => {
  const { src, width, height, rOffsetX, rOffsetY, cropWidth } = avaData;

  let scaleRatio, offsetX, offsetY;

  scaleRatio = dislaySize / cropWidth;
  offsetX = rOffsetX * scaleRatio;
  offsetY = rOffsetY * scaleRatio;

  return (
    <div
      className="img-container"
      style={{
        position: "relative",
        width: `${dislaySize}px`,
        height: `${dislaySize}px`,
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
          width: `${width * scaleRatio}px`,
          height: `${height * scaleRatio}px`,
          maxWidth: "none",
          left: `${-offsetX}px`,
          top: `${-offsetY}px`,
          position: "absolute",
          objectFit: "cover",
        }}
      />
    </div>
  );
};
export default ImageAvatar;
