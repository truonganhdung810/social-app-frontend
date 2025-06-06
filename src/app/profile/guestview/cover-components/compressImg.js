// Module nén ảnh về kích thước minWidth hoặc minHeight là 1200x1200
const compressImage = (file, minWidth = 1200, minHeight = 400, quality = 1) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    const reader = new FileReader();

    reader.onload = (event) => {
      img.src = event.target.result;
    };

    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);

    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      let width = img.width;
      let height = img.height;
      console.log("kich thuoc anh truoc khi nen:", width, height);

      // Tính toán tỷ lệ thu nhỏ
      if (width > 3 * height && width < 6 * height) {
        height = minHeight;
        width = (minHeight * img.width) / img.height;
      } else if (width < 3 * height && width > height / 5) {
        width = minWidth;
        height = (minWidth * img.height) / img.width;
      } else if (width == 3 * height) {
        width = minWidth;
        height = minHeight;
      } else {
        console.log("Kích thước ảnh không hợp lệ", width, height);
        return null;
      }

      let offsetX = (minWidth - width) / 2;
      let offsetY = (minHeight - height) / 2;

      width = Math.round(width);
      height = Math.round(height);

      console.log(
        "kich thuoc anh sau khi nen:",
        width,
        height,
        "offsetX - Y",
        offsetX,
        offsetY
      );

      canvas.width = width;
      canvas.height = height;

      ctx.drawImage(img, 0, 0, width, height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Failed to create blob"));
            return;
          }

          // Tạo tên file mới
          const originalName = file.name.split(".")[0];
          const extension = file.name.split(".").pop();
          const newFileName = `${originalName}_size${width}x${height}.${extension}`;

          // Tạo đối tượng File từ blob
          const compressedFile = new File([blob], newFileName, {
            type: file.type,
            lastModified: Date.now(),
          });

          resolve({
            file: compressedFile,
            src: URL.createObjectURL(compressedFile),
            width,
            height,
            rOffsetX: offsetX,
            rOffsetY: offsetY,
          });
        },
        file.type,
        quality
      );
    };
  });
};

export default compressImage;
