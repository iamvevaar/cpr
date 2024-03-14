import { useRef, useState } from "react";
import { Coordinates } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { FixedCropper, ImageRestriction } from "react-advanced-cropper";
import { cropImage } from "./utility/cropImage";
import SizeSelector from "./components/SizeSelector";
// import "./dashboard.css";

export const Dashboard = () => {
  const [image] = useState("../src/assets/jod.png");
  const cropperRef = useRef<any>(null);

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

  const [one] = useState<object>({ h: 1350, w: 2160 });
  const [two] = useState<object>({ h: 1080, w: 2160 });
  const [three] = useState<object>({ h: 566, w: 2160 });
  const [selectedSize, setSelectedSize] = useState<string>("one");

  const handleSizeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSize(event.target.value);
  };

  const selectedSizeValue =
    selectedSize === "one" ? one : selectedSize === "two" ? two : three;

  return (
    <>
      <SizeSelector
        selectedSize={selectedSize}
        handleSizeChange={handleSizeChange}
      />

      <button onClick={onCrop}>CROP</button>
      {croppedImages.map((croppedImage, index) => (
        <div key={index}>
          <img src={croppedImage} alt={`cropped-${index}`} />
        </div>
      ))}
      


      <FixedCropper
        className="w-[40vw]"     
        ref={cropperRef}
        src={image}
        stencilSize={{
          width: (selectedSizeValue as { w: number }).w,
          height: (selectedSizeValue as { h: number }).h,
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
