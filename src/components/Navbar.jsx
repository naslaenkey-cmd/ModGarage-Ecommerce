
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/slices/authSlice";
import "./Navbar.css";

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isAuthenticated, user } = useSelector(
    (state) => state.auth
  );

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const cartCount = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">

      {/* Logo */}
      <Link to="/" className="navbar-logo">
        <span className="logo-icon">M</span>

        <span>
          Mod<span className="logo-accent">Garage</span>
        </span>
      </Link>

      {/* Navigation Links */}
      <div className="navbar-links">

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/products"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Products
        </NavLink>

        {isAuthenticated && (
          <>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Cart
              <span className="nav-cart-count">
                {cartCount}
              </span>
            </NavLink>

            <NavLink
              to="/wishlist"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              Wishlist
            </NavLink>

            <NavLink
              to="/orders"
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              My Orders
            </NavLink>
          </>
        )}

      </div>

      {/* Authentication Actions */}
      <div className="navbar-actions">

        {isAuthenticated ? (
          <>
            <span className="navbar-user">
              Hi, {user?.fullName || "User"}
            </span>

            <button
              className="navbar-button"
              onClick={handleLogout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-login">
              Login
            </Link>

            <Link to="/register" className="navbar-button">
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;
