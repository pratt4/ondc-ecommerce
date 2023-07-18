import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useStore } from "../../store";
import LoadingPage from "../../components/LoadingPage";
import StoreCard from "./components/StoreCard";

function StoresGrid() {
  const { loading, stores, fetchStores } = useStore((state) => ({
    loading: state.loading,
    stores: state.stores,
    fetchStores: (categoryId) => state.fetchStores(categoryId),
  }));
  let { categoryId } = useParams();
  categoryId = decodeURIComponent(categoryId);

  useEffect(() => {
    fetchStores(categoryId);
  }, []);

  if (loading) {
    return <LoadingPage />;
  }
  return (
    <>
      <div className="h-1/4 my-5 text-2xl">Stores ({categoryId})</div>
      <div
        className="grid gap-[2em]"
        style={{ gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))" }}
      >
        {stores.map((store) => (
          <StoreCard
            key={store.name}
            storeId={store.name}
            imageSrc={store.symbol}
            storeName={store.name}
          />
        ))}
      </div>
    </>
  );
}

export default StoresGrid;
