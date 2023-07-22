import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AppRoutes from "./routes";
import { Link } from "react-router-dom";
import SearchBarSection from "./components/SearchBarSection";
import { useStore } from "./store";

function App() {
  const { cartsLength } = useStore((state) => ({
    cartsLength: Object.keys(state.allCarts).length,
  }));
  const [query, setQuery] = useState("");
  return (
    <div>
      <div className="h-1/4 my-5">
        <SearchBarSection query={query} setQuery={setQuery} cartsLength={!!cartsLength} />
      </div>
      <hr />
      <AppRoutes query={query}/>
    </div>
  );
}

export default App;
