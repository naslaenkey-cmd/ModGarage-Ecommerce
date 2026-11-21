
import { useMemo, useState } from "react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";

import {
  getAdminUsers,
  updateAdminUserStatus,
} from "../../services/adminUserApi";

const usersPerPage = 8;

function AdminUsers() {
  const queryClient = useQueryClient();

  const {
    data: users = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminUsers"],
    queryFn: getAdminUsers,
  });

  const statusMutation = useMutation({
    mutationFn: updateAdminUserStatus,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["adminUsers"],
      });
    },
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);

  // Block or unblock user
  const handleStatusChange = (user) => {
    statusMutation.mutate({
      id: user.id,
      isBlocked: !user.isBlocked,
    });
  };

  // Statistics
  const activeUsers = users.filter(
    (user) => !user.isBlocked
  ).length;

  const blockedUsers = users.filter(
    (user) => user.isBlocked
  ).length;

  // Search and filter
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const search = searchTerm.toLowerCase();

      const matchesSearch =
        user.fullName?.toLowerCase().includes(search) ||
        user.email?.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && !user.isBlocked) ||
        (statusFilter === "blocked" && user.isBlocked);

      return matchesSearch && matchesStatus;
    });
  }, [users, searchTerm, statusFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const startIndex = (currentPage - 1) * usersPerPage;

  const currentUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  const handleClearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="w-full min-w-0 space-y-4 text-white sm:space-y-5">

      {/* Page Heading */}
      <div>
        <h1 className="text-2xl font-bold tracking-wide sm:text-3xl">
          Users Management
        </h1>

        <p className="mt-1 text-xs text-gray-400 sm:text-sm">
          Manage registered customers and their account status.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">

        <div className="rounded-xl border border-gray-800 bg-[#151515] p-4 sm:p-5">
          <p className="text-xs text-gray-400 sm:text-sm">
            Total Users
          </p>
          <h2 className="mt-2 text-2xl font-bold sm:text-3xl">
            {users.length}
          </h2>
        </div>

        <div className="rounded-xl border border-gray-800 bg-[#151515] p-4 sm:p-5">
          <p className="text-xs text-gray-400 sm:text-sm">
            Active Users
          </p>
          <h2 className="mt-2 text-2xl font-bold text-green-400 sm:text-3xl">
            {activeUsers}
          </h2>
        </div>

        <div className="col-span-2 rounded-xl border border-gray-800 bg-[#151515] p-4 sm:col-span-1 sm:p-5">
          <p className="text-xs text-gray-400 sm:text-sm">
            Blocked Users
          </p>
          <h2 className="mt-2 text-2xl font-bold text-red-400 sm:text-3xl">
            {blockedUsers}
          </h2>
        </div>

      </div>

      {/* Search and Filters */}
      <div className="rounded-xl border border-gray-800 bg-[#151515] p-4 sm:p-5">

        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 className="text-base font-semibold">
            Search & Filters
          </h2>

          <button
            onClick={handleClearFilters}
            className="text-xs font-medium text-[#D6B36A] hover:text-[#E8C982] sm:text-sm"
          >
            Clear Filters
          </button>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">

          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            placeholder="Search by name or email..."
            className="w-full min-w-0 rounded-lg border border-gray-700 bg-[#202020] px-4 py-3 text-sm text-white outline-none focus:border-[#D6B36A]"
          />

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full min-w-0 rounded-lg border border-gray-700 bg-[#202020] px-4 py-3 text-sm text-white outline-none focus:border-[#D6B36A]"
          >
            <option value="all">All Users</option>
            <option value="active">Active Users</option>
            <option value="blocked">Blocked Users</option>
          </select>

        </div>

        <p className="mt-3 text-xs text-gray-400 sm:text-sm">
          Showing{" "}
          <span className="font-semibold text-[#D6B36A]">
            {filteredUsers.length}
          </span>{" "}
          of {users.length} users
        </p>

      </div>

      {/* Customers */}
      <div className="min-w-0 overflow-hidden rounded-xl border border-gray-800 bg-[#151515]">

        <div className="border-b border-gray-800 p-4 sm:p-5">
          <h2 className="text-base font-semibold">
            All Customers
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            View and manage customer accounts.
          </p>
        </div>

        {/* Error */}
        {isError && (
          <p className="m-4 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            {error?.message || "Failed to fetch users"}
          </p>
        )}

        {statusMutation.isError && (
          <p className="m-4 rounded-lg bg-red-500/10 p-4 text-sm text-red-400">
            {statusMutation.error?.message ||
              "Failed to update user status"}
          </p>
        )}

        {/* Loading */}
        {isLoading ? (
          <div className="p-10 text-center text-sm text-gray-400">
            Loading users...
          </div>
        ) : isError ? null : filteredUsers.length === 0 ? (
          <div className="p-8 text-center">
            <p className="font-semibold text-gray-300">
              No users found.
            </p>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <>
            {/* MOBILE: Customer Cards */}
            <div className="grid grid-cols-1 gap-3 p-3 md:hidden">

              {currentUsers.map((user) => (
                <div
                  key={user.id}
                  className="min-w-0 rounded-xl border border-gray-800 bg-[#202020] p-4"
                >

                  {/* Customer Name and Status */}
                  <div className="flex min-w-0 items-center justify-between gap-2">

                    <div className="flex min-w-0 items-center gap-3">

                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#c49a45]/15 font-bold uppercase text-[#c49a45]">
                        {user.fullName?.charAt(0) || "U"}
                      </div>

                      <div className="min-w-0">
                        <p className="break-words text-sm font-semibold text-white">
                          {user.fullName || "Unknown User"}
                        </p>

                        <p className="mt-1 break-all text-xs text-gray-400">
                          {user.email}
                        </p>
                      </div>

                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2 py-1 text-[10px] font-semibold ${
                        user.isBlocked
                          ? "bg-red-500/10 text-red-400"
                          : "bg-green-500/10 text-green-400"
                      }`}
                    >
                      {user.isBlocked ? "Blocked" : "Active"}
                    </span>

                  </div>

                  {/* User ID */}
                  <div className="mt-4 flex items-center justify-between gap-2 border-t border-gray-700 pt-3">
                    <span className="text-xs text-gray-500">
                      User ID
                    </span>

                    <span className="break-all text-xs text-gray-400">
                      {user.id}
                    </span>
                  </div>

                  {/* Action */}
                  <button
                    onClick={() => handleStatusChange(user)}
                    disabled={statusMutation.isPending}
                    className={`mt-4 w-full rounded-lg px-4 py-2.5 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                      user.isBlocked
                        ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                        : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    }`}
                  >
                    {statusMutation.isPending
                      ? "Updating..."
                      : user.isBlocked
                        ? "Unblock User"
                        : "Block User"}
                  </button>

                </div>
              ))}

            </div>

            {/* TABLET AND DESKTOP: Table */}
            <div className="hidden overflow-x-auto md:block">

              <table className="w-full min-w-[650px] text-left">

                <thead className="bg-[#202020] text-xs uppercase tracking-wider text-gray-400">
                  <tr>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Email</th>
                    <th className="px-5 py-4">User ID</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4 text-center">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-800">

                  {currentUsers.map((user) => (
                    <tr
                      key={user.id}
                      className="transition hover:bg-[#202020]"
                    >

                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">

                          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#c49a45]/15 font-bold uppercase text-[#c49a45]">
                            {user.fullName?.charAt(0) || "U"}
                          </div>

                          <span className="text-sm font-medium">
                            {user.fullName}
                          </span>

                        </div>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-400">
                        {user.email}
                      </td>

                      <td className="px-5 py-4 text-xs text-gray-500">
                        {user.id}
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${
                            user.isBlocked
                              ? "bg-red-500/10 text-red-400"
                              : "bg-green-500/10 text-green-400"
                          }`}
                        >
                          {user.isBlocked ? "Blocked" : "Active"}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-center">
                        <button
                          onClick={() => handleStatusChange(user)}
                          disabled={statusMutation.isPending}
                          className={`rounded-lg px-4 py-2 text-xs font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            user.isBlocked
                              ? "bg-green-500/10 text-green-400 hover:bg-green-500/20"
                              : "bg-red-500/10 text-red-400 hover:bg-red-500/20"
                          }`}
                        >
                          {statusMutation.isPending
                            ? "Updating..."
                            : user.isBlocked
                              ? "Unblock"
                              : "Block"}
                        </button>
                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>

            {/* Pagination */}
            <div className="flex flex-col items-center justify-between gap-3 border-t border-gray-800 px-3 py-4 sm:flex-row sm:px-5">

              <p className="text-center text-xs text-gray-400 sm:text-sm">
                Showing {startIndex + 1}–
                {Math.min(startIndex + usersPerPage, filteredUsers.length)}{" "}
                of {filteredUsers.length} users
              </p>

              <div className="flex max-w-full flex-wrap items-center justify-center gap-2">

                <button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="rounded-lg border border-gray-700 px-3 py-2 text-xs text-gray-300 transition hover:border-[#D6B36A] hover:text-[#D6B36A] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                >
                  Previous
                </button>

                <span className="px-2 text-xs text-gray-300 sm:hidden">
                  {currentPage} / {totalPages}
                </span>

                <div className="hidden items-center gap-2 sm:flex">
                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index + 1}
                      onClick={() => handlePageChange(index + 1)}
                      className={`h-9 w-9 rounded-lg text-sm font-medium transition ${
                        currentPage === index + 1
                          ? "bg-[#D6B36A] text-black"
                          : "border border-gray-700 text-gray-300 hover:border-[#D6B36A]"
                      }`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={
                    totalPages === 0 || currentPage === totalPages
                  }
                  className="rounded-lg border border-gray-700 px-3 py-2 text-xs text-gray-300 transition hover:border-[#D6B36A] hover:text-[#D6B36A] disabled:cursor-not-allowed disabled:opacity-40 sm:text-sm"
                >
                  Next
                </button>

              </div>

            </div>
          </>
        )}

      </div>

    </div>
  );
}

export default AdminUsers;
