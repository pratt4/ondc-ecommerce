import {
  addToOndcCartWithCaios,
  fetchCategoriesWithCaios,
  fetchSelectedProductWithCaios,
  fetchSelectedStoreForProductsWithCaios,
  fetchStoresWithCaios,
  placeOrderWithCaios,
} from "../service/services-caios";

export const dataStore = (set) => ({
  loading: false,
  categories: [],
  stores: [],
  selectedStore: {
    categories: [],
    store: {},
  },
  selectedProduct: {
    loading: false,
    data: {},
  },
  allCarts: {},
  ondcCarts: {
    // struct -> storeId: {saving: false, synced: false, cartId: null}
  },
  fetchCategories: async () => {
    set((state) => {
      state.loading = true;
    });
    try {
      const categoriesData = await fetchCategoriesWithCaios();
      set((state) => {
        state.loading = false;
        state.categories = categoriesData.map((e) => e.category);
      });
    } catch (error) {
      console.log(error);
      set((state) => {
        state.loading = false;
      });
    }
  },
  fetchStores: async (categoryId) => {
    set((state) => {
      state.loading = true;
    });
    try {
      const storesData = await fetchStoresWithCaios(categoryId);
      set((state) => {
        state.loading = false;
        state.stores = storesData;
      });
    } catch (error) {
      console.log(error);
      set((state) => {
        state.loading = false;
      });
    }
  },
  fetchSelectedStoreForProducts: async (storeId) => {
    set((state) => {
      state.loading = true;
    });
    try {
      const selectedStoreDataForProducts =
        await fetchSelectedStoreForProductsWithCaios(storeId);
      set((state) => {
        state.loading = false;
        state.selectedStore = selectedStoreDataForProducts;
      });
    } catch (error) {
      console.log(error);
      set((state) => {
        state.loading = false;
      });
    }
  },
  fetchSelectedProduct: async (storeId, productId) => {
    set((state) => {
      state.selectedProduct.loading = true;
    });
    try {
      const selectedProductData = await fetchSelectedProductWithCaios(
        storeId,
        productId
      );
      set((state) => {
        state.selectedProduct.loading = false;
        state.selectedProduct.data = selectedProductData;
      });
    } catch (error) {
      console.log(error);
      set((state) => {
        state.selectedProduct.loading = false;
      });
    }
  },
  clearSelectedProduct: () => {
    set((state) => {
      state.selectedProduct = {
        loading: false,
        data: {},
      };
    });
  },
  updateSelectedCart: (storeId, productId, productData) => {
    set((state) => {
      if (state.allCarts[storeId]) {
        state.ondcCarts[storeId].synced = false;
        state.ondcCarts[storeId].cartId = null;
        if (state.allCarts[storeId][productId]) {
          if (productData["selectedQty"]) {
            state.allCarts[storeId][productId]["selectedQty"] =
              productData["selectedQty"];
          } else {
            if (Object.keys(state.allCarts[storeId]).length > 1) {
              delete state.allCarts[storeId][productId];
            } else {
              delete state.allCarts[storeId];
              delete state.ondcCarts[storeId];
            }
          }
        } else {
          state.allCarts[storeId][productId] = productData;
        }
      } else {
        state.allCarts[storeId] = {
          [productId]: productData,
        };
        state.ondcCarts[storeId] = {
          saving: false,
          synced: false,
          cartId: null,
        };
      }
    });
  },
  removeSelectedCart: (storeId) =>
    set((state) => {
      delete state.allCarts[storeId];
      delete state.ondcCarts[storeId];
    }),
  addToOndcCart: async (cartDetails) => {
    try {
      set((state) => {
        state.ondcCarts[cartDetails.storeId].saving = true;
      });
      await addToOndcCartWithCaios(cartDetails);
      set((state) => {
        state.ondcCarts[cartDetails.storeId].saving = false;
        state.ondcCarts[cartDetails.storeId].synced = true;
        state.ondcCarts[cartDetails.storeId].cartId = cartDetails.cart_id;
        if (state.ondcCarts[cartDetails.storeId].orderDetails) {
          state.ondcCarts[cartDetails.storeId].orderDetails = {};
        }
      });
    } catch (error) {
      set((state) => {
        state.ondcCarts[cartDetails.storeId].saving = false;
      });
      console.log(error);
    }
  },
  placeOrder: async (storeId, orderDetails) => {
    try {
      set((state) => {
        state.ondcCarts[storeId].placingOrder = true;
      });
      const placedOrder = await placeOrderWithCaios(orderDetails);
      set((state) => {
        state.ondcCarts[storeId].placingOrder = false;
        state.ondcCarts[storeId].orderDetails = placedOrder;
      });
    } catch (error) {
      console.log(error);
      set((state) => {
        state.ondcCarts[storeId].placingOrder = false;
      });
    }
  },
});
