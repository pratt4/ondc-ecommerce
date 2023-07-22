import React from "react";
import { useStore } from "../../store";
import CartCard from "./components/CartCard";
import { Link } from "react-router-dom";

function CartsGrid() {
  const { allCarts, removeSelectedCart } = useStore((state) => ({
    allCarts: state.allCarts,
    removeSelectedCart: (storeId) => state.removeSelectedCart(storeId),
  }));
  return (
    <>
      <p className="text-2xl my-5">Carts</p>
      <div className="flex flex-col justify-start items-stretch flex-wrap lg:flex-row gap-5 bg-slate-300 dark:bg-gray-900 h-full my-5 p-6 lg:p-20 rounded-xl transition-all ease-in-out">
        {Object.entries(allCarts).length ? (
          Object.entries(allCarts).map((storeData) => (
            <CartCard
              key={storeData[0]}
              storeData={storeData[1]}
              removeSelectedCart={() => removeSelectedCart(storeData[0])}
            />
          ))
        ) : (
          <div className="mx-auto">
            <p className="text-center text-xl my-4">
              No cart created yet, please shop around !{" "}
            </p>
            <Link to={"/"} className="px-3 py-2 border-4 border-dashed border-white hover:bg-white">Go</Link>
          </div>
        )}
      </div>
          
    </>
  );
}

export default CartsGrid;
