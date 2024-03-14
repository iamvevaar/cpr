import { useRef, useState } from "react";
import { Coordinates } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { FixedCropper, ImageRestriction } from "react-advanced-cropper";
import { cropImage } from "./utility/cropImage";
import SizeSelector from "./components/SizeSelector";
import DownloadAllButton from "./utility/DownloadAllButton";
// import "./dashboard.css";

export const Dashboard = () => {
  const [image, setImage] = useState<any>(null);
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
  const [selectedSize, setSelectedSize] = useState<string>("");

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
        {image && (
          <SizeSelector
            selectedSize={selectedSize}
            handleSizeChange={handleSizeChange}
          />
        )}
      </div>

      <div className=" transition flex justify-center my-4">
        {selectedSize && (
          <button
            onClick={onCrop}
            className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6  text-white inline-block"
          >
            <span className="absolute inset-0 overflow-hidden rounded-full">
              <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
            </span>
            <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-0.5 px-4 ring-1 ring-white/10 ">
              <span>CROP</span>
              <svg
                fill="none"
                height="16"
                viewBox="0 0 24 24"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.75 8.75L14.25 12L10.75 15.25"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
            <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
          </button>
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
      </div>
    </>
  );
};
