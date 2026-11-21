
import api from "./api";

// Fetch the latest customer details from JSON Server
export const getUserById = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};
