export const cropImage = (image:any, handleCroppedImages: (croppedImages: string[]) => void) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const img = new Image();
    img.src = image;

    img.onload = () => {
      const halfWidth = img.width / 2;
      canvas.width = halfWidth;
      canvas.height = img.height;

      // Crop left half
      ctx!.drawImage(img, 0, 0, halfWidth, img.height, 0, 0, halfWidth, img.height);
      const leftHalf = canvas.toDataURL();

      // Crop right half
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      ctx!.drawImage(img, halfWidth, 0, halfWidth, img.height, 0, 0, halfWidth, img.height);
      const rightHalf = canvas.toDataURL();

      // Call the callback function with cropped images
      handleCroppedImages([leftHalf, rightHalf]);
    };
};
