// về kích thước minWidth hoặc minHeight là 1200x1200
const compressImgPost = (
  file,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 1
) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    reader.onload = (event) => {
      img.src = event.target.result
    }

    reader.onerror = (error) => reject(error)
    reader.readAsDataURL(file)

    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')

      let width = img.width
      let height = img.height
      let cropWidth = width
      console.log('kich thuoc anh truoc khi nen:', width, height)

      // Tính toán tỷ lệ thu nhỏ
      if (img.width >= img.height && img.width < 5 * img.height) {
        width = maxWidth
        height = (img.height * maxWidth) / img.width
        cropWidth = height
      } else if (img.width < img.height && 5 * img.width > img.height) {
        height = maxHeight
        width = (img.width * maxHeight) / img.height
        cropWidth = width
      } else {
        console.log('Kích thước ảnh không hợp lệ', width, height)
        return null
      }

      // lấy kích thước mặc định của avatar sẽ là 1 hình vuông có cạnh bằng cạnh nhỏ hơn của image, nằm chính giữa image
      let offsetX = (maxWidth - width) / 2
      let offsetY = (maxHeight - height) / 2

      width = Math.round(width)
      height = Math.round(height)

      console.log(
        'kich thuoc anh sau khi nen:',
        width,
        height,
        'offsetX - Y',
        offsetX,
        offsetY
      )

      canvas.width = width
      canvas.height = height

      ctx.drawImage(img, 0, 0, width, height)

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error('Failed to create blob'))
            return
          }

          // Tạo tên file mới
          const originalName = file.name.split('.')[0]
          const extension = file.name.split('.').pop()
          const newFileName = `${originalName}_size${width}x${height}.${extension}`

          // Tạo đối tượng File từ blob
          const compressedFile = new File([blob], newFileName, {
            type: file.type,
            lastModified: Date.now(),
          })

          resolve({
            file: compressedFile,
            src: URL.createObjectURL(compressedFile),
            width,
            height,
            rOffsetX: offsetX,
            rOffsetY: offsetY,
            cropWidth,
          })
        },
        file.type,
        quality
      )
    }
  })
}

export default compressImgPost
