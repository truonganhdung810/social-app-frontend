// Module nén ảnh về kích thước maxWidth hoặc maxHeight là 1200x1200

const compressImage = (
  file,
  maxWidth = 1200,
  maxHeight = 1200,
  quality = 1
) => {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()

    // Đọc file ảnh từ input
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

      // Tính toán tỷ lệ thu nhỏ để giữ tỷ lệ ảnh đúng
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      // Thiết lập kích thước canvas mới
      canvas.width = width
      canvas.height = height

      // Vẽ ảnh lên canvas
      ctx.drawImage(img, 0, 0, width, height)

      // Tạo blob từ canvas với chất lượng đã nén
      canvas.toBlob(
        (blob) => {
          const compressedFile = new File([blob], file.name, {
            type: file.type,
            lastModified: Date.now(),
          })
          resolve(compressedFile)
        },
        file.type, // Định dạng của ảnh (JPEG, PNG, v.v.)
        quality // Chất lượng ảnh (0 đến 1)
      )
    }
  })
}
export default compressImage
