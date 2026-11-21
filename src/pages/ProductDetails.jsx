
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { motion } from "motion/react";

import { getProductById } from "../services/productApi";
import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

function ProductDetails() {
  const { id } = useParams();

  const { addToCart } = useCart();

  const {
    wishlistItems,
    addToWishlist,
  } = useWishlist();

  const {
    data: product,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
  });

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setQuantity(1);
  }, [id]);

  const isInWishlist = wishlistItems.some(
    (item) => String(item.id) === String(id)
  );

  const handleAddToCart = () => {
    if (!product || product.stock <= 0) {
      toast.error("This product is out of stock");
      return;
    }

    addToCart({
      ...product,
      quantity,
    });

    toast.success("Product added to cart");
  };

  const handleAddToWishlist = () => {
    if (isInWishlist) {
      toast.info("Product is already in your wishlist");
      return;
    }

    addToWishlist(product);
    toast.success("Added to wishlist");
  };

  // Animation Variants
  const imageVariants = {
    hidden: {
      opacity: 0,
      x: -50,
      scale: 0.94,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  };

  const contentVariants = {
    hidden: {
      opacity: 0,
      x: 40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.12,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: 18,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-[#080808] text-white">
        Loading product...
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div className="flex min-h-[70vh] flex-col items-center justify-center gap-5 bg-[#080808] text-white">
        <h2 className="text-2xl font-semibold">
          Product not found
        </h2>

        <Link
          to="/products"
          className="rounded-md bg-[#D6B36A] px-6 py-3 font-semibold text-black"
        >
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <motion.section
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#080808] px-[7%] py-8 text-white max-[600px]:px-[5%] max-[600px]:py-6"
    >

      {/* Breadcrumb */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="mb-6 flex flex-wrap items-center gap-2 text-sm text-[#A3AAB5]"
      >
        <Link to="/" className="transition hover:text-[#D6B36A]">
          Home
        </Link>

        <span>/</span>

        <Link to="/products" className="transition hover:text-[#D6B36A]">
          Products
        </Link>

        <span>/</span>

        <span className="text-[#D6B36A]">
          {product.name}
        </span>
      </motion.div>

      {/* Product Details */}
      <div className="grid grid-cols-2 items-center gap-10 max-[768px]:grid-cols-1 max-[768px]:gap-7">

        {/* Product Image */}
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-center"
        >
          <motion.img
            src={product.image}
            alt={product.name}
            whileHover={{ scale: 1.035 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="h-[min(58vh,500px)] w-full rounded-lg object-contain max-[768px]:h-[350px] max-[480px]:h-[280px]"
          />
        </motion.div>

        {/* Product Information */}
        <motion.div
          variants={contentVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col gap-4"
        >

          <motion.p
            variants={itemVariants}
            className="text-sm font-semibold uppercase tracking-[3px] text-[#D6B36A]"
          >
            {product.category}
          </motion.p>

          <motion.h1
            variants={itemVariants}
            className="text-3xl font-bold leading-tight max-[600px]:text-2xl"
          >
            {product.name}
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="text-2xl font-semibold text-[#D6B36A]"
          >
            ₹{Number(product.price).toLocaleString("en-IN")}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-sm leading-7 text-[#A3AAB5]"
          >
            {product.description}
          </motion.p>

          <motion.p
            variants={itemVariants}
            className={`text-sm font-medium ${
              product.stock > 0
                ? "text-green-500"
                : "text-red-400"
            }`}
          >
            {product.stock > 0
              ? `${product.stock} items available`
              : "Out of Stock"}
          </motion.p>

          {/* Quantity */}
          {product.stock > 0 && (
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4"
            >
              <span className="text-sm text-[#A3AAB5]">
                Quantity
              </span>

              <div className="flex items-center overflow-hidden rounded-md border border-[#30343B]">
                <button
                  onClick={() =>
                    setQuantity((prev) => Math.max(1, prev - 1))
                  }
                  disabled={quantity <= 1}
                  className="px-4 py-2 text-lg transition hover:bg-[#171C23] disabled:opacity-40"
                >
                  -
                </button>

                <span className="min-w-10 text-center">
                  {quantity}
                </span>

                <button
                  onClick={() =>
                    setQuantity((prev) =>
                      Math.min(product.stock, prev + 1)
                    )
                  }
                  disabled={quantity >= product.stock}
                  className="px-4 py-2 text-lg transition hover:bg-[#171C23] disabled:opacity-40"
                >
                  +
                </button>
              </div>
            </motion.div>
          )}

          {/* Action Buttons */}
          <motion.div
            variants={itemVariants}
            className="mt-2 flex flex-wrap gap-3"
          >
            <motion.button
              onClick={handleAddToCart}
              disabled={product.stock <= 0}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="min-h-[45px] flex-1 rounded-md bg-[#D6B36A] px-5 py-3 text-sm font-bold text-black transition hover:bg-[#E8C982] disabled:cursor-not-allowed disabled:opacity-50"
            >
              ADD TO CART
            </motion.button>

            <motion.button
              onClick={handleAddToWishlist}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
              className="min-h-[45px] flex-1 rounded-md border border-[#D6B36A] px-5 py-3 text-sm font-bold text-[#D6B36A] transition hover:bg-[#D6B36A] hover:text-black"
            >
              ADD TO WISHLIST
            </motion.button>
          </motion.div>

          {/* Extra Information */}
          <motion.div
            variants={itemVariants}
            className="mt-3 grid grid-cols-2 gap-4 border-t border-[#30343B] pt-5"
          >
            <div>
              <p className="text-sm font-semibold text-white">
                Premium Quality
              </p>

              <p className="mt-1 text-xs text-[#A3AAB5]">
                Carefully selected products
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                Trusted Collection
              </p>

              <p className="mt-1 text-xs text-[#A3AAB5]">
                Upgrade your driving experience
              </p>
            </div>
          </motion.div>

        </motion.div>
      </div>

      {/* Continue Shopping */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="mt-10 border-t border-[#30343B] pt-6"
      >
        <motion.div whileHover={{ x: 5 }}>
          <Link
            to="/products"
            className="text-sm font-semibold text-[#D6B36A] transition hover:text-[#E8C982]"
          >
            ← Continue Shopping
          </Link>
        </motion.div>
      </motion.div>

    </motion.section>
  );
}

export default ProductDetails;
