import React from "react";
import { nanoid } from "nanoid";
import AddToCartButton from "../../../components/AddToCartButton";
import { useStore } from "../../../store";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ALL_CATEGORIES, PLACE_ORDER, SECONDARY } from "../../../consts";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { processPrice } from "../../../utils";

function SelectedCart() {
  const { storeId } = useParams();
  const navigate = useNavigate();
  const { selectedCartData, ondcCarts, updateSelectedCart, addToOndcCart } =
    useStore((state) => ({
      selectedCartData: state.allCarts?.[storeId] || {},
      ondcCarts: state.ondcCarts,
      updateSelectedCart: (productId, productData) =>
        state.updateSelectedCart(storeId, productId, productData),
      addToOndcCart: (cartDetails) => state.addToOndcCart(cartDetails),
    }));
  //   const cartData = [
  //     {
  //       storeId: "MARKETPLACE SELLER1",
  //       storeName: "MARKETPLACE SELLER1",
  //       storeImageUrl:
  //         "https://gf-ig-integration-qa-c0nn3c7.s3.amazonaws.com/images/5466/5466-1-shop-img?time=1678682717518?time=1678696397171?time=1678794412563?time=1678796477029?time=1678804551667?time=1678808154262?time=1678949624589?time=1678949680392?time=1678959844395?time=1678961251414?time=1679289474392?time=1679292823579?time=1679293109363?time=1679301843545?time=1679482176587?time=1679633721317?time=1680703019165",
  //       productName: "Tomato",
  //       productImageUrl:
  //         "https://gf-ig-integration-qa-c0nn3c7.s3.amazonaws.com/images/5466/5466_ONDC_67_1680674332230.jpeg",
  //       productPrice: 5000,
  //       selectedQty: 2,
  //     },
  //   ];
  return (
    <div className="min-w-[700px] overflow-x-scroll">
      <div className="flex my-6 text-lg  justify-between">
        <div className="flex gap-2 items-center">
          {Object.values(selectedCartData).length ? (
            <img
              className="h-10 rounded-xl"
              src={Object.values(selectedCartData)[0].storeImageUrl}
            />
          ) : null}
          <p className="">{storeId}</p>
        </div>
        <p className="">{`Your Cart (${
          Object.values(selectedCartData).length
        } items)`}</p>
        <p
          className="cursor-pointer text-blue-600 font-bold"
          onClick={() => navigate(`/${ALL_CATEGORIES}/${storeId}`)}
        >
          + Add more items
        </p>
      </div>
      {Object.values(selectedCartData).length ? (
        <>
          <table>
            <thead>
              <tr className="bg-slate-100 dark:bg-slate-700">
                <th className="p-4 w-[300px] rounded-tl-xl">Product</th>
                <th className="p-4 w-[300px]">Price</th>
                <th className="p-4 w-[300px]">Quantity</th>
                <th className="p-4 w-[300px] rounded-tr-xl">Total</th>
              </tr>
            </thead>
            <tbody>
              {Object.values(selectedCartData).map((productData) => (
                <tr
                  key={productData.productId}
                  className=" border-b-slate-50 border-b-2 dark:border-b-slate-800"
                >
                  <td
                    className="flex gap-4 py-2 items-center text-left hover:text-blue-600 cursor-pointer"
                    onClick={() =>
                      navigate(
                        `/${ALL_CATEGORIES}/${storeId}/${productData.productId}`
                      )
                    }
                  >
                    <img
                      className="w-20 rounded-xl max-h-32"
                      src={productData.productImageUrl}
                      alt="product image"
                    />
                    <p>{productData.productName}</p>
                  </td>
                  <td>
                    <p>{processPrice(productData.productPrice)}</p>
                  </td>
                  <td className="py-2">
                    <div className="w-fit mx-auto">
                      <AddToCartButton
                        variant={SECONDARY}
                        qtyUpdater={(updatedQty) =>
                          updateSelectedCart(productData.productId, {
                            ...productData,
                            selectedQty: updatedQty,
                          })
                        }
                        qty={productData.selectedQty}
                      />
                    </div>
                  </td>
                  <td className="py-2">
                    <p>
                      {processPrice(productData.productPrice * productData.selectedQty)}
                    </p>
                  </td>
                </tr>
              ))}
              <tr className="font-bold">
                <td></td>
                <td></td>
                <td className="py-6 ">Grand Total :</td>
                <td className="py-6 border-4 border-dashed text-2xl">
                  {processPrice(
                    Object.values(selectedCartData).reduce(
                      (acc, curr) => acc + curr.productPrice * curr.selectedQty,
                      0
                    )
                  )}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="m-4 text-center">
            <button
              disabled={ondcCarts[storeId]?.saving}
              onClick={() => {
                if (ondcCarts[storeId].synced) {
                  navigate(PLACE_ORDER);
                } else {
                  const itemsArray = Object.values(selectedCartData);
                  const processedItems = itemsArray.map((productData) => ({
                    id: productData.productId,
                    quantity: productData.selectedQty,
                    location_id: productData.locationId,
                  }));
                  const businessLocationIds = [
                    ...new Set(processedItems.map((e) => e.location_id)),
                  ];
                  addToOndcCart({
                    cart_id: nanoid(),
                    bpp_uri: itemsArray[0].bppUri,
                    bpp_id: itemsArray[0].bppId,
                    business_id: itemsArray[0].businessId,
                    business_location_ids: businessLocationIds,
                    items: processedItems,
                    storeId: storeId,
                  });
                }
              }}
              className="py-3 px-5 bg-blue-600 text-white text-xl font-bold hover:bg-blue-700 disabled:cursor-not-allowed"
            >
              <p className="flex gap-2 items-center">
                {ondcCarts[storeId]?.saving ? (
                  <span className="border-t-transparent border-solid animate-spin  rounded-full border-blue-400 border-2 h-6 w-6"></span>
                ) : (
                  <ArrowForwardIcon />
                )}{" "}
                {ondcCarts[storeId]?.synced ? "Next" : "Confirm Cart"}
              </p>
            </button>
          </div>
        </>
      ) : (
        <div className="my-32">
          <p className="text-center text-xl my-4">
            So empty here, please shop around !{" "}
          </p>
          <Link
            to={"/"}
            className="px-3 py-2 text-xl border-4 border-dashed border-blue-600 hover:bg-white hover:border-white transition-all ease-in-out"
          >
            Go
          </Link>
        </div>
      )}
    </div>
  );
}

export default SelectedCart;
