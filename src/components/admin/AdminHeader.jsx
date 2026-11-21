
import { useLocation } from "react-router-dom";

import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  Bell,
} from "lucide-react";

function AdminHeader({
  admin,
  isCollapsed,
  onToggleSidebar,
}) {
  const location = useLocation();

  const pageTitles = {
    "/admin/dashboard": "Dashboard Overview",
    "/admin/products": "Product Management",
    "/admin/users": "User Management",
    "/admin/orders": "Order Management",
  };

  const pageTitle =
    pageTitles[location.pathname] || "Admin Panel";

  const adminName =
    admin?.email?.split("@")[0] || "Administrator";

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between gap-3 border-b border-[#30343B] bg-[#11161D]/95 px-4 backdrop-blur-xl sm:px-6 lg:px-8">

      {/* Left Section */}
      <div className="flex min-w-0 items-center gap-4">

        {/* Sidebar Toggle */}
        <button
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#30343B] text-gray-400 transition hover:border-[#D6B36A]/50 hover:bg-[#D6B36A]/10 hover:text-[#D6B36A]"
        >
          {/* Mobile Icon */}
          <Menu size={21} className="md:hidden" />

          {/* Desktop Icons */}
          {isCollapsed ? (
            <PanelLeftOpen
              size={20}
              className="hidden md:block"
            />
          ) : (
            <PanelLeftClose
              size={20}
              className="hidden md:block"
            />
          )}
        </button>

        {/* Page Title */}
        <div className="min-w-0">
          <h1 className="truncate text-base font-semibold text-white sm:text-lg">
            {pageTitle}
          </h1>

          <p className="hidden text-xs text-gray-500 sm:block">
            Manage your ModGarage store
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="flex shrink-0 items-center gap-2 sm:gap-4">

        {/* Search */}
        <div className="hidden items-center gap-2 rounded-lg border border-[#30343B] bg-[#171C23] px-3 py-2.5 lg:flex">
          <Search size={17} className="text-gray-500" />

          <span className="text-sm text-gray-500">
            Admin Panel
          </span>
        </div>

        {/* Notification Icon */}
        <button
          type="button"
          aria-label="Notifications"
          title="Notifications"
          className="relative flex h-10 w-10 items-center justify-center rounded-lg text-gray-400 transition hover:bg-[#1C232D] hover:text-[#D6B36A]"
        >
          <Bell size={20} />
        </button>

        {/* Admin Profile */}
        <div className="flex items-center gap-2 border-l border-[#30343B] pl-3 sm:gap-3 sm:pl-4">

          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#D6B36A] font-semibold text-black">
            {admin?.email?.charAt(0).toUpperCase() || "A"}
          </div>

          <div className="hidden min-w-0 sm:block">
            <p className="max-w-32 truncate text-sm font-medium text-white">
              {adminName}
            </p>

            <p className="text-xs text-gray-500">
              Administrator
            </p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;
