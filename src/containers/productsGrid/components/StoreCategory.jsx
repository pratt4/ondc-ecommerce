import React from "react";

function StoreCategory({ isSelected, selectionHandler, categoryName }) {
  return (
    <div
      onClick={() => selectionHandler(categoryName)}
      className={` cursor-default p-2 text-black rounded-2xl transition-all ease-in-out ${
        isSelected ? "bg-green-300 dark:bg-lime-200" : "hover:bg-green-100 dark:hover:bg-lime-400 cursor-pointer bg-white dark:bg-lime-700"
      }`}
    >
      {categoryName}
    </div>
  );
}

export default StoreCategory;
