export const cropImage = (image:any, numberOfPieces: number, handleCroppedImages: (croppedImages: string[]) => void) => {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');

  const img = new Image();
  img.src = image;

  img.onload = () => {
    const pieceWidth = img.width / numberOfPieces;
    canvas.width = pieceWidth;
    canvas.height = img.height;

    const croppedImages = [];

    for (let i = 0; i < numberOfPieces; i++) {
      // Calculate the starting position for each piece
      const startX = i * pieceWidth;

      // Crop the piece
      ctx!.drawImage(img, startX, 0, pieceWidth, img.height, 0, 0, pieceWidth, img.height);
      const croppedPiece = canvas.toDataURL();

      // Push the cropped piece into the array
      croppedImages.push(croppedPiece);

      // Clear the canvas for the next iteration
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
    }

    // Call the callback function with cropped images
    handleCroppedImages(croppedImages);
  };
};
