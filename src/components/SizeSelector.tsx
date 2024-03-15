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
    { id: "one", value: "one", label: "Ratio One", component: <One /> },
    { id: "two", value: "two", label: "Ratio Two", component: <Two /> },
    { id: "three", value: "three", label: "Ratio Three", component: <Three /> },
  ];

  return (
    <>
      <div className="flex flex-col md:w-[40vw] w-[90vw] border-dashed border-2 overflow-hidden p-4 bg-slate-900 border-blue-500 sm:border-blue-500">
        <div className="flex justify-between mb-4">
          {sizes.map((size) => (
            <div key={size.id} className="flex items-center">
              <input
                type="radio"
                id={size.id}
                name="size"
                value={size.value}
                checked={selectedSize === size.value}
                onChange={handleSizeChange}
                className="appearance-none border-2 border-gray-400 rounded-full w-3 h-3 checked:bg-blue-500 checked:border-transparent focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
              <label className="text-white px-2" htmlFor={size.id}>
                {size.label}
              </label>
            </div>
          ))}
        </div>
        <div className="flex w-auto h-40 gap-2 justify-center">
          {sizes.find((size) => selectedSize === size.value)?.component}
        </div>
      </div>
    </>
  );
};

export default SizeSelector;
