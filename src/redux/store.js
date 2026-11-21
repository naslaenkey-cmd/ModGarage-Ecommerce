import { configureStore } from "@reduxjs/toolkit";

import authReducer from "./slices/authSlice";
import adminAuthReducer from "./slices/adminAuthSlice";
import adminSliceReducer from "./slices/adminSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    adminAuth: adminAuthReducer,

    // New task: Fetch all 35 products
    adminTask: adminSliceReducer,
  },
});