import React from "react";

interface SizeSelectorProps {
  selectedSize: string;
  handleSizeChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SizeSelector: React.FC<SizeSelectorProps> = ({ selectedSize, handleSizeChange }) => {
  return (
    <>
      <div>
        <input
          type="radio"
          id="one"
          name="size"
          value="one"
          checked={selectedSize === "one"}
          onChange={handleSizeChange}
        />
        <label htmlFor="one">Size One</label>
      </div>
      <div>
        <input
          type="radio"
          id="two"
          name="size"
          value="two"
          checked={selectedSize === "two"}
          onChange={handleSizeChange}
        />
        <label htmlFor="two">Size Two</label>
      </div>
      <div>
        <input
          type="radio"
          id="three"
          name="size"
          value="three"
          checked={selectedSize === "three"}
          onChange={handleSizeChange}
        />
        <label htmlFor="three">Size Three</label>
      </div>
    </>
  );
};

export default SizeSelector;
