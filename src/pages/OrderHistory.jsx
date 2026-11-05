import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders } from "../redux/slices/orderSlice";
import "./OrderHistory.css";

function OrderHistory() {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const { items, isLoading, error } = useSelector(
    (state) => state.orders
  );

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  // Display only the logged-in user's orders
  const myOrders = items.filter(
    (order) => String(order.userId) === String(user?.id)
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  if (isLoading) {
    return (
      <div className="orders-message">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="orders-message orders-error">
        <p>Unable to load orders: {error}</p>
      </div>
    );
  }

  if (myOrders.length === 0) {
    return (
      <section className="orders-page">
        <div className="orders-empty">
          <span className="orders-empty-icon">⌑</span>
          <p className="orders-eyebrow">YOUR GARAGE</p>
          <h1>No Orders Yet</h1>
          <p>
            Your order history will appear here once you place your
            first order.
          </p>
          <Link to="/products" className="orders-shop-button">
            Explore Products
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="orders-page">
      <div className="orders-container">
        <div className="orders-heading">
          <p className="orders-eyebrow">YOUR GARAGE</p>
          <h1>MY <span>ORDERS</span></h1>
          <p>Track your purchases and revisit your upgrades.</p>
        </div>

        <div className="orders-list">
          {myOrders.map((order) => (
            <article className="order-card" key={order.id}>
              <div className="order-card-header">
                <div>
                  <p className="order-label">ORDER ID</p>
                  <h2>#{order.id}</h2>
                </div>

                <span
                  className={`order-status ${String(
                    order.status || "Pending"
                  ).toLowerCase()}`}
                >
                  {order.status || "Pending"}
                </span>
              </div>

              <div className="order-meta">
                <div>
                  <span>Customer</span>
                  <strong>{order.customerName}</strong>
                </div>

                <div>
                  <span>Order Date</span>
                  <strong>
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "short",
                            year: "numeric",
                          }
                        )
                      : "Date unavailable"}
                  </strong>
                </div>

                <div>
                  <span>Total Amount</span>
                  <strong className="order-total">
                    {formatPrice(order.totalPrice)}
                  </strong>
                </div>
              </div>

              <div className="order-products">
                <h3>ORDER ITEMS</h3>

                {(order.items || []).map((item, index) => (
                  <div
                    className="order-product"
                    key={item.id ?? `${order.id}-${index}`}
                  >
                    <div className="order-product-info">
                      <strong>{item.name}</strong>
                      <span>Quantity: {item.quantity}</span>
                    </div>

                    <strong>
                      {formatPrice(
                        Number(item.price) * Number(item.quantity)
                      )}
                    </strong>
                  </div>
                ))}
              </div>

              <div className="order-card-footer">
                <span>
                  {(order.items || []).length} product
                  {(order.items || []).length !== 1 ? "s" : ""}
                </span>

                <Link to="/products">Continue Shopping →</Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default OrderHistory;