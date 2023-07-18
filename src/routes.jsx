import { Link, Route, Routes } from "react-router-dom";
import CategoriesGrid from "./containers/categoriesGrid/CategoriesGrid";
import RouteErrorPage from "./components/RouteErrorPage";
import StoresGrid from "./containers/storesGrid/StoresGrid";
import ProductsGrid from "./containers/productsGrid/ProductsGrid";
import SelectedProduct from "./containers/selectedProduct/SelectedProduct";
import CartsGrid from "./containers/cartsGrid/CartsGrid";
import SelectedCart from "./containers/cartsGrid/containers/SelectedCart";
import PlaceOrder from "./containers/placeOrder/PlaceOrder";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<CategoriesGrid />} />
      <Route path="/:categoryId" element={<StoresGrid />} />
      <Route path="/:categoryId/:storeId" element={<ProductsGrid />}>
        <Route path=":productId" element={<SelectedProduct />} />
      </Route>
      <Route path="/all-carts" element={<CartsGrid />} />
      <Route exact path="/all-carts/:storeId" element={<SelectedCart />} />
      <Route exact path="/all-carts/:storeId/place-order" element={<PlaceOrder />} />
      <Route path="*" element={<RouteErrorPage />} />
    </Routes>
  );
};

export default AppRoutes;
