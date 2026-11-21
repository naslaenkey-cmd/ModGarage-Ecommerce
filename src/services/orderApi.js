
import api from "./api";

// Fetch orders belonging to the logged-in user
export const getUserOrders = async (userId) => {
  const response = await api.get("/orders", {
    params: { userId },
  });

  return response.data;
};

// Create a new order
export const createOrder = async (orderData) => {
  const response = await api.post("/orders", orderData);

  return response.data;
};
