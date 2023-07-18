import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { Link, useNavigate } from "react-router-dom";
import { ALL_CATEGORIES } from "../../../consts";
import { processPrice } from "../../../utils";

const ITEMS_LIMIT_IN_CART_CARD = 2;
const PRODUCT_NAME_TRUNCATION_LIMIT = 55;

function CartCard({ storeData, removeSelectedCart }) {
  const navigate = useNavigate();
  const processedStoreData = Object.values(storeData);
  return (
    <div className="flex flex-col w-[384px] lg:w-[335px] bg-white dark:bg-slate-600 p-3 rounded-xl">
      <div className="flex h-12 items-center relative gap-2">
        <img
          className="h-12 max-w-[60px] rounded-xl"
          src={processedStoreData[0]?.storeImageUrl}
        />
        <div
          onClick={() =>
            navigate(`/${ALL_CATEGORIES}/${processedStoreData[0]?.storeId}`)
          }
          className="font-extrabold text-left cursor-pointer"
        >
          {processedStoreData[0]?.storeName}
        </div>
        <div
          onClick={() => removeSelectedCart()}
          className="self-center ml-auto p-1 hover:bg-red-100 dark:hover:bg-slate-900 rounded-full cursor-pointer"
        >
          <DeleteForeverIcon />
        </div>
      </div>
      <hr className="my-2" />
      <div className=" text-left my-4">
        <p className="font-bold my-2">
          Item(s) in cart: ({processedStoreData.length})
        </p>
        <div className="flex gap-2 items-center">
          <div className=" relative border-none border-red-400 max-w-[100px] min-w-[70px]">
            <div className="h-[50px]">
              {processedStoreData
                .filter((_, index) => index < ITEMS_LIMIT_IN_CART_CARD)
                .map((productData, index) => (
                  <img
                    key={productData.productImageUrl}
                    className={`absolute h-[50px] max-w-[50px] top-0 rounded-full border-2 border-slate-300 dark:border-gray-700`}
                    style={{ left: index * 20 }}
                    src={productData.productImageUrl}
                  />
                ))}

              {processedStoreData.length > ITEMS_LIMIT_IN_CART_CARD ? (
                <div className="absolute top-10 left-1 right-1 text-sm text-center bg-slate-600 dark:bg-slate-800 dark:bg-opacity-60 bg-opacity-20 rounded-xl ">
                  {`+${
                    processedStoreData.length - ITEMS_LIMIT_IN_CART_CARD
                  } item`}
                </div>
              ) : null}
            </div>
          </div>
          <div>
            {/* <p>cartData.productId.productName</p> */}
            <p className="font-regular text-sm">
              {processedStoreData.reduce((acc, curr, index, arr) => {
                let productName =
                  curr.productName.length > PRODUCT_NAME_TRUNCATION_LIMIT
                    ? curr.productName.slice(0, PRODUCT_NAME_TRUNCATION_LIMIT) +
                      ".."
                    : curr.productName;
                if (index < ITEMS_LIMIT_IN_CART_CARD) {
                  let limiter = ", ";
                  if (arr.length > ITEMS_LIMIT_IN_CART_CARD) {
                    if (index === ITEMS_LIMIT_IN_CART_CARD - 1) {
                      limiter = "";
                    }
                  } else if (index === arr.length - 1) {
                    limiter = "";
                  }
                  return acc + productName + limiter;
                } else if (index === ITEMS_LIMIT_IN_CART_CARD) {
                  return `${acc} and ${
                    arr.length - ITEMS_LIMIT_IN_CART_CARD
                  } more item(s)`;
                } else return acc;
              }, "")}
            </p>
          </div>
        </div>
      </div>
      <div className="flex my-2 justify-between items-center mt-auto">
        <p className="font-medium">
          Total:
          <span className="font-bold">
            {processPrice(
              processedStoreData.reduce((acc, curr) => {
                return acc + curr.productPrice * curr.selectedQty;
              }, 0)
            )}
          </span>
        </p>
        <button
          disabled={!processedStoreData[0]?.storeId}
          onClick={() => navigate(processedStoreData[0]?.storeId)}
          className="bg-green-100 dark:bg-slate-800"
        >
          View Cart
        </button>
      </div>
    </div>
  );
}

export default CartCard;
