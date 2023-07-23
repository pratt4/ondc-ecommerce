import React, { useContext } from "react";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { Link, useNavigate } from "react-router-dom";

import AuthContext from "../context/auth.context";

function SearchBarSection({ query, setQuery, cartsLength }) {
  const { isLoggedIn, onLogout } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center py-4 px-8 bg-[#494949]">
      <p className="text-2xl cursor-pointer text-white" onClick={() => navigate("/")}>
        ONDC Buyer app POC
      </p>
      <div className="flex gap-5">
        <div className="flex border-[1px] border-slate-300 rounded-l-lg rounded-r-lg ">
          <input
            className="px-4 py-2 rounded-l-lg focus:outline-none text-white"
            type="search"
            placeholder="Search.."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
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
        <p
          className="text-1xl cursor-pointer text-white"
          onClick={() => navigate("/auth")}
        >
          {isLoggedIn ? (
            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600" onClick={onLogout}>Sign Out</button>
          ) : (
            <button className="px-4 py-2 rounded bg-blue-500 text-white hover:bg-blue-600">Sign In</button>
          )}
        </p>
      </div>
    </div>
  );
}

export default SearchBarSection;
