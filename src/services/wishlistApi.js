import api from "./api";

// Fetch the logged-in user's wishlist
export const getWishlist = async (userId) => {
  const response = await api.get("/wishlists", {
    params: { userId },
  });

  return response.data[0]?.items || [];
};

// Save wishlist to JSON Server
export const saveWishlist = async (userId, items) => {
  const response = await api.get("/wishlists", {
    params: { userId },
  });

  const existingWishlist = response.data[0];

  if (existingWishlist) {
    await api.patch(`/wishlists/${existingWishlist.id}`, {
      items,
    });
  } else {
    await api.post("/wishlists", {
      userId,
      items,
    });
  }

  return items;
};