
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { placeOrder } from "../redux/slices/orderSlice";
import { clearCart } from "../redux/slices/cartSlice";
import { toast } from "react-toastify";
import "./Checkout.css";

function Checkout() {
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.auth.user);

  const { isLoading, error } = useSelector(
    (state) => state.orders
  );

  const [orderPlaced, setOrderPlaced] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    phone: "",
    address: "",
    paymentMethod: "Cash on Delivery",
  });

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  // Place Order
  async function handlePlaceOrder(event) {
    event.preventDefault();

    if (!user || cartItems.length === 0) {
      toast.error("Please log in and add products to your cart.");
      return;
    }

    const orderData = {
      userId: user.id,
      customerName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      deliveryAddress: formData.address,
      paymentMethod: formData.paymentMethod,
      items: cartItems,
      totalPrice,
      status: "Pending",
      createdAt: new Date().toISOString(),
    };

    try {
      await dispatch(placeOrder(orderData)).unwrap();

      dispatch(clearCart());
      setOrderPlaced(true);

      toast.success("Your order has been placed successfully!");
    } catch (error) {
      console.error("Order failed:", error);

      toast.error("Failed to place your order. Please try again.");
    }
  }

  // Order success
  if (orderPlaced) {
    return (
      <section className="checkout-page">
        <div className="checkout-success">
          <div className="success-icon">✓</div>

          <p className="checkout-subtitle">MODGARAGE</p>

          <h1>ORDER PLACED SUCCESSFULLY!</h1>

          <p>
            Thank you for shopping with ModGarage.
            Your order has been received.
          </p>

          <Link to="/orders" className="success-orders-button">
            VIEW MY ORDERS
          </Link>

          <Link to="/products" className="success-shopping-link">
            Continue Shopping
          </Link>
        </div>
      </section>
    );
  }

  // Empty cart
  if (cartItems.length === 0) {
    return (
      <section className="checkout-page">
        <div className="checkout-empty">
          <h1>YOUR CART IS EMPTY</h1>
          <p>Add some products before proceeding to checkout.</p>

          <Link to="/products" className="checkout-back-button">
            EXPLORE PRODUCTS
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-page">
      <div className="checkout-container">

        <div className="checkout-heading">
          <p className="checkout-subtitle">MODGARAGE SHOPPING</p>
          <h1>SECURE CHECKOUT</h1>
          <p>Enter your details to complete your order.</p>
        </div>

        <form onSubmit={handlePlaceOrder}>
          <div className="checkout-layout">

            <div className="checkout-details">

              {/* CUSTOMER DETAILS */}

              <div className="checkout-section">
                <div className="checkout-section-heading">
                  <span>01</span>
                  <h2>CUSTOMER DETAILS</h2>
                </div>

                <div className="checkout-form-grid">

                  <div className="checkout-field">
                    <label>Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      placeholder="Enter your full name"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="checkout-field full-width">
                    <label>Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Enter your phone number"
                      value={formData.phone}
                      onChange={handleChange}
                      pattern="[0-9]{10}"
                      title="Enter a valid 10-digit phone number"
                      required
                    />
                  </div>

                </div>
              </div>

              {/* DELIVERY ADDRESS */}

              <div className="checkout-section">
                <div className="checkout-section-heading">
                  <h2>DELIVERY ADDRESS</h2>
                </div>

                <div className="checkout-form-grid">

                  <div className="checkout-field full-width">
                    <label>Complete Address</label>

                    <textarea
                      name="address"
                      placeholder="Enter your complete delivery address (House name, street, city, state, PIN code)"
                      value={formData.address}
                      onChange={handleChange}
                      rows={5}
                      required
                    />
                  </div>

                </div>
              </div>

              {/* PAYMENT METHOD */}

              <div className="checkout-section">
                <div className="checkout-section-heading">
                  <span>03</span>
                  <h2>PAYMENT METHOD</h2>
                </div>

                <div className="checkout-field">
                  <label>Select Payment Method</label>

                  <select
                    name="paymentMethod"
                    value={formData.paymentMethod}
                    onChange={handleChange}
                    required
                  >
                    <option value="Cash on Delivery">
                      Cash on Delivery
                    </option>

                    <option value="UPI (Demo)">
                      UPI (Demo)
                    </option>

                    <option value="Card Payment (Demo)">
                      Card Payment (Demo)
                    </option>
                  </select>
                </div>

                <p className="checkout-info-note">
                  UPI and card options are demo selections.
                  No actual payment will be processed.
                </p>
              </div>

              {/* YOUR ORDER */}

              <div className="checkout-section">
                <div className="checkout-section-heading">
                  <span>04</span>
                  <h2>YOUR ORDER</h2>
                </div>

                <div className="checkout-items">
                  {cartItems.map((item) => (
                    <div className="checkout-item" key={item.id}>

                      {item.image && (
                        <div className="checkout-item-image">
                          <img src={item.image} alt={item.name} />
                        </div>
                      )}

                      <div className="checkout-item-info">
                        <h3>{item.name}</h3>
                        <p>Quantity: {item.quantity}</p>
                        <span>{formatPrice(item.price)} each</span>
                      </div>

                      <div className="checkout-item-subtotal">
                        {formatPrice(item.price * item.quantity)}
                      </div>

                    </div>
                  ))}
                </div>

                <Link to="/cart" className="checkout-edit-cart">
                  ← EDIT CART
                </Link>
              </div>

            </div>

            {/* ORDER SUMMARY */}

            <aside className="checkout-summary">
              <h2>ORDER SUMMARY</h2>

              <div className="checkout-summary-row">
                <span>Products</span>
                <span>{cartItems.length}</span>
              </div>

              <div className="checkout-summary-row">
                <span>Total Quantity</span>
                <span>
                  {cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="checkout-summary-divider"></div>

              <div className="checkout-total-row">
                <span>Total Amount</span>
                <strong>{formatPrice(totalPrice)}</strong>
              </div>

              <p className="checkout-summary-note">
                Shipping charges, if applicable, are not included.
              </p>

              <button
                type="submit"
                className="place-order-button"
                disabled={isLoading || !user}
              >
                {isLoading ? "PLACING ORDER..." : "PLACE ORDER"}
              </button>

              {error && (
                <p className="checkout-error">
                  {typeof error === "string"
                    ? error
                    : "Something went wrong. Please try again."}
                </p>
              )}

              <div className="checkout-trust-note">
                <span>✓</span>
                Your order details will be saved.
              </div>
            </aside>

          </div>
        </form>
      </div>
    </section>
  );
}

export default Checkout;
