import React from "react";

interface DownloadAllButtonProps {
  croppedImages: string[]; // Assuming croppedImages is an array of image URLs
}

const DownloadAllButton: React.FC<DownloadAllButtonProps> = ({ croppedImages }) => {
  const handleDownload = (croppedImage: string, index: number) => {
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = `vevaar_${index+1}.jpg`;
    link.click();
  };

  return (
    <div className="grid grid-cols-1 items-center">
      {croppedImages.map((croppedImage, index) => (
        <button
          key={index}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2 w-32 h-[64px]"
          onClick={() => handleDownload(croppedImage, index)}
        >
          Download Image {index + 1}
        </button>
      ))}
    </div>
  );
};

export default DownloadAllButton;
