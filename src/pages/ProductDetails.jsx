
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import api from "../services/api";
import { addToCart } from "../redux/slices/cartSlice";
import { addToWishlist } from "../redux/slices/wishlistSlice";
import "./ProductDetails.css";

function ProductDetails() {
  const dispatch = useDispatch();
  const { id } = useParams();

  const wishlistItems = useSelector(
    (state) => state.wishlist.items
  );

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getProduct() {
      try {
        setIsLoading(true);
        setError("");

        const response = await api.get(`/products/${id}`);

        setProduct(response.data);
        setQuantity(1);
      } catch (error) {
        setError("Product not found or could not be loaded.");
      } finally {
        setIsLoading(false);
      }
    }

    getProduct();
  }, [id]);

  // Add product to cart
  const handleAddToCart = () => {
    if (product.stock <= 0) {
      toast.error("This product is out of stock!");
      return;
    }

    dispatch(
      addToCart({
        ...product,
        quantity,
      })
    );

    toast.success("Product added to cart successfully!");
  };

  // Add product to wishlist
  const handleAddToWishlist = () => {
    const alreadyExists = wishlistItems.some(
      (item) => item.id === product.id
    );

    if (alreadyExists) {
      toast.info("This product is already in your wishlist.");
      return;
    }

    dispatch(addToWishlist(product));
    toast.success("Product added to wishlist!");
  };

  if (isLoading) {
    return (
      <div className="product-details-message">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="product-details-message">
        <h2>PRODUCT NOT FOUND</h2>
        <p>{error || "This product is unavailable."}</p>

        <Link to="/products" className="back-products-button">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <section className="product-details-page">
      <div className="product-details-container">

        {/* Breadcrumb */}
        <div className="product-breadcrumb">
          <Link to="/">Home</Link>
          <span>/</span>
          <Link to="/products">Products</Link>
          <span>/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </div>

        {/* Product Content */}
        <div className="product-details-content">

          {/* Product Image */}
          <div className="product-details-image-box">
            <div className="product-image-tag">
              MODGARAGE EXCLUSIVE
            </div>

            <img
              src={product.image}
              alt={product.name}
              className="product-details-image"
            />
          </div>

          {/* Product Information */}
          <div className="product-details-info">

            <p className="details-category">
              {product.category}
            </p>

            <h1 className="details-product-name">
              {product.name}
            </h1>

            <div className="details-divider"></div>

            <p className="details-price">
              ₹{Number(product.price).toLocaleString("en-IN")}
            </p>

            <p className="details-description">
              {product.description}
            </p>

            {/* Stock Status */}
            <div className="details-stock">
              <span className="stock-label">Availability:</span>

              {product.stock > 0 ? (
                <span className="stock-available">
                  In Stock ({product.stock} available)
                </span>
              ) : (
                <span className="stock-unavailable">
                  Out of Stock
                </span>
              )}
            </div>

            {/* Quantity Selector */}
            {product.stock > 0 && (
              <div className="details-quantity-section">
                <span className="quantity-label">Quantity</span>

                <div className="quantity-control">
                  <button
                    onClick={() =>
                      setQuantity((previous) =>
                        Math.max(1, previous - 1)
                      )
                    }
                    disabled={quantity <= 1}
                    aria-label="Decrease quantity"
                  >
                    −
                  </button>

                  <span>{quantity}</span>

                  <button
                    onClick={() =>
                      setQuantity((previous) =>
                        Math.min(product.stock, previous + 1)
                      )
                    }
                    disabled={quantity >= product.stock}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="details-buttons">
              <button
                className="details-cart-button"
                onClick={handleAddToCart}
                disabled={product.stock <= 0}
              >
                {product.stock > 0 ? "ADD TO CART" : "OUT OF STOCK"}
              </button>

              <button
                className="details-wishlist-button"
                onClick={handleAddToWishlist}
              >
                ♡ ADD TO WISHLIST
              </button>
            </div>

            {/* Additional Information */}
            <div className="details-features">
              <div className="feature-item">
                <span className="feature-icon">✦</span>
                <div>
                  <h4>Premium Quality</h4>
                  <p>Selected automotive accessories</p>
                </div>
              </div>

              <div className="feature-item">
                <span className="feature-icon">✓</span>
                <div>
                  <h4>Trusted Collection</h4>
                  <p>Upgrade your driving experience</p>
                </div>
              </div>
            </div>

            <Link to="/products" className="details-back-link">
              ← Continue Shopping
            </Link>

          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductDetails;
