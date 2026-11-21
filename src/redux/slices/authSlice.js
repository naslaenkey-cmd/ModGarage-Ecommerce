
import { createSlice } from "@reduxjs/toolkit";

const savedId = localStorage.getItem("id");
const savedRole = localStorage.getItem("role");

const initialState = {
  user: savedId
    ? { id: savedId, role: savedRole || "user" }
    : null,
  isAuthenticated: Boolean(savedId),
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    loginSuccess: (state, action) => {
      const userData = {
        id: action.payload.id,
        role: action.payload.role || "user",
      };

      state.user = userData;
      state.isAuthenticated = true;

      localStorage.setItem("id", userData.id);
      localStorage.setItem("role", userData.role);
    },

    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("id");
      localStorage.removeItem("role");
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;
