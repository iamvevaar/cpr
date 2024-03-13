import { useEffect, useRef, useState } from "react";
import { CropperRef, Cropper , Coordinates } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { FixedCropper, ImageRestriction } from "react-advanced-cropper";


interface ImageCropperProps {
  image: string;
}

const ImageCropper: React.FC<ImageCropperProps> = ({ image }) => {
  const [croppedImages, setCroppedImages] = useState<string[]>([]);

  const cropImage = () => {
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

      // Set cropped images
      setCroppedImages([leftHalf, rightHalf]);
    };
  };

  return (
    <div>
      <button onClick={cropImage}>Crop Image</button>
      {croppedImages.map((croppedImage, index) => (
       <div key={index} style={{ gap: '10px' , display:"flex" , flexDirection:"row" }}>
       <img src={croppedImage} alt={`Cropped Image ${index + 1}`} />
     </div>
      ))}
    </div>
  );
};


export const Gettingstartedexample = () => {
  const [image] = useState(
    "../src/assets/god.png"
  );
  const cropperRef = useRef<CropperRef>(null);

  const [coordinates, setCoordinates] = useState<Coordinates | null>(null);

  const [result, setResult] = useState<string>();

  // const onChange = (cropper: CropperRef) => {
  //   console.log(cropper.getCoordinates(), cropper.getCanvas());
  // };

  const onCrop = () => {
    if (cropperRef.current) {
      setCoordinates(cropperRef.current.getCoordinates());
      // You are able to do different manipulations at a canvas
      // but there we just get a cropped image, that can be used
      // as src for <img/> to preview result
      setResult(cropperRef.current.getCanvas()?.toDataURL());
    }
  };

//   const aspectRatio = 1; // Change this to your desired aspect ratio
//   const imageUrl = {result};
  return (
    <>
    <ImageCropper image={result} />
      <button onClick={onCrop}>CROP</button>
      {result && <img src={result} alt="cropped" />}

      <FixedCropper
        ref={cropperRef}
        src={image}
        stencilSize={{
          width: 852,
          height: 532,
        }}
        stencilProps={{
          handlers: false,
          lines: true,
          movable: false,
          resizable: false,
        }}
        imageRestriction={ImageRestriction.stencil}
      />
    </>
  );
};
