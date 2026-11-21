
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "motion/react";

import { getUserOrders } from "../services/orderApi";

// Page animation
const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.12,
    },
  },
};

// Slide-up animation
const slideUp = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

// Order card animation
const orderVariants = {
  hidden: {
    opacity: 0,
    y: 35,
    scale: 0.97,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

function OrderHistory() {
  const user = useSelector((state) => state.auth.user);

  // Fetch only the logged-in user's orders
  const {
    data: myOrders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", user?.id],
    queryFn: () => getUserOrders(user.id),
    enabled: Boolean(user?.id),
  });

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString("en-IN")}`;

  // Loading state
  if (isLoading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex min-h-[60vh] items-center justify-center bg-[#080808] text-[15px] text-[#D6B36A]"
      >
        <motion.p
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Loading your orders...
        </motion.p>
      </motion.div>
    );
  }

  // Error state
  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex min-h-[60vh] items-center justify-center bg-[#080808] text-[15px] text-[#E58B8B]"
      >
        <p>Unable to load orders: {error.message}</p>
      </motion.div>
    );
  }

  // Empty orders state
  if (myOrders.length === 0) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="min-h-[80vh] bg-[#080808] px-[6%] py-16 text-[#F5F3EE]"
      >
        <motion.div
          initial={{ opacity: 0, y: 35, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{
            duration: 0.7,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="mx-auto my-[70px] max-w-[550px] border border-[#292929] bg-[#111] px-[30px] py-[55px] text-center"
        >
          <motion.span
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="mb-5 block text-[45px] text-[#C49A45]"
          >
            ⌑
          </motion.span>

          <p className="mb-3 font-['Oswald'] text-[13px] tracking-[3px] text-[#C49A45]">
            YOUR GARAGE
          </p>

          <h1 className="my-2.5 font-['Bebas_Neue'] text-[42px]">
            No Orders Yet
          </h1>

          <p className="mb-[25px] text-sm leading-[1.7] text-[#999]">
            Your order history will appear here once you place your
            first order.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="inline-block"
          >
            <Link
              to="/products"
              className="inline-block bg-[#C49A45] px-[25px] py-[13px] text-[13px] font-bold text-[#080808] transition duration-300 hover:bg-[#E8C982]"
            >
              Explore Products
            </Link>
          </motion.div>
        </motion.div>
      </motion.section>
    );
  }

  return (
    <motion.section
      variants={pageVariants}
      initial="hidden"
      animate="visible"
      className="min-h-[80vh] bg-[#080808] px-[6%] py-[65px] text-[#F5F3EE] max-[700px]:px-[5%] max-[700px]:py-[45px]"
    >
      <div className="mx-auto max-w-[1150px]">

        {/* Page Heading */}
        <motion.div
          variants={slideUp}
          className="mb-[45px]"
        >
          <p className="mb-3 font-['Oswald'] text-[13px] tracking-[3px] text-[#C49A45]">
            YOUR GARAGE
          </p>

          <h1 className="font-['Bebas_Neue'] text-[clamp(42px,6vw,65px)] tracking-[2px]">
            MY <span className="text-[#C49A45]">ORDERS</span>
          </h1>

          <p className="mt-2.5 text-sm text-[#999]">
            Track your purchases and revisit your upgrades.
          </p>
        </motion.div>

        {/* Orders List */}
        <motion.div
          variants={pageVariants}
          className="flex flex-col gap-[25px]"
        >
          <AnimatePresence initial={false}>
            {myOrders.map((order) => (
              <motion.article
                key={order.id}
                variants={orderVariants}
                layout
                whileHover={{
                  y: -5,
                  borderColor: "#8C6B30",
                  transition: { duration: 0.25 },
                }}
                className="border border-[#292929] bg-[#111] p-7 transition duration-300 max-[700px]:p-5"
              >
                {/* Order Header */}
                <div className="flex items-center justify-between border-b border-[#292929] pb-[22px] max-[450px]:items-start max-[450px]:gap-3">
                  <div>
                    <p className="mb-[7px] text-[11px] tracking-[2px] text-[#888]">
                      ORDER ID
                    </p>

                    <h2 className="font-['Oswald'] text-[22px] text-[#F5F3EE]">
                      #{order.id}
                    </h2>
                  </div>

                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.4 }}
                    className={`border px-[15px] py-2 text-xs capitalize tracking-[1px] max-[450px]:px-2.5 max-[450px]:py-[7px] max-[450px]:text-[10px] ${
                      String(order.status || "Pending").toLowerCase() ===
                      "delivered"
                        ? "border-[#39764C] text-[#8BD3A5]"
                        : String(order.status || "Pending").toLowerCase() ===
                          "cancelled"
                        ? "border-[#8C3D3D] text-[#E58B8B]"
                        : "border-[#8C6B30] text-[#D6B36A]"
                    }`}
                  >
                    {order.status || "Pending"}
                  </motion.span>
                </div>

                {/* Order Information */}
                <div className="grid grid-cols-3 gap-5 border-b border-[#292929] py-[25px] max-[700px]:grid-cols-2 max-[700px]:[&>div:last-child]:col-span-full max-[450px]:grid-cols-1 max-[450px]:[&>div:last-child]:col-span-auto">
                  {[
                    {
                      label: "Customer",
                      value: order.customerName,
                    },
                    {
                      label: "Order Date",
                      value: order.createdAt
                        ? new Date(order.createdAt).toLocaleDateString(
                            "en-IN",
                            {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "Date unavailable",
                    },
                    {
                      label: "Total Amount",
                      value: formatPrice(order.totalPrice),
                      isPrice: true,
                    },
                  ].map((detail, index) => (
                    <motion.div
                      key={detail.label}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.15 + index * 0.1,
                        duration: 0.4,
                      }}
                      className="flex flex-col gap-2"
                    >
                      <span className="text-xs text-[#888]">
                        {detail.label}
                      </span>

                      <strong
                        className={`text-sm font-medium ${
                          detail.isPrice
                            ? "text-lg font-bold text-[#D6B36A]"
                            : "text-[#F5F3EE]"
                        }`}
                      >
                        {detail.value}
                      </strong>
                    </motion.div>
                  ))}
                </div>

                {/* Ordered Products */}
                <div className="py-6">
                  <h3 className="mb-[18px] font-['Oswald'] text-sm tracking-[2px] text-[#C49A45]">
                    ORDER ITEMS
                  </h3>

                  <div className="flex flex-col">
                    {(order.items || []).map((item, index) => (
                      <motion.div
                        key={item.id ?? `${order.id}-${index}`}
                        initial={{ opacity: 0, x: -15 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.2 + index * 0.08,
                          duration: 0.4,
                        }}
                        className={`flex items-center justify-between gap-[15px] py-[13px] ${
                          index !== (order.items || []).length - 1
                            ? "border-b border-[#222]"
                            : ""
                        }`}
                      >
                        <div className="flex flex-col gap-[6px]">
                          <strong className="text-sm text-[#F5F3EE]">
                            {item.name}
                          </strong>

                          <span className="text-xs text-[#888]">
                            Quantity: {item.quantity}
                          </span>
                        </div>

                        <strong className="whitespace-nowrap text-sm text-[#D6B36A]">
                          {formatPrice(
                            Number(item.price) * Number(item.quantity)
                          )}
                        </strong>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="flex items-center justify-between border-t border-[#292929] pt-5 max-[450px]:flex-col max-[450px]:items-start max-[450px]:gap-3">
                  <span className="text-xs text-[#888]">
                    {(order.items || []).length} product
                    {(order.items || []).length !== 1 ? "s" : ""}
                  </span>

                  <motion.div
                    whileHover={{ x: 5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      to="/products"
                      className="text-[13px] text-[#D6B36A] transition hover:text-[#F5F3EE]"
                    >
                      Continue Shopping →
                    </Link>
                  </motion.div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default OrderHistory;
