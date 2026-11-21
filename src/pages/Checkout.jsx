
import { useState, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "motion/react";

import { createOrder } from "../services/orderApi";
import { getUserById } from "../services/userApi";
import useCart from "../hooks/useCart";

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, staggerChildren: 0.12 },
  },
};

const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideLeft = {
  hidden: { opacity: 0, x: -35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

const slideRight = {
  hidden: { opacity: 0, x: 35 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: "easeOut" },
  },
};

function Checkout() {
  const user = useSelector((state) => state.auth.user);

  const queryClient = useQueryClient();

  const {
    cartItems,
    isLoading: isCartLoading,
    isError: isCartError,
    error: cartError,
    clearCart,
  } = useCart();

  // TanStack Query mutation for placing orders
  const {
    mutateAsync: submitOrder,
    isPending: isPlacingOrder,
    error,
  } = useMutation({
    mutationFn: createOrder,

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders", user?.id],
      });
    },
  });

  const [orderPlaced, setOrderPlaced] = useState(false);

  // Account verification loading state
  const [isCheckingAccount, setIsCheckingAccount] = useState(false);

  // Scroll to the top after the success screen is rendered
  useLayoutEffect(() => {
    if (orderPlaced) {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "instant",
      });

      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    }
  }, [orderPlaced]);

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Verify account status before placing an order
  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    if (!user?.id) {
      toast.error("Please login before placing an order.");
      return;
    }

    if (cartItems.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    setIsCheckingAccount(true);

    try {
      // Fetch the latest customer details from JSON Server
      const latestUser = await getUserById(user.id);

      // Prevent blocked customers from placing orders
      if (latestUser.isBlocked === true) {
        toast.error(
          "Your account has been blocked by the administrator. Please contact support."
        );
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

      // Create order only if the account is active
      await submitOrder(orderData);

      setOrderPlaced(true);

      // Clear cart after successful order placement
      try {
        await clearCart();
      } catch {
        toast.warning(
          "Order placed, but your cart could not be cleared."
        );
      }

      toast.success("Your order has been placed successfully!");
    } catch (err) {
      toast.error(
        err?.response?.data?.message ||
          err?.message ||
          "Unable to verify your account or place your order."
      );
    } finally {
      setIsCheckingAccount(false);
    }
  };

  const inputClass =
    "mt-2 w-full rounded-lg border border-[#30343B] bg-[#11161D] px-4 py-3 text-sm text-white outline-none transition focus:border-[#D6B36A]";

  const sectionHeadingClass =
    "mb-6 border-b border-[#30343B] pb-4";

  const headingTextClass =
    "text-lg font-semibold tracking-wide text-white";

  // Loading State
  if (isCartLoading) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-screen bg-[#080808] px-[7%] py-20 text-center text-white"
      >
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-[#D6B36A]"
        >
          Loading checkout...
        </motion.p>
      </motion.section>
    );
  }

  // Cart Error State
  if (isCartError) {
    return (
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="min-h-screen bg-[#080808] px-[7%] py-20 text-center text-white"
      >
        <h2 className="mb-3 text-2xl font-semibold">
          Unable to Load Cart
        </h2>

        <p className="mb-6 text-[#A3AAB5]">
          {cartError?.message || "Something went wrong."}
        </p>

        <Link
          to="/cart"
          className="inline-block rounded-lg bg-[#D6B36A] px-6 py-3 font-semibold text-black transition hover:bg-[#E8C982]"
        >
          Back to Cart
        </Link>
      </motion.section>
    );
  }

  // Order Success State
  if (orderPlaced) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-[#080808] px-[7%] py-20 text-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 35 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="w-full max-w-xl rounded-2xl border border-[#30343B] bg-[#11161D] p-10"
        >
          <motion.div
            initial={{ scale: 0, rotate: -45 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{
              delay: 0.3,
              type: "spring",
              stiffness: 180,
              damping: 12,
            }}
            className="mb-6 text-5xl text-[#D6B36A]"
          >
            ✓
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="mb-4 text-3xl font-semibold"
          >
            Order Placed Successfully!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mb-8 text-sm leading-7 text-[#A3AAB5]"
          >
            Thank you for shopping with ModGarage.
            Your order has been placed successfully.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link
              to="/orders"
              className="rounded-lg bg-[#D6B36A] px-6 py-3 text-sm font-semibold text-black transition hover:bg-[#E8C982]"
            >
              View My Orders
            </Link>

            <Link
              to="/products"
              className="rounded-lg border border-[#D6B36A] px-6 py-3 text-sm font-semibold text-[#D6B36A] transition hover:bg-[#D6B36A] hover:text-black"
            >
              Continue Shopping
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    );
  }

  // Empty Cart State
  if (cartItems.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-screen items-center justify-center bg-[#080808] px-[7%] py-20 text-center text-white"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-semibold">
            Your Cart is Empty
          </h2>

          <p className="mb-8 text-[#A3AAB5]">
            Add some products before proceeding to checkout.
          </p>

          <Link
            to="/products"
            className="rounded-lg bg-[#D6B36A] px-6 py-3 font-semibold text-black transition hover:bg-[#E8C982]"
          >
            Explore Products
          </Link>
        </motion.div>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen bg-[#080808] px-[7%] py-14 text-white max-[600px]:px-[5%]"
    >
      {/* PAGE HEADING */}
      <motion.div variants={slideUp} className="mb-10">
        <p className="mb-3 text-xs font-semibold tracking-[4px] text-[#D6B36A]">
          MODGARAGE / CHECKOUT
        </p>

        <h1 className="text-3xl font-bold tracking-wide">
          Complete Your Order
        </h1>

        <p className="mt-3 text-sm text-[#A3AAB5]">
          Enter your details to complete your purchase.
        </p>
      </motion.div>

      <form onSubmit={handlePlaceOrder}>
        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-[minmax(0,1.8fr)_minmax(260px,0.75fr)] items-start gap-8 max-[900px]:grid-cols-1">

          {/* LEFT SIDE - CHECKOUT DETAILS */}
          <motion.div
            variants={pageVariants}
            className="flex flex-col gap-7"
          >
            {/* CUSTOMER DETAILS */}
            <motion.div
              variants={slideLeft}
              whileHover={{ borderColor: "#454B55" }}
              className="rounded-xl border border-[#30343B] bg-[#11161D] p-7 transition-colors max-[600px]:p-5"
            >
              <div className={sectionHeadingClass}>
                <h2 className={headingTextClass}>
                  Customer Details
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-5 max-[600px]:grid-cols-1">
                <div>
                  <label className="text-sm text-[#A3AAB5]">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={inputClass}
                    required
                  />
                </div>

                <div>
                  <label className="text-sm text-[#A3AAB5]">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                    className={inputClass}
                    required
                  />
                </div>

                <div className="col-span-2 max-[600px]:col-span-1">
                  <label className="text-sm text-[#A3AAB5]">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="Enter your phone number"
                    className={inputClass}
                    required
                  />
                </div>
              </div>
            </motion.div>

            {/* DELIVERY ADDRESS */}
            <motion.div
              variants={slideLeft}
              whileHover={{ borderColor: "#454B55" }}
              className="rounded-xl border border-[#30343B] bg-[#11161D] p-7 transition-colors max-[600px]:p-5"
            >
              <div className={sectionHeadingClass}>
                <h2 className={headingTextClass}>
                  Delivery Address
                </h2>
              </div>

              <div>
                <label className="text-sm text-[#A3AAB5]">
                  Complete Address
                </label>

                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter your complete delivery address"
                  rows="4"
                  className={`${inputClass} resize-none`}
                  required
                />
              </div>
            </motion.div>

            {/* PAYMENT METHOD */}
            <motion.div
              variants={slideLeft}
              whileHover={{ borderColor: "#454B55" }}
              className="rounded-xl border border-[#30343B] bg-[#11161D] p-7 transition-colors max-[600px]:p-5"
            >
              <div className={sectionHeadingClass}>
                <h2 className={headingTextClass}>
                  Payment Method
                </h2>
              </div>

              <div>
                <label className="text-sm text-[#A3AAB5]">
                  Select Payment Method
                </label>

                <select
                  name="paymentMethod"
                  value={formData.paymentMethod}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="Cash on Delivery">
                    Cash on Delivery
                  </option>

                  <option value="UPI">
                    UPI
                  </option>

                  <option value="Credit/Debit Card">
                    Credit/Debit Card
                  </option>
                </select>
              </div>
            </motion.div>

            {/* YOUR ORDER */}
            <motion.div
              variants={slideLeft}
              whileHover={{ borderColor: "#454B55" }}
              className="rounded-xl border border-[#30343B] bg-[#11161D] p-7 transition-colors max-[600px]:p-5"
            >
              <div className={sectionHeadingClass}>
                <h2 className={headingTextClass}>
                  Your Order
                </h2>
              </div>

              <div className="flex flex-col gap-5">
                <AnimatePresence initial={false}>
                  {cartItems.map((item) => (
                    <motion.div
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: -25 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 25 }}
                      transition={{ duration: 0.35 }}
                      className="flex items-center gap-5 border-b border-[#30343B] pb-5 last:border-0 last:pb-0"
                    >
                      <motion.img
                        src={item.image}
                        alt={item.name}
                        whileHover={{ scale: 1.08 }}
                        transition={{ duration: 0.3 }}
                        className="h-20 w-20 rounded-lg bg-[#080808] object-contain p-2"
                      />

                      <div className="min-w-0 flex-1">
                        <h3 className="truncate font-medium text-white">
                          {item.name}
                        </h3>

                        <p className="mt-2 text-sm text-[#A3AAB5]">
                          Quantity: {item.quantity}
                        </p>
                      </div>

                      <p className="whitespace-nowrap text-sm font-semibold text-[#D6B36A]">
                        {formatPrice(item.price * item.quantity)}
                      </p>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <motion.aside
            variants={slideRight}
            whileHover={{ borderColor: "#454B55" }}
            className="sticky top-5 flex min-h-[500px] flex-col rounded-xl border border-[#30343B] bg-[#11161D] p-7 transition-colors max-[900px]:static max-[600px]:p-5"
          >
            <div className={sectionHeadingClass}>
              <h2 className={headingTextClass}>
                Order Summary
              </h2>
            </div>

            <div className="flex flex-col gap-5">
              <div className="flex justify-between text-sm">
                <span className="text-[#A3AAB5]">
                  Total Products
                </span>

                <span className="font-medium text-white">
                  {cartItems.length}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#A3AAB5]">
                  Total Quantity
                </span>

                <span className="font-medium text-white">
                  {cartItems.reduce(
                    (total, item) => total + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#A3AAB5]">
                  Subtotal
                </span>

                <span className="font-medium text-white">
                  {formatPrice(totalPrice)}
                </span>
              </div>

              <div className="flex justify-between text-sm">
                <span className="text-[#A3AAB5]">
                  Delivery
                </span>

                <span className="font-medium text-[#22C55E]">
                  Free
                </span>
              </div>

              <div className="border-t border-[#30343B] pt-5">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-white">
                    Total Amount
                  </span>

                  <motion.span
                    key={totalPrice}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-xl font-bold text-[#D6B36A]"
                  >
                    {formatPrice(totalPrice)}
                  </motion.span>
                </div>
              </div>
            </div>

            {/* BUTTON AT THE BOTTOM */}
            <div className="mt-auto pt-10">
              <p className="mb-5 text-xs leading-6 text-[#A3AAB5]">
                Please verify your delivery details before placing your order.
              </p>

              {error && (
                <p className="mb-4 text-sm text-red-400">
                  {error?.response?.data?.message ||
                    error?.message ||
                    "Unable to place your order. Please try again."}
                </p>
              )}

              <motion.button
                type="submit"
                disabled={isPlacingOrder || isCheckingAccount}
                whileHover={
                  !isPlacingOrder && !isCheckingAccount
                    ? { scale: 1.02 }
                    : {}
                }
                whileTap={
                  !isPlacingOrder && !isCheckingAccount
                    ? { scale: 0.97 }
                    : {}
                }
                transition={{ duration: 0.2 }}
                className="w-full rounded-lg bg-[#D6B36A] px-6 py-4 text-sm font-bold tracking-wider text-black transition hover:bg-[#E8C982] disabled:cursor-not-allowed disabled:opacity-50"
              >
                {isCheckingAccount
                  ? "VERIFYING ACCOUNT..."
                  : isPlacingOrder
                    ? "PLACING ORDER..."
                    : "PLACE ORDER"}
              </motion.button>

              <Link
                to="/cart"
                className="mt-4 block text-center text-sm text-[#A3AAB5] transition hover:text-[#D6B36A]"
              >
                ← Back to Cart
              </Link>
            </div>
          </motion.aside>
        </div>
      </form>
    </motion.section>
  );
}

export default Checkout;
