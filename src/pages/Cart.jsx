
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQuantity,
  decreaseQuantity,
  removeFromCart,
} from "../redux/slices/cartSlice";
import { Link } from "react-router-dom";
import "./Cart.css";

function Cart() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  // Empty Cart
  if (cartItems.length === 0) {
    return (
      <section className="cart-page">
        <div className="empty-cart">
          <div className="empty-cart-icon">🛒</div>

          <p className="cart-subtitle">MODGARAGE SHOPPING</p>

          <h1>YOUR CART IS EMPTY</h1>

          <p className="empty-cart-text">
            You haven't added any products yet.
            Discover premium upgrades for your vehicle.
          </p>

          <Link to="/products" className="continue-shopping-button">
            EXPLORE PRODUCTS
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-container">

        {/* Page Heading */}
        <div className="cart-heading">
          <p className="cart-subtitle">MODGARAGE SHOPPING</p>
          <h1>YOUR SHOPPING CART</h1>
          <p>
            Review your selected automotive upgrades.
          </p>
        </div>

        <div className="cart-layout">

          {/* Cart Items */}
          <div className="cart-items-section">

            <div className="cart-items-header">
              <h2>YOUR ITEMS</h2>
              <span>{cartItems.length} PRODUCTS</span>
            </div>

            {cartItems.map((item) => (
              <div className="cart-item" key={item.id}>

                {/* Product Image */}
                <Link
                  to={`/products/${item.id}`}
                  className="cart-item-image"
                >
                  {item.image && (
                    <img src={item.image} alt={item.name} />
                  )}
                </Link>

                {/* Product Information */}
                <div className="cart-item-info">
                  <p className="cart-item-category">
                    {item.category}
                  </p>

                  <Link
                    to={`/products/${item.id}`}
                    className="cart-item-name"
                  >
                    {item.name}
                  </Link>

                  <p className="cart-item-price">
                    {formatPrice(item.price)}
                  </p>

                  {/* Quantity Controls */}
                  <div className="cart-quantity-control">
                    <button
                      onClick={() =>
                        dispatch(decreaseQuantity(item.id))
                      }
                      disabled={item.quantity <= 1}
                      aria-label="Decrease quantity"
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      onClick={() =>
                        dispatch(increaseQuantity(item.id))
                      }
                      disabled={item.quantity >= item.stock}
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Subtotal and Remove */}
                <div className="cart-item-actions">
                  <p className="cart-item-subtotal">
                    {formatPrice(item.price * item.quantity)}
                  </p>

                  <button
                    className="cart-remove-button"
                    onClick={() =>
                      dispatch(removeFromCart(item.id))
                    }
                  >
                    REMOVE
                  </button>
                </div>

              </div>
            ))}

            <Link to="/products" className="cart-continue-link">
              ← CONTINUE SHOPPING
            </Link>

          </div>

          {/* Order Summary */}
          <aside className="cart-summary">
            <h2>ORDER SUMMARY</h2>

            <div className="summary-row">
              <span>Products</span>
              <span>{cartItems.length}</span>
            </div>

            <div className="summary-row">
              <span>Total Quantity</span>
              <span>
                {cartItems.reduce(
                  (total, item) => total + item.quantity,
                  0
                )}
              </span>
            </div>

            <div className="summary-divider"></div>

            <div className="summary-total">
              <span>Subtotal</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>

            <p className="summary-note">
              Shipping charges, if applicable, will be
              calculated during checkout.
            </p>

            <Link
              to="/checkout"
              className="checkout-button"
            >
              PROCEED TO CHECKOUT
            </Link>

            <div className="summary-benefit">
              <span>✓</span>
              Premium automotive collection
            </div>

            <div className="summary-benefit">
              <span>✓</span>
              Secure checkout experience
            </div>
          </aside>

        </div>
      </div>
    </section>
  );
}

export default Cart;
