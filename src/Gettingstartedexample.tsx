import { useRef, useState } from "react";
import { CropperRef , Coordinates} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { FixedCropper, ImageRestriction } from "react-advanced-cropper";
import { cropImage } from "./utility/cropImage";



export const Gettingstartedexample = () => {
  const [image] = useState(
    "../src/assets/god.png"
  );
  const cropperRef = useRef<CropperRef>(null);

  const [, setCoordinates] = useState<Coordinates | null>(null);

  const [, setResult] = useState<string>();

  const [croppedImages, setCroppedImages] = useState<string[]>([]);

  const onCrop = () => {
    if (cropperRef.current) {
      setCoordinates(cropperRef.current.getCoordinates());
      const croppedImageDataUrl = cropperRef.current.getCanvas()?.toDataURL();
      setResult(croppedImageDataUrl);
      // Call the cropImage function with the cropped image data URL and handleCroppedImages callback
      cropImage(croppedImageDataUrl, (croppedImages) => {
        setCroppedImages(croppedImages);
      });
    }
  };
  

  return (
    <>
    
      <button onClick={onCrop}>CROP</button>
      {croppedImages.map((croppedImage, index) => (
        <div key={index}>
          <img src={croppedImage} alt={`cropped-${index}`} />
        </div>
      ))}      

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
