import { useRef } from 'react'

const ImageAvatar = ({ userAvaData, dislaySize }) => {
  const { src, width, height, rOffsetX, rOffsetY, cropWidth } = userAvaData

  // Kích thước Avatar hiển thị là DislaySize
  // Scale các thông số của ảnh (offsetX, offsetY và cropWidth) về kích thước này rồi hiển thị
  const scaleRatio = useRef(1)

  const offsetX = useRef(0)
  const offsetY = useRef(0)

  scaleRatio.current = dislaySize / cropWidth
  offsetX.current = rOffsetX * scaleRatio.current
  offsetY.current = rOffsetY * scaleRatio.current

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
          width: `${width * scaleRatio.current}px`,
          height: `${height * scaleRatio.current}px`,
          maxWidth: 'none',
          left: `${-offsetX.current}px`,
          top: `${-offsetY.current}px`,
          position: 'absolute',
          objectFit: 'cover',
        }}
      />
    </div>
  )
}
export default ImageAvatar
