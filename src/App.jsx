import { useState, useEffect } from "react";
import "./App.css";
import AppRoutes from "./routes";
import SearchBarSection from "./components/SearchBarSection";
import { useStore } from "./store";

import AuthContext from "./context/auth.context";

function App() {
  // useraccounts
  useEffect(() => {
  
    const users = JSON.parse(localStorage.getItem("users"));

    
    if (!users || users.length === 0) {
      const defaultUser = {
        email: "test@test.com",
        password: "test",
      };

      localStorage.setItem("users", JSON.stringify([defaultUser]));
    }
  }, []);

  // login-logout
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };



  const { cartsLength } = useStore((state) => ({
    cartsLength: Object.keys(state.allCarts).length,
  }));
  const [query, setQuery] = useState("");
  return (
    <div>
      <AuthContext.Provider value={{ isLoggedIn, onLogin: handleLogin, onLogout: handleLogout }}>

        <div className="h-1/4 my-5">
          <SearchBarSection query={query} setQuery={setQuery} cartsLength={!!cartsLength} />
        </div>
        <hr />
        <AppRoutes query={query}/>
      </AuthContext.Provider>
      
    </div>
  );
}

export default App;
