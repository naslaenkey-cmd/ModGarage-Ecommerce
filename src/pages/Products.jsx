
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useSearchParams } from "react-router-dom";
import { fetchProducts } from "../redux/slices/productSlice";
import "./Products.css";

function Products() {
  const dispatch = useDispatch();

  const { items, isLoading, error } = useSelector(
    (state) => state.products
  );

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl = searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] = useState(
    categoryFromUrl
  );

  const productsPerPage = 8;

  // Fetch products from JSON Server
  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  // Synchronize category with URL
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setCurrentPage(1);
  }, [categoryFromUrl]);

  // Search and category filtering
  const filteredProducts = items.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  // Sorting
  const sortedProducts = [...filteredProducts];

  if (sortOrder === "low-to-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  } else if (sortOrder === "high-to-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  // Pagination
  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );

  const lastIndex = currentPage * productsPerPage;
  const firstIndex = lastIndex - productsPerPage;

  const currentProducts = sortedProducts.slice(
    firstIndex,
    lastIndex
  );

  if (isLoading) {
    return (
      <div className="products-message">
        <p>LOADING COLLECTION...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-message">
        <p>Unable to load products: {error}</p>
      </div>
    );
  }

  return (
    <main className="products-page">

      {/* Page Heading */}
      <section className="products-heading">
        <p className="products-subtitle">
          THE MODGARAGE COLLECTION
        </p>

        <h1>
          EXPLORE OUR <span>PRODUCTS.</span>
        </h1>

        <p>
          Premium automotive upgrades. Exceptional quality.
          Your vehicle, your identity.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="products-toolbar">

        <div className="products-search">
          <span className="search-icon">⌕</span>

          <input
            type="text"
            placeholder="Search automotive accessories..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <select
          value={selectedCategory}
          onChange={(event) => {
            const category = event.target.value;

            setSelectedCategory(category);
            setCurrentPage(1);

            if (category === "All") {
              setSearchParams({});
            } else {
              setSearchParams({ category });
            }
          }}
        >
          <option value="All">All Categories</option>
          <option value="Exterior Upgrades">Exterior Upgrades</option>
          <option value="Interior Upgrades">Interior Upgrades</option>
          <option value="Lighting">Lighting</option>
          <option value="Wheels & Tyres">Wheels & Tyres</option>
          <option value="Performance Parts">Performance Parts</option>
          <option value="Car Care & Detailing">
            Car Care & Detailing
          </option>
          <option value="Electronics & Accessories">
            Electronics & Accessories
          </option>
        </select>

        <select
          value={sortOrder}
          onChange={(event) => {
            setSortOrder(event.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="default">Sort: Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>

      </section>

      {/* Product Count */}
      <div className="products-count">
        <span>
          SHOWING {currentProducts.length} OF {filteredProducts.length} PRODUCTS
        </span>

        <span className="products-count-line"></span>
      </div>

      {/* Product Grid */}
      {currentProducts.length > 0 ? (
        <section className="products-grid">

          {currentProducts.map((product) => (
            <article className="product-card" key={product.id}>

              {/* Product Image */}
              <Link
                to={`/products/${product.id}`}
                className="product-image-container"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="product-image"
                  loading="lazy"
                />

                <span className="product-image-label">
                  MODGARAGE
                </span>

                <span className="product-image-arrow">
                  ↗
                </span>
              </Link>

              {/* Product Information */}
              <div className="product-info">

                <p className="product-category">
                  {product.category}
                </p>

                <h2>
                  <Link to={`/products/${product.id}`}>
                    {product.name}
                  </Link>
                </h2>

                <div className="product-price-row">
                  <p className="product-price">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  <span
                    className={
                      product.stock > 0
                        ? "product-stock in-stock"
                        : "product-stock out-of-stock"
                    }
                  >
                    {product.stock > 0
                      ? "IN STOCK"
                      : "OUT OF STOCK"}
                  </span>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="product-view-button"
                >
                  VIEW PRODUCT
                  <span>↗</span>
                </Link>

              </div>

            </article>
          ))}

        </section>
      ) : (
        <div className="no-products">
          <span>NO PRODUCTS FOUND</span>
          <p>Try another search or choose a different category.</p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="products-pagination">

          <button
            onClick={() => setCurrentPage((page) => page - 1)}
            disabled={currentPage === 1}
          >
            ← PREVIOUS
          </button>

          <span>
            PAGE <strong>{currentPage}</strong> OF {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((page) => page + 1)}
            disabled={currentPage === totalPages}
          >
            NEXT →
          </button>

        </div>
      )}

    </main>
  );
}

export default Products;
