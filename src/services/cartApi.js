
import api from "./api";

// Fetch the logged-in user's cart
export const getCart = async (userId) => {
  const response = await api.get("/carts", {
    params: { userId },
  });

  return response.data[0]?.items || [];
};

// Save or update the user's cart
export const saveCart = async (userId, items) => {
  const response = await api.get("/carts", {
    params: { userId },
  });

  const existingCart = response.data[0];

  if (existingCart) {
    await api.patch(`/carts/${existingCart.id}`, {
      items,
    });
  } else {
    await api.post("/carts", {
      userId,
      items,
    });
  }

  return items;
};
