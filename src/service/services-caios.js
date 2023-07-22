import axios from "axios";
import axiosRetry from "axios-retry";
import { BASE_URL } from "../consts";
import { passTime } from "../utils";

axiosRetry(axios, { retries: 3 });

export const fetchCategoriesWithCaios = async () => {
  const { data: fetchedCategories } = await axios.get(`${BASE_URL}/categories`);
  return fetchedCategories?.data;
};

export const fetchStoresWithCaios = async (categoryId) => {
  const { data: fetchedStores } = await axios.get(
    `${BASE_URL}/stores?value=${encodeURIComponent(categoryId)}`
  );
  return fetchedStores?.data;
};

export const fetchSelectedStoreForProductsWithCaios = async (storeId) => {
  const { data: selectedStoreDataForProducts } = await axios.get(
    `${BASE_URL}/items?value=${encodeURIComponent(storeId)}`,
    {}
  );
  return selectedStoreDataForProducts;
};

export const fetchSelectedProductWithCaios = async (storeId, productId) => {
  const { data: selectedProductData } = await axios.get(
    `${BASE_URL}/products/${encodeURIComponent(
      productId
    )}?store=${encodeURIComponent(storeId)}`
  );
  return selectedProductData?.data;
};

export const addToOndcCartWithCaios = async (cartDetails) => {
  await axios.post(`${BASE_URL}/carts`, {
    details: cartDetails,
  });
  await passTime(10_000); // for providing sufficient time to this api
};

export const placeOrderWithCaios = async (orderDetails) => {
  const { data: response } = await axios.post(`${BASE_URL}/ConfirmedOrders`, {
    cart_id: orderDetails.cartId,
    order_id: orderDetails.orderId,
    payment_info: {
      uri: "https://ondc.transaction.com/payment",
      tl_method: "http/get",
      params: {
        currency: "INR",
        transaction_id: orderDetails.transactionId,
        transaction_status: "captured",
        amount: String(orderDetails.orderTotal),
      },
    },
  });
  return response;
};
