const ImageAvatar = ({ userData, dislaySize }) => {
  const { avatar, ava_offsetX, ava_offsetY, ava_width } = userData

  let src = avatar
  let cropWidth = ava_width
  if (src === 'null' || src === null) {
    src = '/default-avatar_size200x200.jpg'
    cropWidth = 200
  }
  // Tách chuỗi từ phần '_size'
  const sizePart = src.split('_size')[1]
  const dimensions = sizePart.split('.')[0].split('x')

  // Lấy width và height
  const width = parseInt(dimensions[0], 10)
  const height = parseInt(dimensions[1], 10)

  let scaleRatio, offsetX, offsetY

  scaleRatio = dislaySize / cropWidth
  offsetX = ava_offsetX * scaleRatio
  offsetY = ava_offsetY * scaleRatio

  return (
    <div
      className="img-container"
      style={{
        position: 'relative',
        width: `${dislaySize}px`,
        height: `${dislaySize}px`,
        borderRadius: '50%',
        overflow: 'hidden',
        backgroundColor: '#f0f0f0',
      }}
    >
      <img
        className="avatar-img"
        src={src}
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
