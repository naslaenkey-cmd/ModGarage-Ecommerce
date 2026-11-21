
import api from "./api";

// Fetch active products (Admin)
export const getAdminProducts = async () => {
  const response = await api.get("/products");

  return response.data.filter(
    (product) => product.isDeleted !== true
  );
};

// Fetch recently deleted products
export const getDeletedProducts = async () => {
  const response = await api.get("/products");

  return response.data.filter(
    (product) => product.isDeleted === true
  );
};

// Create a new product
export const createProduct = async (productData) => {
  const response = await api.post("/products", {
    ...productData,
    isDeleted: false,
  });

  return response.data;
};

// Update an existing product
export const editProduct = async ({ id, productData }) => {
  const response = await api.patch(`/products/${id}`, productData);

  return response.data;
};

// Soft delete a product
export const softDeleteProduct = async (id) => {
  const response = await api.patch(`/products/${id}`, {
    isDeleted: true,
  });

  return response.data;
};

// Restore a deleted product
export const restoreProduct = async (id) => {
  const response = await api.patch(`/products/${id}`, {
    isDeleted: false,
  });

  return response.data;
};

// Permanently delete a product
export const permanentlyDeleteProduct = async (id) => {
  const response = await api.delete(`/products/${id}`);

  return response.data;
};
