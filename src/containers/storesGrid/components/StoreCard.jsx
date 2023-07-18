import React from "react";
import { Link } from "react-router-dom";

function StoreCard({ imageSrc, storeName, storeId }) {
  return (
    <Link
      to={encodeURIComponent(storeId)}
      className="rounded-xl flex justify-start gap-3 h-28 bg-slate-50 dark:bg-gray-700 min-w-max w-80 hover:bg-slate-200 dark:hover:bg-slate-600 mx-auto"
    >
      <img src={imageSrc} className=" w-24 bg-cover bg-center h-28 rounded-xl" />
      <div className=" flex-col">
        <p className=" font-bold py-1">{storeName}</p>
      </div>
    </Link>
  );
}

export default StoreCard;
