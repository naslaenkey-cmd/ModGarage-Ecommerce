
import { useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAdminOrders,
  updateAdminOrderStatus,
} from "../../services/adminOrderApi";

function AdminOrders() {
  const queryClient = useQueryClient();
  const [selectedOrderId, setSelectedOrderId] = useState(null);

  const {
    data: orders = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: getAdminOrders,
  });

  const statusMutation = useMutation({
    mutationFn: updateAdminOrderStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminOrders"],
      });
    },
  });

  const statuses = [
    "Pending",
    "Processing",
    "Shipped",
    "Delivered",
    "Cancelled",
  ];

  const selectedOrder =
    orders.find((order) => order.id === selectedOrderId) || null;

  const handleStatusChange = (id, status) => {
    statusMutation.mutate({ id, status });
  };

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString("en-IN")}`;

  const getStatusStyle = (status) => {
    switch (status) {
      case "Pending":
        return "bg-yellow-500/10 text-yellow-400";
      case "Processing":
        return "bg-blue-500/10 text-blue-400";
      case "Shipped":
        return "bg-purple-500/10 text-purple-400";
      case "Delivered":
        return "bg-green-500/10 text-green-400";
      case "Cancelled":
        return "bg-red-500/10 text-red-400";
      default:
        return "bg-gray-500/10 text-gray-400";
    }
  };

  // Order Statistics
  const totalRevenue = orders.reduce(
    (total, order) =>
      order.status !== "Cancelled"
        ? total + Number(order.totalPrice || 0)
        : total,
    0
  );

  const pendingOrders = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const completedOrders = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const statistics = [
    {
      title: "Total Orders",
      value: orders.length,
      color: "text-white",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      color: "text-yellow-400",
    },
    {
      title: "Delivered Orders",
      value: completedOrders,
      color: "text-green-400",
    },
    {
      title: "Order Revenue",
      value: formatPrice(totalRevenue),
      color: "text-[#D6B36A]",
    },
  ];

  return (
    <div className="flex h-full min-h-0 w-full flex-col gap-3 overflow-hidden text-white sm:gap-4">

      {/* Page Heading */}
      <div className="shrink-0">
        <h1 className="text-xl font-bold tracking-wide sm:text-2xl">
          Orders Management
        </h1>

        <p className="mt-1 text-xs text-gray-400 sm:text-sm">
          Track customer orders and manage order status.
        </p>
      </div>

      {/* Order Statistics */}
      <div className="grid shrink-0 grid-cols-2 gap-2 sm:gap-3 xl:grid-cols-4">

        {statistics.map((stat) => (
          <div
            key={stat.title}
            className="min-w-0 rounded-xl border border-gray-800 bg-[#151515] p-3 sm:p-4"
          >
            <p className="truncate text-[11px] text-gray-400 sm:text-xs">
              {stat.title}
            </p>

            <h2 className={`mt-2 break-words text-xl font-bold sm:text-2xl ${stat.color}`}>
              {stat.value}
            </h2>
          </div>
        ))}

      </div>

      {/* Orders Table */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-gray-800 bg-[#151515]">

        {/* Table Heading */}
        <div className="shrink-0 border-b border-gray-800 px-3 py-3 sm:px-5">
          <h2 className="text-sm font-semibold sm:text-base">
            All Orders
          </h2>

          <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
            View customer orders and update their status.
          </p>
        </div>

        {/* Error Messages */}
        {isError && (
          <p className="m-3 rounded-lg bg-red-500/10 p-3 text-xs text-red-400 sm:text-sm">
            {error?.message || "Failed to fetch orders"}
          </p>
        )}

        {statusMutation.isError && (
          <p className="m-3 rounded-lg bg-red-500/10 p-3 text-xs text-red-400 sm:text-sm">
            {statusMutation.error?.message ||
              "Failed to update order status"}
          </p>
        )}

        {/* Loading */}
        {isLoading ? (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="flex flex-1 items-center justify-center text-sm text-gray-400">
            No orders found.
          </div>
        ) : (

          /* Responsive Table */
          <div className="min-h-0 min-w-0 flex-1 overflow-auto">

            <table className="w-full min-w-[780px] text-left">

              <thead className="sticky top-0 z-10 bg-[#202020] text-[10px] uppercase tracking-wider text-gray-400 sm:text-xs">
                <tr>
                  <th className="whitespace-nowrap px-3 py-3 sm:px-5">
                    Order ID
                  </th>

                  <th className="px-3 py-3 sm:px-5">
                    Customer
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 sm:px-5">
                    Date
                  </th>

                  <th className="px-3 py-3 sm:px-5">
                    Items
                  </th>

                  <th className="px-3 py-3 sm:px-5">
                    Total
                  </th>

                  <th className="px-3 py-3 sm:px-5">
                    Status
                  </th>

                  <th className="whitespace-nowrap px-3 py-3 text-center sm:px-5">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-800">

                {orders.map((order) => (
                  <tr
                    key={order.id}
                    className="transition hover:bg-[#202020]"
                  >

                    <td className="whitespace-nowrap px-3 py-3 text-xs font-medium text-[#D6B36A] sm:px-5 sm:text-sm">
                      #{order.id}
                    </td>

                    <td className="max-w-[180px] px-3 py-3 sm:px-5">
                      <p className="truncate text-xs font-medium sm:text-sm">
                        {order.customerName || "N/A"}
                      </p>

                      <p className="mt-1 truncate text-[10px] text-gray-500 sm:text-xs">
                        {order.email || "N/A"}
                      </p>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-xs text-gray-400 sm:px-5 sm:text-sm">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="px-3 py-3 text-xs text-gray-400 sm:px-5 sm:text-sm">
                      {order.items?.reduce(
                        (total, item) =>
                          total + Number(item.quantity || 0),
                        0
                      ) || 0}
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-xs font-semibold sm:px-5 sm:text-sm">
                      {formatPrice(order.totalPrice)}
                    </td>

                    <td className="px-3 py-3 sm:px-5">
                      <select
                        value={order.status || "Pending"}
                        onChange={(e) =>
                          handleStatusChange(order.id, e.target.value)
                        }
                        disabled={statusMutation.isPending}
                        className={`max-w-[125px] rounded-lg border border-gray-700 bg-[#202020] px-2 py-2 text-[10px] font-semibold outline-none focus:border-[#D6B36A] disabled:opacity-50 sm:text-xs ${getStatusStyle(order.status)}`}
                      >
                        {statuses.map((status) => (
                          <option
                            key={status}
                            value={status}
                            className="bg-[#202020] text-white"
                          >
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="whitespace-nowrap px-3 py-3 text-center sm:px-5">
                      <button
                        onClick={() => setSelectedOrderId(order.id)}
                        className="rounded-lg border border-[#D6B36A]/40 px-2 py-2 text-[10px] font-semibold text-[#D6B36A] transition hover:bg-[#D6B36A] hover:text-black sm:px-3 sm:text-xs"
                      >
                        View Details
                      </button>
                    </td>

                  </tr>
                ))}

              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/80 p-3 sm:p-5"
          onClick={() => setSelectedOrderId(null)}
        >
          <div
            className="my-auto max-h-[85vh] max-h-[85dvh] w-full max-w-2xl overflow-y-auto rounded-xl border border-gray-700 bg-[#151515] p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >

            {/* Modal Heading */}
            <div className="flex items-center justify-between border-b border-gray-800 pb-4">
              <div>
                <h2 className="text-lg font-bold sm:text-xl">
                  Order Details
                </h2>

                <p className="mt-1 text-sm text-[#D6B36A]">
                  #{selectedOrder.id}
                </p>
              </div>

              <button
                onClick={() => setSelectedOrderId(null)}
                className="text-2xl text-gray-400 transition hover:text-white"
              >
                &times;
              </button>
            </div>

            {/* Customer Information */}
            <div className="mt-5">
              <h3 className="mb-3 text-sm font-semibold text-[#D6B36A]">
                Customer Information
              </h3>

              <div className="space-y-2 rounded-lg bg-[#202020] p-3 text-xs sm:p-4 sm:text-sm">
                <p>
                  <span className="text-gray-500">Name: </span>
                  {selectedOrder.customerName || "N/A"}
                </p>

                <p className="break-all">
                  <span className="text-gray-500">Email: </span>
                  {selectedOrder.email || "N/A"}
                </p>

                <p>
                  <span className="text-gray-500">User ID: </span>
                  {selectedOrder.userId || "N/A"}
                </p>

                <p>
                  <span className="text-gray-500">Order Date: </span>
                  {formatDate(selectedOrder.createdAt)}
                </p>
              </div>
            </div>

            {/* Purchased Products */}
            <div className="mt-5">
              <h3 className="mb-3 text-sm font-semibold text-[#D6B36A]">
                Purchased Products
              </h3>

              <div className="space-y-3">
                {selectedOrder.items?.map((item, index) => (
                  <div
                    key={`${item.id}-${index}`}
                    className="flex gap-3 rounded-lg bg-[#202020] p-3 sm:gap-4 sm:p-4"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-14 w-14 shrink-0 rounded-lg bg-[#111111] object-cover sm:h-20 sm:w-20"
                    />

                    <div className="min-w-0 flex-1">
                      <h4 className="break-words text-sm font-medium">
                        {item.name}
                      </h4>

                      <p className="mt-1 text-xs text-gray-500">
                        {item.category}
                      </p>

                      <p className="mt-1 text-xs text-gray-400">
                        Quantity: {item.quantity}
                      </p>

                      <p className="mt-1 text-sm font-semibold text-[#D6B36A]">
                        {formatPrice(item.price)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-5 rounded-lg border border-gray-800 bg-[#202020] p-3 sm:p-4">
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">
                  Total Amount
                </span>

                <span className="text-lg font-bold text-[#D6B36A] sm:text-xl">
                  {formatPrice(selectedOrder.totalPrice)}
                </span>
              </div>

              <div className="mt-3 flex items-center justify-between gap-2 text-sm">
                <span className="text-gray-400">
                  Order Status
                </span>

                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(selectedOrder.status)}`}
                >
                  {selectedOrder.status || "Pending"}
                </span>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setSelectedOrderId(null)}
              className="mt-5 w-full rounded-lg bg-[#D6B36A] py-3 text-sm font-semibold text-black transition hover:bg-[#E8C982]"
            >
              Close
            </button>

          </div>
        </div>
      )}

    </div>
  );
}

export default AdminOrders;
