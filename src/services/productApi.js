
import api from "./api";

// Fetch all products
export const getProducts = async () => {
  const response = await api.get("/products");
  return response.data;
};

// Fetch a single product using its ID
export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};
