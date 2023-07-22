import React from "react";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { PRIMARY } from "../consts";

function AddToCartButton({ qtyUpdater, qty, variant = PRIMARY }) {
  if (qty === 0) {
    if (variant != PRIMARY) {
      return null;
    }
    return (
      <button
        className="py-2 bg-green-50 dark:bg-green-500 dark:text-black"
        onClick={(e) => {
          e.stopPropagation();
          qtyUpdater(1);
        }}
      >
        Add
      </button>
    );
  }
  return (
    <div className="flex gap-3 items-center bg-green-100 dark:bg-green-400 rounded-xl cursor-default my-[6px] h-fit dark:text-black">
      <button
        className="pt-0 rounded-full bg-green-200 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-600  hover:scale-105 hover:border-transparent p-[2px]"
        onClick={(e) => {
          e.stopPropagation();
          if (qty > 0) {
            qtyUpdater(qty - 1);
          }
        }}
      >
        <RemoveCircleOutlineIcon className="" />
      </button>
      <p className=" font-medium w-2">{qty}</p>
      <button
        className="pt-0 rounded-full bg-green-200 hover:bg-green-300 dark:bg-green-500 dark:hover:bg-green-600 hover:scale-105 hover:border-transparent p-[2px] "
        onClick={(e) => {
          e.stopPropagation();
          if (qty < 5) {
            qtyUpdater(qty + 1);
          }
        }}
      >
        <AddCircleOutlineIcon />
      </button>
    </div>
  );
}

export default AddToCartButton;
