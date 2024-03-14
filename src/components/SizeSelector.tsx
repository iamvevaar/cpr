import React from "react";

interface SizeSelectorProps {
  selectedSize: string;
  handleSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, handleSizeChange }) => {
  // Define an array of sizes
  const sizes = [
    { id: "one", value: "one", label: "Size One" },
    { id: "two", value: "two", label: "Size Two" },
    { id: "three", value: "three", label: "Size Three" }
  ];

  return (
    <>
    <div className="flex w-max border-dashed border-2 p-4 bg-slate-900 border-blue-500">

      {sizes.map((size) => (
        <div key={size.id} className="flex  items-center" >
          <input
            type="radio"
            id={size.id}
            name="size"
            value={size.value}
            checked={selectedSize === size.value}
            onChange={handleSizeChange}
            />
          <label className="text-white px-2 " htmlFor={size.id}>{size.label}</label>
        </div>
      ))}
      </div>
    </>
  );
};

export default SizeSelector;
