
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductDetails from "./pages/ProductDetails";
import Products from "./pages/Products";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./routes/ProtectedRoute";
import { logout } from "./redux/slices/authSlice";

function Dashboard() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  function handleLogout() {
    dispatch(logout());
  }

  return (
    <div>
      <h1>Welcome to ModGarage!</h1>

      <p>Hello, {user?.fullName}!</p>
      <p>You have successfully logged in.</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

function App() {
  const isAuthenticated = useSelector(
    (state) => state.auth.isAuthenticated
  );

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/login"}
              replace
            />
          }
        />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

         <Route path="/products" element={<Products />} />
         <Route
         path="/products/:id"
       element={<ProductDetails />}
      />

        <Route
          path="*"
          element={
            <Navigate
              to={isAuthenticated ? "/dashboard" : "/login"}
              replace
            />
          }
        />

       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
