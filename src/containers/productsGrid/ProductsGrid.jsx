import { useEffect, useMemo, useState } from "react";
import React from "react";
import { useStore } from "../../store";
import { Outlet, useParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import ProductCard from "./containers/ProductCard";
import StoreCategory from "./components/StoreCategory";
import { ALL_CATEGORIES } from "../../consts";

function ProductsGrid() {
  let { storeId, categoryId, productId: selectedProductId } = useParams();
  storeId = decodeURIComponent(storeId);
  categoryId = decodeURIComponent(categoryId);
  const [selectedCategory, setSelectedCategory] = useState(categoryId);
  const {
    loading,
    selectedStore: { store, categories },
    fetchSelectedStoreForProducts,
  } = useStore((state) => ({
    loading: state.loading,
    selectedStore: state.selectedStore,
    fetchSelectedStoreForProducts: (storeId) =>
      state.fetchSelectedStoreForProducts(storeId),
  }));

  useMemo(() => {
    fetchSelectedStoreForProducts(storeId);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <div className="">
        <div className=" text-2xl font-bold p-2">{store?.name}</div>
        <Outlet />
        {!selectedProductId ? (
          <div
            className=" flex flex-wrap
       gap-4 p-4 my-5 bg-slate-100 dark:bg-gray-700 rounded-2xl justify-center"
          >
            {categories.map((e) => (
              <StoreCategory
                key={e}
                categoryName={e}
                isSelected={selectedCategory === e}
                selectionHandler={(categoryName) =>
                  setSelectedCategory(categoryName)
                }
              />
            ))}
          </div>
        ) : (
          <hr className="my-5" />
        )}
      </div>
      <div
        className=" flex gap-5 flex-wrap justify-center lg:justify-start h-auto overflow-scroll"
      >
        {store?.items
          .filter((item) => {
            if (selectedCategory === ALL_CATEGORIES) {
              return true;
            } else {
              return item.category === selectedCategory;
            }
          })
          .map((e) => (
            <ProductCard
              key={e.item_id}
              productId={e.item_id}
              imageUrl={e.symbol}
              title={e.item_name}
              price={e.price}
            />
          ))}
      </div>
    </>
  );
}

export default ProductsGrid;
