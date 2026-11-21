
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  LayoutDashboard,
  Package,
  Users,
  ShoppingCart,
  LogOut,
  CarFront,
} from "lucide-react";

import { adminLogout } from "../../redux/slices/adminAuthSlice";

import logo from "../../assets/logo.png";

function AdminSidebar({
  admin,
  isCollapsed,
  isMobileOpen,
  onNavigate,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Logout Admin
  const handleLogout = () => {
    dispatch(adminLogout());
    navigate("/admin/login", { replace: true });
  };

  // Sidebar Navigation Items
  const navItems = [
    {
      name: "Dashboard",
      path: "/admin/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Products",
      path: "/admin/products",
      icon: Package,
    },
    {
      name: "All Products (Task)",
      path: "/admin/task",
      icon: Package,
    },
    {
      name: "Users",
      path: "/admin/users",
      icon: Users,
    },
    {
      name: "Orders",
      path: "/admin/orders",
      icon: ShoppingCart,
    },
  ];

  const adminName =
    admin?.email?.split("@")[0] || "Administrator";

  return (
    <aside
      className={`fixed left-0 top-0 z-50 flex h-screen flex-col border-r border-[#30343B] bg-[#11161D] transition-all duration-300 ${
        isCollapsed ? "md:w-20" : "md:w-64"
      } w-72 ${
        isMobileOpen
          ? "translate-x-0"
          : "-translate-x-full md:translate-x-0"
      }`}
    >
      {/* Logo */}
      <div className="flex h-20 shrink-0 items-center justify-center border-b border-[#30343B] px-4">

        {/* Expanded Logo */}
        <NavLink
          to="/admin/dashboard"
          onClick={onNavigate}
          className={`w-full ${
            isCollapsed ? "md:hidden" : "block"
          }`}
        >
          <img
            src={logo}
            alt="ModGarage"
            className="mx-auto h-14 max-w-full object-contain"
          />
        </NavLink>

        {/* Collapsed Logo */}
        {isCollapsed && (
          <NavLink
            to="/admin/dashboard"
            onClick={onNavigate}
            className="hidden md:flex h-11 w-11 items-center justify-center rounded-xl bg-[#D6B36A]/10 text-[#D6B36A]"
          >
            <CarFront size={25} />
          </NavLink>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 overflow-y-auto px-3 py-7">

        <p
          className={`mb-4 px-3 text-[10px] font-semibold uppercase tracking-[2px] text-gray-500 ${
            isCollapsed ? "md:hidden" : ""
          }`}
        >
          Main Menu
        </p>

        {navItems.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onNavigate}
              title={isCollapsed ? item.name : ""}
              className={({ isActive }) =>
                `group flex items-center gap-4 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "border border-[#D6B36A]/20 bg-[#D6B36A]/10 text-[#D6B36A]"
                    : "text-gray-400 hover:bg-[#1C232D] hover:text-white"
                } ${
                  isCollapsed
                    ? "md:justify-center md:px-2"
                    : ""
                }`
              }
            >
              <Icon
                size={20}
                className="shrink-0"
              />

              <span
                className={`whitespace-nowrap ${
                  isCollapsed ? "md:hidden" : ""
                }`}
              >
                {item.name}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Admin Profile and Logout */}
      <div className="shrink-0 border-t border-[#30343B] p-4">

        {/* Admin Profile */}
        <div
          className={`mb-4 flex items-center gap-3 ${
            isCollapsed ? "md:justify-center" : ""
          }`}
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#D6B36A]/10 font-semibold text-[#D6B36A]">
            {admin?.email?.charAt(0).toUpperCase() || "A"}
          </div>

          <div
            className={`min-w-0 ${
              isCollapsed ? "md:hidden" : ""
            }`}
          >
            <p className="truncate text-sm font-medium text-white">
              {adminName}
            </p>

            <p className="text-xs text-gray-500">
              Store Administrator
            </p>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          title={isCollapsed ? "Logout" : ""}
          className={`flex w-full items-center gap-3 rounded-lg border border-[#30343B] px-4 py-3 text-sm text-gray-400 transition hover:border-red-500/40 hover:bg-red-500/10 hover:text-red-400 ${
            isCollapsed
              ? "md:justify-center md:px-2"
              : ""
          }`}
        >
          <LogOut size={18} />

          <span className={isCollapsed ? "md:hidden" : ""}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  );
}

export default AdminSidebar;
