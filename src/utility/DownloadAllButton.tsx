import React from "react";

interface DownloadAllButtonProps {
  croppedImages: string[]; // Assuming croppedImages is an array of image URLs
}

const DownloadAllButton: React.FC<DownloadAllButtonProps> = ({ croppedImages }) => {
  const handleDownload = (croppedImage: string, index: number) => {
    // Create a temporary anchor element
    const link = document.createElement("a");
    link.href = croppedImage;
    link.download = `cropped_${index}.png`;
    
    // Trigger a click event to start the download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
        <div className="flex justify-center">
          {croppedImages.map((croppedImage, index) => (
                <button key={index} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded m-2" onClick={() => handleDownload(croppedImage, index)}>
                  Download Image {index + 1}
                </button>
              ))}
            </div>
          );
        };
        
        export default DownloadAllButton;
        