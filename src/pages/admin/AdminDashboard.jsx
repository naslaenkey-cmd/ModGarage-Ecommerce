
import { Link } from "react-router-dom";
import {
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import {
  Package,
  Users,
  ShoppingBag,
  Clock,
  TrendingUp,
  ArrowUpRight,
} from "lucide-react";

import { getAdminProducts } from "../../services/adminProductApi";
import { getAdminUsers } from "../../services/adminUserApi";
import { getAdminOrders } from "../../services/adminOrderApi";

function AdminDashboard() {
  const queryClient = useQueryClient();

  // Fetch products
  const {
    data: products = [],
    isLoading: productsLoading,
    isFetching: productsFetching,
    isError: productsIsError,
    error: productsError,
  } = useQuery({
    queryKey: ["adminProducts"],
    queryFn: getAdminProducts,
  });

  // Fetch users
  const {
    data: users = [],
    isLoading: usersLoading,
    isError: usersIsError,
    error: usersError,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: getAdminUsers,
  });

  // Fetch orders
  const {
    data: orders = [],
    isLoading: ordersLoading,
    isFetching: ordersFetching,
    isError: ordersIsError,
    error: ordersError,
  } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: getAdminOrders,
  });

  const isLoading =
    productsLoading || usersLoading || ordersLoading;

  const isRefreshing =
    productsFetching || ordersFetching;

  const hasError =
    productsIsError || usersIsError || ordersIsError;

  // Statistics
  const pendingOrders = orders.filter(
    (order) =>
      order.status?.toLowerCase() === "pending"
  ).length;

  const dashboardCards = [
    {
      title: "Total Products",
      value: products.length,
      icon: Package,
      color: "#D6B36A",
      description: "Products in store",
    },
    {
      title: "Total Users",
      value: users.length,
      icon: Users,
      color: "#60A5FA",
      description: "Registered customers",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "#A78BFA",
      description: "Orders received",
    },
    {
      title: "Pending Orders",
      value: pendingOrders,
      icon: Clock,
      color: "#FBBF24",
      description: "Awaiting processing",
    },
  ];

  // Order Status Data
  const orderStatuses = [
    { name: "Pending", color: "#D6B36A" },
    { name: "Processing", color: "#3B82F6" },
    { name: "Shipped", color: "#A78BFA" },
    { name: "Delivered", color: "#22C55E" },
    { name: "Cancelled", color: "#EF4444" },
  ];

  const orderStatusData = orderStatuses.map((status) => ({
    name: status.name,
    value: orders.filter(
      (order) =>
        order.status?.toLowerCase() ===
        status.name.toLowerCase()
    ).length,
  }));

  // Monthly Revenue - Delivered Orders Only
  const currentYear = new Date().getFullYear();

  const monthlyRevenue = Array.from(
    { length: 12 },
    (_, index) => {
      const revenue = orders
        .filter((order) => {
          if (
            order.status?.toLowerCase() !== "delivered" ||
            !order.createdAt
          ) {
            return false;
          }

          const date = new Date(order.createdAt);

          return (
            !Number.isNaN(date.getTime()) &&
            date.getUTCFullYear() === currentYear &&
            date.getUTCMonth() === index
          );
        })
        .reduce(
          (total, order) =>
            total + Number(order.totalPrice || 0),
          0
        );

      return {
        month: new Date(
          currentYear,
          index
        ).toLocaleString("en-IN", {
          month: "short",
        }),
        revenue,
      };
    }
  );

  // Recent Orders
  const recentOrders = [...orders]
    .sort(
      (a, b) =>
        new Date(b.createdAt || 0) -
        new Date(a.createdAt || 0)
    )
    .slice(0, 6);

  // Low Stock Products
  const lowStockProducts = products
    .filter((product) => Number(product.stock) <= 5)
    .sort(
      (a, b) =>
        Number(a.stock) - Number(b.stock)
    )
    .slice(0, 5);

  // Date Formatting
  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return "N/A";
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Currency Formatting
  const formatCurrency = (amount) =>
    `₹${Number(amount || 0).toLocaleString("en-IN")}`;

  // Status Styling
  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-500/10 text-yellow-400",
      processing: "bg-blue-500/10 text-blue-400",
      shipped: "bg-purple-500/10 text-purple-400",
      delivered: "bg-green-500/10 text-green-400",
      cancelled: "bg-red-500/10 text-red-400",
    };

    return (
      styles[status?.toLowerCase()] ||
      "bg-gray-500/10 text-gray-400"
    );
  };

  // Refresh Dashboard
  const handleRefresh = () => {
    queryClient.invalidateQueries({
      queryKey: ["adminProducts"],
    });

    queryClient.invalidateQueries({
      queryKey: ["adminUsers"],
    });

    queryClient.invalidateQueries({
      queryKey: ["adminOrders"],
    });
  };

  return (
    <div className="min-w-0 space-y-6">

      {/* Dashboard Heading */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Dashboard Overview
          </h1>

          <p className="mt-2 text-sm text-gray-400">
            Welcome back! Here's your store performance.
          </p>
        </div>

        <button
          onClick={handleRefresh}
          disabled={isLoading || isRefreshing}
          className="flex items-center gap-2 rounded-lg border border-[#30343B] bg-[#171C23] px-4 py-2.5 text-sm text-gray-300 transition hover:border-[#D6B36A] hover:text-[#D6B36A] disabled:opacity-50"
        >
          <TrendingUp size={16} />
          {isRefreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Error Message */}
      {hasError && (
        <div className="space-y-2 rounded-lg border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-400">
          {productsIsError && (
            <p>Products: {productsError?.message}</p>
          )}

          {usersIsError && (
            <p>Users: {usersError?.message}</p>
          )}

          {ordersIsError && (
            <p>Orders: {ordersError?.message}</p>
          )}
        </div>
      )}

      {/* Main Analytics Layout */}
      <div className="grid min-w-0 grid-cols-1 gap-5 xl:grid-cols-12">

        {/* Left - Statistics Cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:col-span-3 xl:grid-cols-1">
          {dashboardCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className="rounded-xl border border-[#30343B] bg-[#11161D] p-5 transition hover:border-[#D6B36A]/50"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-400">
                    {card.title}
                  </p>

                  <div
                    className="flex h-10 w-10 items-center justify-center rounded-lg"
                    style={{
                      backgroundColor: `${card.color}15`,
                      color: card.color,
                    }}
                  >
                    <Icon size={20} />
                  </div>
                </div>

                <div className="mt-4 flex items-end justify-between">
                  <div>
                    <h2 className="text-3xl font-bold text-white">
                      {isLoading ? "..." : card.value.toLocaleString("en-IN")}
                    </h2>

                    <p className="mt-2 text-xs text-gray-500">
                      {card.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={18}
                    style={{ color: card.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Centre - Doughnut Chart */}
        <div className="min-w-0 rounded-xl border border-[#30343B] bg-[#11161D] p-5 xl:col-span-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Order Status
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Current order distribution
              </p>
            </div>

            <span className="rounded-lg bg-[#D6B36A]/10 px-3 py-1.5 text-xs text-[#D6B36A]">
              All Orders
            </span>
          </div>

          {ordersLoading ? (
            <p className="py-24 text-center text-sm text-gray-400">
              Loading chart...
            </p>
          ) : ordersIsError ? (
            <p className="py-24 text-center text-sm text-red-400">
              Unable to load chart.
            </p>
          ) : orders.length === 0 ? (
            <p className="py-24 text-center text-sm text-gray-500">
              No orders available.
            </p>
          ) : (
            <>
              <div className="relative mt-5 h-[260px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={orderStatusData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius="58%"
                      outerRadius="82%"
                      paddingAngle={4}
                      stroke="none"
                    >
                      {orderStatusData.map((entry) => (
                        <Cell
                          key={entry.name}
                          fill={
                            orderStatuses.find(
                              (status) => status.name === entry.name
                            )?.color
                          }
                        />
                      ))}
                    </Pie>

                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#171C23",
                        border: "1px solid #30343B",
                        borderRadius: "10px",
                        color: "#fff",
                      }}
                    />
                  </PieChart>
                </ResponsiveContainer>

                <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xs text-gray-500">
                    Total Orders
                  </p>

                  <h3 className="mt-1 text-3xl font-bold text-white">
                    {orders.length}
                  </h3>

                  <p className="mt-1 text-xs text-[#D6B36A]">
                    All statuses
                  </p>
                </div>
              </div>

              <div className="mt-3 grid grid-cols-2 gap-3">
                {orderStatuses.map((status) => (
                  <div
                    key={status.name}
                    className="flex items-center gap-2"
                  >
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ backgroundColor: status.color }}
                    />

                    <span className="text-xs text-gray-400">
                      {status.name}
                    </span>

                    <span className="ml-auto text-xs font-semibold text-white">
                      {orderStatusData.find(
                        (item) => item.name === status.name
                      )?.value}
                    </span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Right - Revenue Bar Chart */}
        <div className="min-w-0 rounded-xl border border-[#30343B] bg-[#11161D] p-5 xl:col-span-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-white">
                Earnings Revenue
              </h2>

              <p className="mt-1 text-xs text-gray-500">
                Monthly delivered-order revenue
              </p>
            </div>

            <span className="rounded-lg bg-[#D6B36A]/10 px-3 py-1.5 text-xs text-[#D6B36A]">
              {currentYear}
            </span>
          </div>

          <div className="mt-5">
            <p className="text-xs text-gray-500">
              Total Delivered Revenue
            </p>

            <h3 className="mt-1 text-2xl font-bold text-white">
              {formatCurrency(
                monthlyRevenue.reduce(
                  (total, month) => total + month.revenue,
                  0
                )
              )}
            </h3>
          </div>

          {ordersLoading ? (
            <p className="py-20 text-center text-sm text-gray-400">
              Loading revenue...
            </p>
          ) : ordersIsError ? (
            <p className="py-20 text-center text-sm text-red-400">
              Unable to load revenue.
            </p>
          ) : (
            <div className="mt-5 h-[290px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={monthlyRevenue}
                  margin={{
                    top: 10,
                    right: 5,
                    left: 0,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid
                    stroke="#30343B"
                    strokeDasharray="3 3"
                    vertical={false}
                  />

                  <XAxis
                    dataKey="month"
                    tick={{
                      fill: "#9CA3AF",
                      fontSize: 11,
                    }}
                    axisLine={false}
                    tickLine={false}
                  />

                  <YAxis
                    tick={{
                      fill: "#9CA3AF",
                      fontSize: 10,
                    }}
                    axisLine={false}
                    tickLine={false}
                    width={60}
                    tickFormatter={(value) =>
                      value >= 1000
                        ? `₹${(value / 1000).toFixed(0)}k`
                        : `₹${value}`
                    }
                  />

                  <Tooltip
                    cursor={{
                      fill: "#D6B36A",
                      opacity: 0.08,
                    }}
                    contentStyle={{
                      backgroundColor: "#171C23",
                      border: "1px solid #30343B",
                      borderRadius: "10px",
                      color: "#fff",
                    }}
                    formatter={(value) => [
                      formatCurrency(value),
                      "Revenue",
                    ]}
                  />

                  <Bar
                    dataKey="revenue"
                    fill="#D6B36A"
                    radius={[5, 5, 0, 0]}
                    maxBarSize={32}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      </div>

      {/* Recent Orders */}
      <div className="overflow-hidden rounded-xl border border-[#30343B] bg-[#11161D]">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#30343B] p-5 sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Recent Orders
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Latest customer transactions
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="text-sm font-medium text-[#D6B36A] transition hover:text-[#E8C982]"
          >
            View All Orders →
          </Link>
        </div>

        {ordersLoading ? (
          <p className="p-6 text-sm text-gray-400">
            Loading orders...
          </p>
        ) : ordersIsError ? (
          <p className="p-6 text-sm text-red-400">
            {ordersError?.message}
          </p>
        ) : recentOrders.length === 0 ? (
          <p className="p-10 text-center text-sm text-gray-500">
            No orders available yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[750px] text-left">
              <thead>
                <tr className="border-b border-[#30343B] bg-[#171C23] text-xs uppercase tracking-wider text-gray-500">
                  <th className="px-5 py-4">Order ID</th>
                  <th className="px-5 py-4">Customer</th>
                  <th className="px-5 py-4">Items</th>
                  <th className="px-5 py-4">Date</th>
                  <th className="px-5 py-4">Total</th>
                  <th className="px-5 py-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {recentOrders.map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-[#30343B] last:border-0 transition hover:bg-[#171C23]"
                  >
                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-[#D6B36A]">
                      #{order.id}
                    </td>

                    <td className="max-w-[180px] truncate px-5 py-4 text-sm text-white">
                      {order.customerName ||
                        order.fullName ||
                        order.email ||
                        "Customer"}
                    </td>

                    <td className="px-5 py-4 text-sm text-gray-400">
                      {Array.isArray(order.items)
                        ? order.items.length
                        : 0}{" "}
                      items
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-400">
                      {formatDate(order.createdAt)}
                    </td>

                    <td className="whitespace-nowrap px-5 py-4 text-sm font-medium text-white">
                      {formatCurrency(
                        order.totalPrice ??
                          order.total ??
                          order.totalAmount
                      )}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium ${getStatusStyle(
                          order.status
                        )}`}
                      >
                        {order.status || "Unknown"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Low Stock Products */}
      <div className="rounded-xl border border-[#30343B] bg-[#11161D] p-5 sm:p-6">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Low Stock Products
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              Products that need restocking
            </p>
          </div>

          <Link
            to="/admin/products"
            className="text-sm font-medium text-[#D6B36A] hover:text-[#E8C982]"
          >
            Manage Products →
          </Link>
        </div>

        {productsLoading ? (
          <p className="text-sm text-gray-400">
            Loading products...
          </p>
        ) : productsIsError ? (
          <p className="text-sm text-red-400">
            {productsError?.message}
          </p>
        ) : lowStockProducts.length === 0 ? (
          <p className="py-5 text-center text-sm text-green-400">
            All products have sufficient stock.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {lowStockProducts.map((product) => (
              <div
                key={product.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-[#30343B] bg-[#171C23] p-4"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-white">
                    {product.name}
                  </p>

                  <p className="mt-1 text-xs text-gray-500">
                    {product.category}
                  </p>
                </div>

                <span className="shrink-0 rounded-full bg-red-500/10 px-3 py-1.5 text-xs font-semibold text-red-400">
                  {product.stock} left
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminDashboard;
