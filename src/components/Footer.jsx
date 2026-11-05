
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-main">

          {/* Brand */}
          <div className="footer-brand">
            <Link to="/" className="footer-logo">
              MOD<span>GARAGE</span>
            </Link>

            <p>
              Upgrade your drive. Define your style.
              Discover premium automotive accessories
              designed for enthusiasts.
            </p>
          </div>

          {/* Quick Links */}
          <div className="footer-column">
            <h3>QUICK LINKS</h3>
            <Link to="/">Home</Link>
            <Link to="/products">Shop Products</Link>
            <Link to="/cart">Shopping Cart</Link>
            <Link to="/wishlist">Wishlist</Link>
          </div>

          {/* Customer */}
          <div className="footer-column">
            <h3>MY ACCOUNT</h3>
            <Link to="/orders">My Orders</Link>
            <Link to="/login">Login</Link>
            <Link to="/register">Create Account</Link>
          </div>

          {/* Categories */}
          <div className="footer-column">
            <h3>OUR CATEGORIES</h3>
            <Link to="/products?category=Exterior%20Upgrades">
              Exterior Upgrades
            </Link>
            <Link to="/products?category=Interior%20Upgrades">
              Interior Upgrades
            </Link>
            <Link to="/products?category=Lighting">
              Lighting
            </Link>
            <Link to="/products?category=Performance%20Parts">
              Performance Parts
            </Link>
          </div>

        </div>

        <div className="footer-bottom">
          <p>© {new Date().getFullYear()} ModGarage. All Rights Reserved.</p>
          <p>BUILT FOR AUTOMOTIVE ENTHUSIASTS.</p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
