import React, { useState, useEffect } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";

function SearchBarSection({query, setQuery, cartsLength }) {
  // const [query, setQuery] = useState("");
  // const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  
  return (
    <div className="flex justify-between items-center">
      <p className="text-2xl cursor-pointer" onClick={() => navigate("/")}>
        Buyer app POC
      </p>
      <div className="flex gap-5">
        <div className="flex border-[1px] border-slate-300 rounded-l-lg rounded-r-lg ">
          <input
            className="rounded-l-lg focus:outline-none"
            type="search"
            placeholder="Search.."
            value={query} 
            onChange={(e) => setQuery(e.target.value)}
          />
          {/* <button
            className="rounded-none rounded-r-lg bg-slate-100 dark:bg-slate-600 dark:hover:bg-slate-500 hover:bg-blue-200 hover:border-transparent"
            onClick={handleGoClick} 
          >
            Go
          </button> */}
        </div>
        <Link
          title="Shopping Carts"
          to="/all-carts"
          className="relative my-auto ml-4 hover:bg-yellow-50 dark:hover:bg-slate-400 p-3 rounded-full cursor-pointer"
        >
          <ShoppingCartOutlinedIcon />
          {cartsLength && (
            <div className="absolute top-3 right-3 h-[0.5rem] w-[0.5rem] rounded-full bg-red-500"></div>
          )}
        </Link>
        <p className="text-2xl cursor-pointer" onClick={() => navigate("/auth")}>Sign In</p>
      </div>
    </div>
  );
}

export default SearchBarSection;
