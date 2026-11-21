
import api from "./api";

// Fetch all users
export const getAdminUsers = async () => {
  const response = await api.get("/users");
  return response.data;
};

// Block or unblock a user
export const updateAdminUserStatus = async ({ id, isBlocked }) => {
  const response = await api.patch(`/users/${id}`, {
    isBlocked,
  });

  return response.data;
};
