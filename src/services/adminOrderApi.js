
import api from "./api";

// Fetch all orders
export const getAdminOrders = async () => {
  const response = await api.get("/orders");
  return response.data;
};

// Update an order's status
export const updateAdminOrderStatus = async ({ id, status }) => {
  const response = await api.patch(`/orders/${id}`, {
    status,
  });

  return response.data;
};
