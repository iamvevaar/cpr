import { useRef, useState } from "react";
import { Coordinates } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { FixedCropper, ImageRestriction } from "react-advanced-cropper";
import { cropImage } from "./utility/cropImage";
import SizeSelector from "./components/SizeSelector";
import DownloadAllButton from "./utility/DownloadAllButton";
import CustomButton from "./components/CustomButton";


const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-b-white"></div>
    </div>
  );
};

export const Dashboard = () => {
  const [image, setImage] = useState<any>(null);
  const cropperRef = useRef<any>(null);

  const [, setCoordinates] = useState<Coordinates | null>(null);

  const [, setResult] = useState<string>();

  const [croppedImages, setCroppedImages] = useState<string[]>([]);

  const [isLoading, setIsLoading] = useState<boolean>(false); // New state variable for loader


  const onCrop = () => {
    setIsLoading(true); // Show loader when crop button is clicked
    if (cropperRef.current) {
      setCoordinates(cropperRef.current.getCoordinates());
      const croppedImageDataUrl = cropperRef.current.getCanvas()?.toDataURL();
      setResult(croppedImageDataUrl);
      // Call the cropImage function with the cropped image data URL and handleCroppedImages callback
      cropImage(croppedImageDataUrl, (croppedImages) => {
        setCroppedImages(croppedImages);
        setIsLoading(false); // Hide loader when cropping is done
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      setImage(result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* Loader */}
      {isLoading && <Loader />}
      {/* <input type="file" accept="image/*" onChange={handleImageChange} />
       */}

      {/* this is file uploader component */}
      <div className="flex items-center justify-center p-4">
        <div
          className={`w-64 bg-slate-900 p-4 rounded border-dashed border-2 ${
            image ? "border-blue-500" : "border-gray-300"
          } flex flex-col items-center justify-center`}
        >
          <label htmlFor="fileInput" className="cursor-pointer">
            <svg
              className="w-full h-12 text-gray-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            {image ? (
              <span className="text-zinc-200">Now Select The Ratio</span>
            ) : (
              <span className="text-gray-400">Select Your Pic</span>
            )}
          </label>
          <input
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {/* this is select ratio component */}
      <div className="transition flex justify-center">
        {image &&(
          <SizeSelector
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
          />
        )}
      </div>

      <div className=" transition flex justify-center my-4">
        {image && (
          <CustomButton text="Crop" onCrop={onCrop} />
        )}
      </div>
      <div className="flex justify-center">
        {croppedImages.map((croppedImage, index) => (
          <div key={index} className="inline-block w-32 m-2">
            <img src={croppedImage} alt={`cropped-${index}`} />
          </div>
        ))}
      </div>
      <DownloadAllButton croppedImages={croppedImages} />
      <div className="flex justify-center">
        <FixedCropper
          className="w-[90vw]"
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
        
      </div>
    </>
  );
};
