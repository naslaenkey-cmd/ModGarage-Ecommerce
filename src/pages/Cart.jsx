
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";

import useCart from "../hooks/useCart";

function Cart() {
  const {
    cartItems,
    isLoading,
    isError,
    error,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
  } = useCart();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const totalQuantity = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  // Cart item animation
  const itemVariants = {
    hidden: {
      opacity: 0,
      x: -35,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      },
    },
    exit: {
      opacity: 0,
      x: 40,
      height: 0,
      paddingTop: 0,
      paddingBottom: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  // LOADING STATE
  if (isLoading) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#080808] text-[#D6B36A]">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Loading your cart...
        </motion.p>
      </section>
    );
  }

  // ERROR STATE
  if (isError) {
    return (
      <section className="flex min-h-screen flex-col items-center justify-center gap-4 bg-[#080808] text-center text-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold">
            Unable to load your cart
          </h2>

          <p className="mt-3 text-sm text-[#888]">
            {error?.message || "Something went wrong. Please try again."}
          </p>
        </motion.div>
      </section>
    );
  }

  // EMPTY CART
  if (cartItems.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex min-h-[100vh] flex-col justify-center bg-[#080808] px-[5%] py-[35px] text-center text-[#F5F3EE]"
      >
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto flex min-h-[65vh] w-full max-w-[600px] flex-col items-center justify-center px-[30px]"
        >
          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-[25px] text-[55px] grayscale"
          >
            🛒
          </motion.div>

          <p className="mb-3 text-[11px] font-bold tracking-[3px] text-[#D6B36A]">
            MODGARAGE SHOPPING
          </p>

          <h1 className="mb-3 font-['Bebas_Neue'] text-[clamp(40px,5vw,58px)] tracking-[2px]">
            YOUR CART IS EMPTY
          </h1>

          <p className="mb-7 max-w-[420px] text-sm leading-[1.8] text-[#888]">
            You haven't added any products yet.
            Discover premium upgrades for your vehicle.
          </p>

          <motion.div
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Link
              to="/products"
              className="inline-block bg-[#D6B36A] px-7 py-[15px] text-[11px] font-extrabold tracking-widest text-[#080808] transition hover:bg-[#E8C982]"
            >
              EXPLORE PRODUCTS
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-[#080808] px-[6%] py-[55px] text-[#F5F3EE] max-[500px]:px-[5%] max-[500px]:py-[35px]"
    >
      <div className="mx-auto max-w-[1400px]">

        {/* PAGE HEADING */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-[45px] max-[500px]:mb-[30px]"
        >
          <p className="mb-3 text-[11px] font-bold tracking-[3px] text-[#D6B36A]">
            MODGARAGE SHOPPING
          </p>

          <h1 className="mb-3 font-['Bebas_Neue'] text-[clamp(40px,5vw,58px)] font-normal tracking-[2px]">
            YOUR SHOPPING CART
          </h1>

          <p className="text-sm text-[#888]">
            Review your selected automotive upgrades.
          </p>
        </motion.div>

        {/* MAIN CART LAYOUT */}
        <div className="grid grid-cols-[minmax(0,1fr)_360px] items-start gap-10 max-[1000px]:grid-cols-[minmax(0,1fr)_300px] max-[750px]:grid-cols-1 max-[1000px]:gap-[25px]">

          {/* CART ITEMS */}
          <div className="min-w-0">

            <div className="mb-[10px] flex items-center justify-between border-b border-[#292929] pb-5">

              <h2 className="font-['Oswald'] text-[17px] font-medium tracking-wide">
                YOUR ITEMS
              </h2>

              <span className="text-[11px] tracking-wide text-[#D6B36A]">
                {cartItems.length} PRODUCTS
              </span>

            </div>

            {/* PRODUCT LIST */}
            <motion.div
              initial="hidden"
              animate="visible"
              transition={{
                staggerChildren: 0.12,
              }}
            >
              <AnimatePresence initial={false}>
                {cartItems.map((item) => (
                  <motion.div
                    className="grid grid-cols-[145px_minmax(0,1fr)_auto] items-center gap-[25px] overflow-hidden border-b border-[#292929] py-[25px] max-[1000px]:grid-cols-[120px_minmax(0,1fr)_auto] max-[1000px]:gap-[18px] max-[500px]:relative max-[500px]:grid-cols-[95px_minmax(0,1fr)] max-[500px]:gap-[15px] max-[500px]:pb-[55px]"
                    key={item.id}
                    variants={itemVariants}
                    exit="exit"
                    layout
                  >

                    {/* PRODUCT IMAGE */}
                    <Link
                      to={`/products/${item.id}`}
                      className="block h-[145px] w-[145px] overflow-hidden bg-[#151515] max-[1000px]:size-[120px] max-[500px]:h-[110px] max-[500px]:w-[95px]"
                    >
                      {item.image && (
                        <motion.img
                          src={item.image}
                          alt={item.name}
                          whileHover={{ scale: 1.09 }}
                          transition={{ duration: 0.4 }}
                          className="block size-full object-cover"
                        />
                      )}
                    </Link>

                    {/* PRODUCT INFORMATION */}
                    <div className="min-w-0">

                      <p className="mb-[9px] text-[10px] uppercase tracking-[1.5px] text-[#D6B36A]">
                        {item.category}
                      </p>

                      <Link
                        to={`/products/${item.id}`}
                        className="mb-[10px] inline-block font-['Oswald'] text-[19px] font-medium text-[#F5F3EE] transition hover:text-[#D6B36A] max-[500px]:text-base"
                      >
                        {item.name}
                      </Link>

                      <p className="mb-[15px] text-sm text-[#AAA]">
                        {formatPrice(item.price)}
                      </p>

                      {/* QUANTITY CONTROL */}
                      <div className="inline-flex items-center border border-[#393939]">

                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => decreaseQuantity(item.id)}
                          disabled={item.quantity <= 1}
                          aria-label="Decrease quantity"
                          className="h-8 w-[34px] bg-[#171717] text-[19px] text-[#D6B36A] transition hover:bg-[#292929] disabled:cursor-not-allowed disabled:text-[#555]"
                        >
                          −
                        </motion.button>

                        <AnimatePresence mode="wait">
                          <motion.span
                            key={item.quantity}
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.15 }}
                            className="w-[35px] text-center text-[13px]"
                          >
                            {item.quantity}
                          </motion.span>
                        </AnimatePresence>

                        <motion.button
                          whileTap={{ scale: 0.85 }}
                          onClick={() => increaseQuantity(item.id)}
                          disabled={item.quantity >= item.stock}
                          aria-label="Increase quantity"
                          className="h-8 w-[34px] bg-[#171717] text-[19px] text-[#D6B36A] transition hover:bg-[#292929] disabled:cursor-not-allowed disabled:text-[#555]"
                        >
                          +
                        </motion.button>

                      </div>

                    </div>

                    {/* SUBTOTAL AND REMOVE */}
                    <div className="flex flex-col items-end gap-5 max-[500px]:absolute max-[500px]:bottom-[15px] max-[500px]:right-0 max-[500px]:flex-row max-[500px]:items-center">

                      <p className="whitespace-nowrap text-[17px] font-bold text-[#D6B36A] max-[500px]:text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </p>

                      <motion.button
                        whileHover={{ scale: 1.06, x: -3 }}
                        whileTap={{ scale: 0.94 }}
                        transition={{ duration: 0.2 }}
                        className="text-[10px] font-bold tracking-widest text-[#888] transition hover:text-[#ED7777]"
                        onClick={() => removeFromCart(item.id)}
                      >
                        REMOVE
                      </motion.button>

                    </div>

                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* CONTINUE SHOPPING */}
            <motion.div whileHover={{ x: 5 }}>
              <Link
                to="/products"
                className="mt-[25px] inline-block text-[11px] font-semibold tracking-wide text-[#AAA] transition hover:text-[#D6B36A]"
              >
                ← CONTINUE SHOPPING
              </Link>
            </motion.div>

          </div>

          {/* ORDER SUMMARY */}
          <motion.aside
            initial={{ opacity: 0, x: 35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              delay: 0.25,
              ease: "easeOut",
            }}
            className="sticky top-[110px] border border-[#292929] bg-[#121212] p-7 max-[750px]:static max-[500px]:p-[22px]"
          >

            <h2 className="mb-[25px] font-['Oswald'] text-xl font-medium tracking-wide">
              ORDER SUMMARY
            </h2>

            <div className="mb-[18px] flex justify-between text-[13px] text-[#999]">
              <span>Products</span>
              <span className="text-[#EEE]">
                {cartItems.length}
              </span>
            </div>

            <div className="mb-[18px] flex justify-between text-[13px] text-[#999]">
              <span>Total Quantity</span>
              <span className="text-[#EEE]">
                {totalQuantity}
              </span>
            </div>

            <div className="my-[22px] h-px bg-[#333]" />

            <div className="flex items-center justify-between gap-3">

              <span className="text-sm font-semibold text-[#EEE]">
                Subtotal
              </span>

              <motion.span
                key={totalPrice}
                initial={{ opacity: 0.5, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.25 }}
                className="text-[22px] font-bold text-[#D6B36A]"
              >
                {formatPrice(totalPrice)}
              </motion.span>

            </div>

            <p className="my-[18px] text-[11px] leading-[1.7] text-[#777]">
              Shipping charges, if applicable, will be
              calculated during checkout.
            </p>

            {/* CHECKOUT BUTTON */}
            <motion.div
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.2 }}
            >
              <Link
                to="/checkout"
                className="block w-full bg-[#D6B36A] px-3 py-4 text-center text-[11px] font-extrabold tracking-wide text-[#080808] transition hover:bg-[#E8C982]"
              >
                PROCEED TO CHECKOUT
              </Link>
            </motion.div>

            {/* SUMMARY BENEFITS */}
            <div className="mt-[18px] flex items-center gap-[10px] text-[11px] text-[#999]">
              <span className="font-bold text-[#D6B36A]">✓</span>
              Premium automotive collection
            </div>

            <div className="mt-[18px] flex items-center gap-[10px] text-[11px] text-[#999]">
              <span className="font-bold text-[#D6B36A]">✓</span>
              Secure checkout experience
            </div>

          </motion.aside>

        </div>
      </div>
    </motion.section>
  );
}

export default Cart;
