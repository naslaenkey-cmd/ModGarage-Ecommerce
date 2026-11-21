
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../services/api";

// Admin Login API
export const adminLogin = createAsyncThunk(
  "adminAuth/adminLogin",
  async (credentials, thunkAPI) => {
    try {
      // Debugging: Check entered credentials
      console.log("Email entered:", JSON.stringify(credentials.email));
      console.log("Password entered:", JSON.stringify(credentials.password));

      // Fetch all admin records
      const response = await api.get("/admins");

      console.log("All admins from API:", response.data);

      // Find matching admin
      const admin = response.data.find(
        (item) =>
          item.email.trim() === credentials.email.trim() &&
          item.password === credentials.password &&
          item.role === "admin"
      );

      console.log("Matched admin:", admin);

      // Check credentials
      if (!admin) {
        return thunkAPI.rejectWithValue(
          "Invalid admin credentials"
        );
      }

      return admin;
    } catch (error) {
      console.log("Admin login error:", error);

      return thunkAPI.rejectWithValue(
        error.response?.data?.message || "Admin login failed"
      );
    }
  }
);

// Initial State
const initialState = {
  admin: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

// Admin Authentication Slice
const adminAuthSlice = createSlice({
  name: "adminAuth",
  initialState,

  reducers: {
    // Admin Logout
    adminLogout: (state) => {
      state.admin = null;
      state.isAuthenticated = false;
      state.error = null;
    },

    // Clear Login Error
    clearAdminError: (state) => {
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder
      // Login Pending
      .addCase(adminLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })

      // Login Successful
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.isLoading = false;
        state.admin = action.payload;
        state.isAuthenticated = true;
        state.error = null;
      })

      // Login Failed
      .addCase(adminLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload || "Admin login failed";
      });
  },
});

// Export Actions
export const { adminLogout, clearAdminError } =
  adminAuthSlice.actions;

// Export Reducer
export default adminAuthSlice.reducer;
