import React from "react";
import One from "../svg/one";
import Two from "../svg/two";
import Three from "../svg/three";

interface SizeSelectorProps {
  selectedSize: string;
  handleSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({
  selectedSize,
  handleSizeChange,
}) => {
  // Define an array of sizes
  const sizes = [
    { id: "one", value: "one", label: "Size One" },
    { id: "two", value: "two", label: "Size Two" },
    { id: "three", value: "three", label: "Size Three" },
  ];

  return (
    <>

        <div className="flex flex-col w-[40vw] border-dashed border-2 p-4 bg-slate-900 border-blue-500">
          <div className="flex ">

          {sizes.map((size) => (
            <div key={size.id} className="flex  items-center">
              <input
                type="radio"
                id={size.id}
                name="size"
                value={size.value}
                checked={selectedSize === size.value}
                onChange={handleSizeChange}
                />
              <label className="text-white px-2 " htmlFor={size.id}>
                {size.label}
              </label>
            </div>
          ))}

          </div>
          <div className="flex w-auto gap-2">
            <One />
            <Two />
            <Three />
          </div>
        </div>
   
    </>
  );
};

export default SizeSelector;
