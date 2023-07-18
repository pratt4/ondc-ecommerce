import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AddToCartButton from "../../../components/AddToCartButton";
import { useStore } from "../../../store";
import { processPrice } from "../../../utils";

function ProductCard({ imageUrl, productId, title, price }) {
  const { storeId, productId: selectedProductId } = useParams();
  const navigate = useNavigate();
  const { qty, storeImageUrl, updateSelectedCart } = useStore((state) => ({
    qty: state.allCarts?.[storeId]?.[productId]?.["selectedQty"] || 0,
    storeImageUrl: state.selectedStore.store?.business_data?.symbol || null,
    updateSelectedCart: (storeId, productId, productData) =>
      state.updateSelectedCart(storeId, productId, productData),
  }));

  return (
    <div
      onClick={() => navigate(productId)}
      className={`flex flex-col gap-6 p-3 w-[225px] border-2 rounded-2xl justify-between cursor-pointer hover:border-x-green-600 transition-all ease-in-out ${
        selectedProductId === productId &&
        "border-yellow-500 dark:bg-slate-700 border-dashed bg-yellow-100"
      }`}
    >
      <img src={imageUrl} className="p-3 rounded-3xl" />
      <div
      >
        <p className="font-bold">{title}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">{processPrice(price)}</p>
        <AddToCartButton
          qtyUpdater={(updatedQty) =>
            updateSelectedCart(storeId, productId, {
              storeId: storeId,
              storeName: storeId,
              storeImageUrl: storeImageUrl,
              productName: title,
              productId: productId,
              productImageUrl: imageUrl,
              productPrice: price,
              selectedQty: updatedQty,
            })
          }
          qty={qty}
        />
      </div>
    </div>
  );
}

export default ProductCard;
