import React, { useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useStore } from "../../store";
import LoadingPage from "../../components/LoadingPage";
import { SECONDARY, TRUE } from "../../consts";
import CloseIcon from "@mui/icons-material/Close";
import AddToCartButton from "../../components/AddToCartButton";
import { processPrice } from "../../utils";

function SelectedProduct() {
  const { storeId, productId } = useParams();
  const navigate = useNavigate();
  const { loading, data, qty, fetchSelectedProduct, updateSelectedCart } =
    useStore((state) => ({
      loading: state.selectedProduct.loading,
      data: state.selectedProduct.data,
      qty: state.allCarts?.[storeId]?.[productId]?.["selectedQty"] || 0,
      fetchSelectedProduct: (storeId, productId) =>
        state.fetchSelectedProduct(storeId, productId),
      updateSelectedCart: (storeId, productId, productData) =>
        state.updateSelectedCart(storeId, productId, productData),
    }));
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchSelectedProduct(storeId, productId);
  }, [productId]);

  return (
    <div className="relative min-h-[300px] bg-yellow-50 dark:bg-gray-700 rounded-xl">
      <Link
        to=".."
        relative="path"
        className="absolute right-2 top-2 hover:bg-blue-100 bg-blue-50 rounded-full p-2"
      >
        <CloseIcon color="primary" />
      </Link>

      {loading ? (
        <LoadingPage />
      ) : (
        <div className="flex flex-col lg:flex-row gap-5 p-3 pt-7 text-left">
          <img
            src={data?.item_symbol}
            className="rounded-xl max-h-[50vh] max-w-[500px]"
          />
          <div className="flex flex-col items-start flex-1">
            <p className="text-xl font-semibold">{data?.item_name}</p>
            <p className="text-xs">From {storeId}</p>
            <div className="flex justify-between w-full">
              <p className="text-2xl my-3 font-bold">
                {processPrice(data?.price)}
              </p>
              <AddToCartButton
                variant={SECONDARY}
                qtyUpdater={(updatedQty) =>
                  updateSelectedCart(storeId, productId, {
                    storeId: data?.storeId,
                    storeName: data?.storeName,
                    storeImageUrl: data?.storeImageUrl,
                    productId: productId,
                    productName: data?.item_name,
                    productImageUrl: data?.item_symbol,
                    productPrice: data?.price,
                    bppUri: data?.bpp_uri,
                    bppId: data?.bpp_id,
                    businessId: data?.business_id,
                    locationId: data?.location_id,
                    selectedQty: updatedQty,
                  })
                }
                qty={qty}
              />
            </div>
            <p className="font-medium">Details -</p>
            <p className="font-light text-left">{data?.short_desc}</p>
            <div className="my-5 flex gap-3 justify-start flex-wrap w-[100%]">
              <div className=" bg-lime-200 dark:bg-slate-900 p-5 rounded-xl ">
                <p className=" font-semibold">Return Window</p>
                <p>
                  {data?.return_window
                    ? `${data?.return_window} minutes`
                    : "N/A"}
                </p>
              </div>
              <div className=" bg-lime-200 dark:bg-slate-900 p-5 rounded-xl ">
                <p className=" font-semibold">Time to Ship</p>
                <p>{data?.time_to_ship}</p>
              </div>
              <div className=" bg-lime-200 dark:bg-slate-900 p-5 rounded-xl ">
                <p className=" font-semibold">Returnable</p>
                <p>{data?.returnable ? "Yes" : "No"}</p>
              </div>
              <div className=" bg-lime-200 dark:bg-slate-900 p-5 rounded-xl ">
                <p className=" font-semibold">Cancellable</p>
                <p>{data?.cancellable ? "Yes" : "No"}</p>
              </div>
              <div className=" bg-lime-200 dark:bg-slate-900 p-5 rounded-xl max-w-[50vw] ">
                <p className=" font-semibold">Product Id</p>
                <p>{data?.item_id}</p>
              </div>
              <div className=" bg-lime-200 dark:bg-slate-900 p-5 rounded-xl ">
                <p className=" font-semibold">Cash on delivery</p>
                <p>{data?.cod_available ? "Yes" : "No"}</p>
              </div>
            </div>
            <button
              className={`bg-green-300 mt-auto self-stretch font-medium  dark:bg-green-600 dark:text-black ${
                qty && "bg-yellow-300 dark:bg-yellow-600"
              }`}
              onClick={() => {
                if (!qty) {
                  updateSelectedCart(storeId, productId, {
                    storeId: data?.storeId,
                    storeName: data?.storeName,
                    storeImageUrl: data?.storeImageUrl,
                    productId: productId,
                    productName: data?.item_name,
                    productImageUrl: data?.item_symbol,
                    productPrice: data?.price,
                    bppUri: data?.bpp_uri,
                    bppId: data?.bpp_id,
                    businessId: data?.business_id,
                    locationId: data?.location_id,
                    selectedQty: 1,
                  });
                } else {
                  navigate(`/all-carts/${storeId}`);
                }
              }}
            >
              {qty ? "View cart" : "Add"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default SelectedProduct;
