import React from "react";
import { BiLoaderCircle } from "react-icons/bi";

const LoadingSpinner = () => {
  return (
    <div className="w-full h-dvh flex justify-center items-center">
      <BiLoaderCircle className="animate-spin" />
    </div>
  );
};

// Add display name
LoadingSpinner.displayName = "LoadingSpinner";

export default LoadingSpinner;
