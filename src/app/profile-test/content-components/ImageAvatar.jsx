const ImageAvatar = ({ avaData, dislaySize, borderRadius }) => {
  // Kích thước Avatar hiển thị là DislaySize
  // Scale các thông số của ảnh (offsetX, offsetY và cropWidth) về kích thước này rồi hiển thị
  const { src, rOffsetX, rOffsetY, cropWidth } = avaData

  if (src === 'null' || src === null) {
    avaData.src = '/default-avatar_size200x200.jpg'
    avaData.cropWidth = 200
  }

  // Tách chuỗi từ phần '_size'
  const sizePart = avaData.src.split('_size')[1]
  const dimensions = sizePart.split('.')[0].split('x')

  // Lấy width và height
  const width = parseInt(dimensions[0], 10)
  const height = parseInt(dimensions[1], 10)

  let scaleRatio, offsetX, offsetY

  scaleRatio = dislaySize / cropWidth
  offsetX = rOffsetX * scaleRatio
  offsetY = rOffsetY * scaleRatio

  scaleRatio = dislaySize / cropWidth
  offsetX = rOffsetX * scaleRatio
  offsetY = rOffsetY * scaleRatio

  return (
    <div
      className="img-container"
      style={{
        position: 'relative',
        width: `${dislaySize}px`,
        height: `${dislaySize}px`,
        borderRadius: `${borderRadius}%`,
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
      }}
    >
      <img
        className="avatar-img"
        src={avaData.src}
        alt="Avatar"
        style={{
          width: `${width * scaleRatio}px`,
          height: `${height * scaleRatio}px`,
          maxWidth: 'none',
          left: `${-offsetX}px`,
          top: `${-offsetY}px`,
          position: 'absolute',
          objectFit: 'cover',
        }}
      />
    </div>
  )
}
export default ImageAvatar
