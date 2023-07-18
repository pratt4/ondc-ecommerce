import React, { useState } from "react";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useStore } from "../../store";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { nanoid } from "nanoid";
import { openInNewTab, processPrice } from "../../utils";
import AddressSection from "./components/AddressSection";
import { DUMMY_ADDRESS } from "../../consts";

function PlaceOrder() {
  const [showItems, setShowItems] = useState(false);
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { selectedCartData, ondcCartData, placeOrder } = useStore((state) => ({
    selectedCartData: state.allCarts?.[storeId] || {},
    ondcCartData: state.ondcCarts?.[storeId] || {},
    placeOrder: (orderDetails) => state.placeOrder(storeId, orderDetails),
  }));

  if (!storeId || !ondcCartData.synced) {
    // return to homepage if cart is not synced
    return <Navigate to="/" replace />;
  }


  const orderTotal = Object.values(selectedCartData).reduce(
    (acc, curr) => acc + curr.productPrice * curr.selectedQty,
    0
  );

  return (
    <div className=" flex gap-10 flex-col md:flex-row text-left">
      <div className="w-full md:w-1/2 text-left">
        <p className=" text-2xl font-extrabold my-5">Address details</p>
        <input
          checked
          disabled
          className=" w-fit mr-2"
          type="checkbox"
          name="checkbox"
          id="checkbox_id"
        />
        <label htmlFor="checkbox_id">
          My billing and shipping address are the same
        </label>
        <div className="my-2">
          <AddressSection {...DUMMY_ADDRESS} />
        </div>
        <div className="my-10">
          <input
            checked
            disabled
            className=" w-fit mr-2"
            type="radio"
            name="radio2"
            id="radio_id2"
          />
          <label htmlFor="radio_id2">Residential Address</label>
          <p className=" p-2 bg-gray-100 text-sm dark:text-gray-400 dark:bg-gray-700">
            Order will be delivered to the selected residential address
          </p>
        </div>
      </div>
      <div className=" w-full md:w-1/2 text-left">
        <p className=" text-2xl font-extrabold my-5">Order Summary</p>
        <div className="flex flex-col gap-3">
          {ondcCartData?.orderDetails?.invoice_url ? <div>
            <div className="flex justify-between">
              <p className=" font-semibold text-lg">Order #</p>
              <p>{ondcCartData?.orderDetails?.order_id}</p>
            </div>
            <div className="flex justify-between">
              <p className=" font-semibold text-lg">Transaction #</p>
              <p>{ondcCartData?.orderDetails?.transaction_id}</p>
            </div>
          </div> : null}
          <div
            onClick={() => setShowItems(!showItems)}
            className="flex justify-between text-lg items-center font-light cursor-pointer py-1"
          >
            <p>
              {ondcCartData?.orderDetails?.invoice_url
                ? `Ordered item/s (${Object.values(selectedCartData).length})`
                : `${Object.values(selectedCartData).length} Item/s in Cart`}
            </p>
            <p>
              {showItems ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </p>
          </div>
          {showItems ? (
            <div className=" bg-slate-50 mx-1 p-2 max-h-80 overflow-scroll">
              {Object.values(selectedCartData).map((productData) => (
                <div key={productData.productId}>
                  <div className="flex justify-between items-center text-sm">
                    <div className="flex items-center gap-4">
                      <img
                        className=" w-16 rounded-xl max-h-16"
                        src={productData.productImageUrl}
                        alt="product image"
                      />
                      <div>
                        <p>{productData.productName}</p>
                        <p>Qty : {productData.selectedQty}</p>
                      </div>
                    </div>
                    <p>
                      {processPrice(productData.productPrice * productData.selectedQty)}
                    </p>
                  </div>
                  <hr className="my-1" />
                </div>
              ))}
            </div>
          ) : null}
          <div className="flex justify-between">
            <p>
              {ondcCartData?.orderDetails?.invoice_url
                ? "Item/s Subtotal"
                : "Cart Subtotal"}
            </p>
            <p>{processPrice(orderTotal)}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>FREE</p>
          </div>
          <hr />
          <div className="flex justify-between text-xl font-bold">
            <p>Order Total</p>
            <p>{processPrice(orderTotal)}</p>
          </div>
          <div className="my-5">
            <input
              checked
              disabled
              className=" w-fit mr-2"
              type="radio"
              name="radio"
              id="radio_id"
            />
            <label htmlFor="radio_id">Cash on delivery</label>
            <p className=" p-2 bg-gray-100 text-sm dark:text-gray-400 dark:bg-gray-700">
              Pay with cash upon delivery
            </p>
          </div>
          <button
            disabled={ondcCartData?.placingOrder}
            onClick={() => {
              if (ondcCartData?.orderDetails?.invoice_url) {
                openInNewTab(ondcCartData.orderDetails.invoice_url);
              } else {
                placeOrder({
                  cartId: ondcCartData["cartId"],
                  orderId: nanoid(),
                  transactionId: nanoid(),
                  orderTotal,
                });
              }
            }}
            className={`my-3 py-3 px-5 bg-blue-600 text-white text-xl font-bold hover:bg-blue-700 disabled:cursor-not-allowed ${
              ondcCartData?.orderDetails?.invoice_url &&
              "hover:bg-green-700 bg-green-500 dark:bg-green-600"
            }`}
          >
            <p className="flex gap-2 items-center justify-center">
              {ondcCartData?.placingOrder ? (
                <span className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-2 h-6 w-6"></span>
              ) : null}
              {ondcCartData?.orderDetails?.invoice_url
                ? "View order"
                : "Place order"}
            </p>
          </button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
