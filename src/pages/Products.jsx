
import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion } from "motion/react";

import { getProducts } from "../services/productApi";

function Products() {
  // Fetch products using TanStack Query
  const {
    data: products = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("default");

  const [searchParams, setSearchParams] = useSearchParams();

  const categoryFromUrl =
    searchParams.get("category") || "All";

  const [selectedCategory, setSelectedCategory] =
    useState(categoryFromUrl);

  const productsPerPage = 8;

  // Product Card Animation
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 35,
      scale: 0.96,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  // Synchronize category with URL
  useEffect(() => {
    setSelectedCategory(categoryFromUrl);
    setCurrentPage(1);
  }, [categoryFromUrl]);

  // Search and category filtering
  const filteredProducts = products.filter((product) => {
    const matchesSearch = (product.name || "")
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
    sortedProducts.sort(
      (a, b) => Number(a.price) - Number(b.price)
    );
  } else if (sortOrder === "high-to-low") {
    sortedProducts.sort(
      (a, b) => Number(b.price) - Number(a.price)
    );
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

  // Loading state
  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center overflow-x-clip bg-[#080808] px-5 text-center">
        <p className="text-sm font-semibold tracking-[3px] text-[#D6B36A]">
          LOADING COLLECTION...
        </p>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="flex min-h-[70vh] w-full items-center justify-center overflow-x-clip bg-[#080808] px-5 text-center">
        <p className="break-words text-sm text-red-400">
          Unable to load products: {error?.message}
        </p>
      </div>
    );
  }

  return (
    <main className="w-full min-w-0 max-w-full overflow-x-clip bg-[#080808] px-4 py-8 text-white sm:px-6 sm:py-10 lg:px-[5%] lg:py-[60px]">

      {/* Page Heading */}
      <section className="mb-8 w-full min-w-0 text-center sm:mb-10 lg:mb-[45px]">
        <p className="mb-3 text-[10px] font-semibold tracking-[2px] text-[#D6B36A] sm:text-xs sm:tracking-[3px]">
          THE MODGARAGE COLLECTION
        </p>

        <h1 className="my-3 text-[clamp(25px,7vw,42px)] font-bold leading-tight tracking-[1px] text-[#F5F3EE]">
          EXPLORE OUR{" "}
          <span className="text-[#D6B36A]">PRODUCTS.</span>
        </h1>

        <p className="mx-auto max-w-[550px] text-xs leading-[1.8] text-[#999999] sm:text-sm">
          Premium automotive upgrades. Exceptional quality.
          Your vehicle, your identity.
        </p>
      </section>

      {/* Search and Filters */}
      <section className="mb-5 grid w-full min-w-0 grid-cols-1 gap-3 sm:grid-cols-2 lg:flex lg:flex-wrap">

        {/* Search */}
        <div className="relative w-full min-w-0 lg:min-w-[200px] lg:flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[22px] text-[#D6B36A]">
            ⌕
          </span>

          <input
            type="text"
            placeholder="Search automotive accessories..."
            value={searchTerm}
            onChange={(event) => {
              setSearchTerm(event.target.value);
              setCurrentPage(1);
            }}
            className="!w-full !min-w-0 !rounded-[4px] !border-[#333333] !bg-[#151515] !py-3 !pl-12 !pr-4 !text-sm !text-white placeholder:!text-[#777777]"
          />
        </div>

        {/* Category Filter */}
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
          className="!w-full !min-w-0 !max-w-full !cursor-pointer !rounded-[4px] !border-[#333333] !bg-[#151515] !px-4 !py-3 !text-sm !text-white lg:!w-auto"
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

        {/* Sorting */}
        <select
          value={sortOrder}
          onChange={(event) => {
            setSortOrder(event.target.value);
            setCurrentPage(1);
          }}
          className="!w-full !min-w-0 !max-w-full !cursor-pointer !rounded-[4px] !border-[#333333] !bg-[#151515] !px-4 !py-3 !text-sm !text-white lg:!w-auto"
        >
          <option value="default">Sort: Default</option>
          <option value="low-to-high">Price: Low to High</option>
          <option value="high-to-low">Price: High to Low</option>
        </select>
      </section>

      {/* Product Count */}
      <div className="mb-5 flex w-full min-w-0 items-center gap-3 text-[10px] text-[#999999] sm:text-[13px]">
        <span className="shrink-0">
          SHOWING {currentProducts.length} OF {filteredProducts.length} PRODUCTS
        </span>

        <span className="h-px min-w-0 flex-1 bg-[#292929]" />
      </div>

      {/* Product Grid */}
      {currentProducts.length > 0 ? (
        <motion.section
          key={`${selectedCategory}-${sortOrder}-${currentPage}`}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid w-full min-w-0 grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {currentProducts.map((product) => (
            <motion.article
              key={product.id}
              variants={cardVariants}
              whileHover={{
                y: -6,
                transition: { duration: 0.25 },
              }}
              className="group w-full min-w-0 overflow-hidden rounded-md border border-[#252525] bg-[#111111] transition-colors duration-300 hover:border-[#D6B36A]"
            >
              {/* Product Image */}
              <Link
                to={`/products/${product.id}`}
                className="relative block aspect-[4/3] w-full overflow-hidden bg-[#111111]"
              >
                <motion.img
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="h-full w-full object-cover"
                />

                <span className="absolute left-3 top-3 bg-black/70 px-3 py-1 text-[9px] font-bold tracking-[2px] text-[#D6B36A]">
                  MODGARAGE
                </span>

                <span className="absolute bottom-3 right-3 flex h-8 w-8 items-center justify-center bg-[#D6B36A] text-lg text-black opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  ↗
                </span>
              </Link>

              {/* Product Information */}
              <div className="min-w-0 p-4 sm:p-[18px]">
                <p className="mb-2 break-words text-[11px] uppercase tracking-[1px] text-[#D6B36A]">
                  {product.category}
                </p>

                <h2 className="mb-[10px] break-words text-[15px] font-semibold text-[#F5F3EE] sm:text-base">
                  <Link
                    to={`/products/${product.id}`}
                    className="text-[#F5F3EE] transition-colors duration-200 hover:text-[#D6B36A]"
                  >
                    {product.name}
                  </Link>
                </h2>

                {/* Price and Stock */}
                <div className="mb-4 flex min-w-0 flex-wrap items-center justify-between gap-2">
                  <p className="my-3 text-[19px] font-semibold text-white">
                    ₹{Number(product.price).toLocaleString("en-IN")}
                  </p>

                  <span
                    className={`text-[11px] ${
                      Number(product.stock) > 0
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {Number(product.stock) > 0
                      ? "IN STOCK"
                      : "OUT OF STOCK"}
                  </span>
                </div>

                {/* View Product Button */}
                <Link
                  to={`/products/${product.id}`}
                  className="flex min-h-[44px] w-full items-center justify-center gap-3 border border-[#D6B36A] px-3 py-3 text-center text-[12px] font-semibold tracking-[1px] text-[#D6B36A] transition-all duration-300 hover:bg-[#D6B36A] hover:text-[#080808]"
                >
                  VIEW PRODUCT
                  <span className="text-base">↗</span>
                </Link>
              </div>
            </motion.article>
          ))}
        </motion.section>
      ) : (
        /* No Products Found */
        <div className="w-full px-5 py-12 text-center">
          <span className="text-sm font-semibold tracking-[2px] text-[#D6B36A]">
            NO PRODUCTS FOUND
          </span>

          <p className="mt-3 text-sm text-[#999999]">
            Try another search or choose a different category.
          </p>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-8 flex w-full flex-wrap items-center justify-center gap-4 sm:mt-[50px] sm:gap-[25px]">
          <button
            onClick={() =>
              setCurrentPage((page) => page - 1)
            }
            disabled={currentPage === 1}
            className="min-h-[42px] border border-[#D6B36A] bg-transparent px-4 py-[10px] text-[10px] font-semibold tracking-[1px] text-[#D6B36A] transition-colors hover:bg-[#D6B36A] hover:text-[#080808] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:text-xs"
          >
            ← PREVIOUS
          </button>

          <span className="text-xs text-[#CCCCCC] sm:text-sm">
            PAGE{" "}
            <strong className="text-[#D6B36A]">
              {currentPage}
            </strong>{" "}
            OF {totalPages}
          </span>

          <button
            onClick={() =>
              setCurrentPage((page) => page + 1)
            }
            disabled={currentPage === totalPages}
            className="min-h-[42px] border border-[#D6B36A] bg-transparent px-4 py-[10px] text-[10px] font-semibold tracking-[1px] text-[#D6B36A] transition-colors hover:bg-[#D6B36A] hover:text-[#080808] disabled:cursor-not-allowed disabled:opacity-40 sm:px-5 sm:text-xs"
          >
            NEXT →
          </button>
        </div>
      )}
    </main>
  );
}

export default Products;
