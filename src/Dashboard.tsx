import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

  const [divs, setDivs] = useState<number>(2);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (image || croppedImages.length > 0) {
      const handleEsc = (event: KeyboardEvent) => {
        if (event.keyCode === 27) {
          setImage(null);
          setCroppedImages([]);
          if (inputRef.current) {
            inputRef.current.value = ""; // Clear the file input
          }
        }
      };
      window.addEventListener("keydown", handleEsc);
      return () => {
        window.removeEventListener("keydown", handleEsc);
      };
    }
  }, [image, croppedImages, inputRef]);

  const onCrop = useCallback(() => {
    setIsLoading(true);
    if (cropperRef.current) {
      setCoordinates(cropperRef.current.getCoordinates());
      const croppedImageDataUrl = cropperRef.current.getCanvas()?.toDataURL();
      setResult(croppedImageDataUrl);
      cropImage(croppedImageDataUrl, divs, (croppedImages) => {
        setCroppedImages(croppedImages);
        setIsLoading(false);
      });
    }
  }, [divs]);

  const [selectedSize, setSelectedSize] = useState<string>("one");

  const handleSizeChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSelectedSize(event.target.value);
    },
    []
  );

  const selectedSizeValue = useMemo(() => {
    const sizes: { [key: string]: { h: number; w: number } } = {
      one: { h: 1350, w: 1080 },
      two: { h: 1080, w: 1080 },
      three: { h: 566, w: 1080 },
    };
    return sizes[selectedSize];
  }, [selectedSize]);

  const handleImageChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result;
        setImage(result);
      };
      reader.readAsDataURL(file);
    },
    []
  );

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.trim(); // Trim to remove leading and trailing whitespace
    if (
      value !== "" &&
      !isNaN(Number(value)) &&
      Number(value) !== 0 &&
      Number(value) >= 2 &&
      Number(value) <= 10
    ) {
      setDivs(Number(value));
    } else {
      // Show an error message or set to a default value
      // For example:
      setDivs(2); // Set to a default value within the range
      // Or show an error message to the user
      // alert("Please enter a number between 2 and 10.");
    }
  }, [divs]);

  return (
    <>
      {/* Loader */}
      {isLoading && <Loader />}

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
              <span className="font-noto text-zinc-200">
                Now Select The Ratio
              </span>
            ) : (
              <span className="font-noto text-gray-400">Select Your Pic</span>
            )}
          </label>
          <input
            disabled={image ? true : false}
            ref={inputRef}
            id="fileInput"
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </div>
      </div>

        {/* this is input component for number of pieces we have */}
          <div className="flex items-center justify-center p-4">
        <input
          ref={inputRef}
          className="w-[20rem] placeholder:text-[12px] border-2 border-gray-300 rounded-lg p-4 bg-gray-900 text-sm text-center focus:bg-gray-900 focus:text-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-500"
          type="number"
          name=""
          id=""
          min="2"
          max="10"
          placeholder="Enter number of pieces to crop from 2 to 10"
          onChange={handleInputChange}
        />
      </div>

      {/* this is select ratio component */}
      <div className="transition flex justify-center">
        {image && (
          <SizeSelector
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
          />
        )}
      </div>


      {/* this is crop button component */}
      <div className=" transition flex justify-center my-4">
        {image && <CustomButton text="Crop" onCrop={onCrop} />}
      </div>

      {/* this is preview and download component */}
      <div className="grid grid-cols-2">
        <div className="flex flex-col items-end">
          {croppedImages.map((croppedImage, index) => (
            <div key={index} className="flex flex-col w-32 m-2">
              <div className="font-noto text-white text-center text-[12px]">preview {index+1}</div>
              <img src={croppedImage} alt={`cropped-${index}`} />
            </div>
          ))}
        </div>
        <DownloadAllButton croppedImages={croppedImages} />
      </div>
      {console.log(croppedImages)}
      <div className="flex justify-center">
        <FixedCropper
          className="w-[90vw]"
          ref={cropperRef}
          src={image}
          stencilSize={{
            width: (selectedSizeValue as { w: number }).w * divs,
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
