
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { removeFromWishlist } from "../redux/slices/wishlistSlice";
import { addToCart } from "../redux/slices/cartSlice";
import "./Wishlist.css";

function Wishlist() {
  const dispatch = useDispatch();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const handleRemove = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleMoveToCart = (product) => {
    if (product.stock <= 0) {
      alert("This product is out of stock.");
      return;
    }

    dispatch(addToCart(product));
    dispatch(removeFromWishlist(product.id));
  };

  if (wishlistItems.length === 0) {
    return (
      <section className="wishlist-page">
        <div className="wishlist-empty">
          <span className="wishlist-empty-icon">♡</span>
          <p className="wishlist-eyebrow">YOUR COLLECTION</p>
          <h1>MY <span>WISHLIST.</span></h1>
          <p>Your wishlist is waiting for some upgrades.</p>
          <Link to="/products" className="wishlist-shop-button">
            EXPLORE PRODUCTS
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="wishlist-page">
      <div className="wishlist-container">

        <div className="wishlist-heading">
          <p className="wishlist-eyebrow">SAVED FOR YOUR NEXT UPGRADE</p>
          <h1>MY <span>WISHLIST.</span></h1>
          <p>
            {wishlistItems.length} saved{" "}
            {wishlistItems.length === 1 ? "product" : "products"}
          </p>
        </div>

        <div className="wishlist-grid">
          {wishlistItems.map((product) => (
            <article className="wishlist-card" key={product.id}>

              <Link
                to={`/products/${product.id}`}
                className="wishlist-image-container"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="wishlist-image"
                />
              </Link>

              <div className="wishlist-card-content">
                <p className="wishlist-category">
                  {product.category}
                </p>

                <h2>{product.name}</h2>

                <p className="wishlist-price">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                <p className={`wishlist-stock ${
                  product.stock > 0 ? "in-stock" : "out-of-stock"
                }`}>
                  {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                </p>

                <div className="wishlist-actions">
                  <button
                    className="wishlist-cart-button"
                    onClick={() => handleMoveToCart(product)}
                    disabled={product.stock <= 0}
                  >
                    MOVE TO CART
                  </button>

                  <button
                    className="wishlist-remove-button"
                    onClick={() => handleRemove(product.id)}
                  >
                    REMOVE
                  </button>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="wishlist-details-link"
                >
                  VIEW DETAILS →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <Link to="/products" className="wishlist-continue-link">
          ← CONTINUE SHOPPING
        </Link>

      </div>
    </section>
  );
}

export default Wishlist;
