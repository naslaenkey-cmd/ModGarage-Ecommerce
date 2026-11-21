
import api from "./api";


export const loginUser = async (formData) => {
  const response = await api.get("/users");

  const user = response.data.find(
    (item) =>
      item.email.toLowerCase() ===
        formData.email.trim().toLowerCase() &&
      item.password === formData.password
  );

  
  if (!user) {
    throw new Error("Invalid email or password.");
  }

  
  if (user.isBlocked === true) {
    throw new Error(
      "Your account has been blocked. Please contact the administrator."
    );
  }

  return user;
};
