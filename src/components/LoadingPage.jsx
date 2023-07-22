import React from "react";

function LoadingPage({ position = "absolute" }) {
  return (
    <div
      className={`${position} right-1/2 bottom-1/2  transform translate-x-1/2 translate-y-1/2`}
    >
      <div className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-4 h-10 w-10"></div>
    </div>
  );
}

export default LoadingPage;
