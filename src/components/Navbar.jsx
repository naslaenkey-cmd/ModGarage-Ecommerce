
import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

import {
  Heart,
  ShoppingCart,
  UserRound,
  Menu,
  X,
} from "lucide-react";

import { motion, AnimatePresence } from "motion/react";

import useCart from "../hooks/useCart";
import useWishlist from "../hooks/useWishlist";

import logo from "../assets/logo.png";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const { isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const { cartItems } = useCart();
  const { wishlistItems } = useWishlist();

  const cartCount = cartItems.length;
  const wishlistCount = wishlistItems.length;

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `relative whitespace-nowrap text-[13px] max-[1200px]:text-[11px] font-bold tracking-[1px] uppercase transition-colors duration-300
    after:content-[''] after:absolute after:left-0 after:-bottom-[9px] after:h-[2px] after:bg-[#D6B36A] after:transition-all after:duration-300
    ${
      isActive
        ? "text-[#D6B36A] after:w-full"
        : "text-[#AAAAAA] hover:text-[#D6B36A] after:w-0 hover:after:w-full"
    }`;

  const buttonClass =
    "inline-flex items-center justify-center min-w-[125px] max-[1200px]:min-w-[100px] max-[850px]:min-w-[85px] max-[380px]:min-w-[75px] min-h-[50px] max-[1200px]:min-h-[44px] max-[480px]:min-h-[38px] px-[22px] max-[480px]:px-[10px] py-3 max-[480px]:py-2 border border-[#D6B36A] rounded-[2px] bg-[#D6B36A] text-[#080808] font-bold text-[14px] max-[480px]:text-[10px] tracking-[1.5px] uppercase no-underline cursor-pointer transition-all duration-300 hover:bg-[#E8C982] hover:border-[#E8C982] hover:-translate-y-[2px]";

  const iconLinkClass =
    "relative flex h-[42px] w-[42px] max-[480px]:h-[36px] max-[480px]:w-[36px] items-center justify-center rounded-full text-[#D6B36A] transition-all duration-300 hover:bg-[#252525] hover:text-[#E8C982]";

  const navContainer = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const navItem = {
    hidden: {
      opacity: 0,
      y: -12,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: "easeOut",
      },
    },
  };

  const badgeAnimation = {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 15,
      },
    },
  };

  const mobileMenuAnimation = {
    hidden: {
      opacity: 0,
      height: 0,
      y: -10,
    },
    visible: {
      opacity: 1,
      height: "auto",
      y: 0,
      transition: {
        duration: 0.3,
        ease: "easeOut",
      },
    },
    exit: {
      opacity: 0,
      height: 0,
      y: -10,
      transition: {
        duration: 0.2,
        ease: "easeIn",
      },
    },
  };

  const mobileLinkClass = ({ isActive }) =>
    `block w-full border-b border-[#252525] py-3 text-[12px] font-bold tracking-[1.5px] uppercase transition-colors duration-300
    ${
      isActive
        ? "text-[#D6B36A]"
        : "text-[#AAAAAA] hover:text-[#D6B36A]"
    }`;

  return (
    <nav className="sticky top-0 z-[1000] flex w-full flex-wrap items-center justify-between gap-[30px] border-b border-[#252525] bg-[#080808] px-[7%] py-[15px] max-[1200px]:gap-[18px] max-[1200px]:px-[4%] max-[850px]:gap-0 max-[850px]:px-[5%] max-[850px]:py-3">

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <Link
          to="/"
          onClick={closeMenu}
          className="flex shrink-0 items-center"
          aria-label="MODGARAGE Home"
        >
          <motion.img
            src={logo}
            alt="MODGARAGE"
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.3 }}
            className="h-[52px] w-[190px] object-cover object-center transition-transform duration-300 max-[1200px]:h-[46px] max-[1200px]:w-[165px] max-[480px]:h-[38px] max-[480px]:w-[125px] max-[380px]:w-[112px]"
          />
        </Link>
      </motion.div>

      {/* Desktop Navigation */}
      <motion.div
        variants={navContainer}
        initial="hidden"
        animate="visible"
        className="flex items-center justify-center gap-8 max-[1200px]:gap-5 max-[850px]:hidden"
      >
        <motion.div variants={navItem}>
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
        </motion.div>

        <motion.div variants={navItem}>
          <NavLink to="/products" className={navLinkClass}>
            Products
          </NavLink>
        </motion.div>

        <motion.div variants={navItem}>
          <NavLink to="/about" className={navLinkClass}>
            About Us
          </NavLink>
        </motion.div>

        <motion.div variants={navItem}>
          <NavLink to="/contact" className={navLinkClass}>
            Contact Us
          </NavLink>
        </motion.div>

        {isAuthenticated && (
          <motion.div variants={navItem}>
            <NavLink to="/orders" className={navLinkClass}>
              My Orders
            </NavLink>
          </motion.div>
        )}
      </motion.div>

      {/* Right Side Actions */}
      <motion.div
        initial={{ opacity: 0, x: 25 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="flex shrink-0 items-center gap-4 max-[1200px]:gap-2 max-[850px]:ml-auto max-[480px]:gap-1"
      >
        {isAuthenticated ? (
          <>
            {/* Wishlist */}
            <motion.div
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink
                to="/wishlist"
                onClick={closeMenu}
                className={iconLinkClass}
                title="Wishlist"
                aria-label={`Wishlist, ${wishlistCount} items`}
              >
                <Heart
                  size={22}
                  className="max-[480px]:h-5 max-[480px]:w-5"
                  strokeWidth={1.8}
                />

                <motion.span
                  key={wishlistCount}
                  variants={badgeAnimation}
                  initial="initial"
                  animate="animate"
                  className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#D6B36A] px-1 text-[10px] font-bold text-[#080808]"
                >
                  {wishlistCount}
                </motion.span>
              </NavLink>
            </motion.div>

            {/* Cart */}
            <motion.div
              whileHover={{ scale: 1.12, y: -2 }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink
                to="/cart"
                onClick={closeMenu}
                className={iconLinkClass}
                title="Cart"
                aria-label={`Cart, ${cartCount} items`}
              >
                <ShoppingCart
                  size={22}
                  className="max-[480px]:h-5 max-[480px]:w-5"
                  strokeWidth={1.8}
                />

                <motion.span
                  key={cartCount}
                  variants={badgeAnimation}
                  initial="initial"
                  animate="animate"
                  className="absolute right-0 top-0 flex h-[17px] min-w-[17px] items-center justify-center rounded-full bg-[#D6B36A] px-1 text-[10px] font-bold text-[#080808]"
                >
                  {cartCount}
                </motion.span>
              </NavLink>
            </motion.div>

            {/* My Profile */}
            <motion.div
              whileHover={{ scale: 1.12, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
            >
              <NavLink
                to="/profile"
                onClick={closeMenu}
                title="My Profile"
                aria-label="My Profile"
                className={iconLinkClass}
              >
                <UserRound
                  size={23}
                  className="max-[480px]:h-5 max-[480px]:w-5"
                  strokeWidth={1.8}
                />
              </NavLink>
            </motion.div>
          </>
        ) : (
          <>
            {/* Login */}
            <motion.div
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-[13px] font-bold text-[#D6B36A] no-underline max-[480px]:text-[11px]"
              >
                Login
              </Link>
            </motion.div>

            {/* Register */}
            <motion.div
              whileHover={{ y: -2, scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
            >
              <Link
                to="/register"
                onClick={closeMenu}
                className={buttonClass}
              >
                Register
              </Link>
            </motion.div>
          </>
        )}

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMenuOpen((prev) => !prev)}
          aria-label={
            menuOpen
              ? "Close navigation menu"
              : "Open navigation menu"
          }
          aria-expanded={menuOpen}
          className="hidden max-[850px]:flex h-[40px] w-[40px] max-[480px]:h-[36px] max-[480px]:w-[36px] items-center justify-center rounded-full text-[#D6B36A] transition-colors duration-300 hover:bg-[#252525]"
        >
          {menuOpen ? <X size={25} /> : <Menu size={25} />}
        </button>
      </motion.div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            variants={mobileMenuAnimation}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="hidden max-[850px]:block w-full basis-full overflow-hidden"
          >
            <div className="mt-3 border-t border-[#252525] pt-2 pb-2">

              <NavLink
                to="/"
                end
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/products"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Products
              </NavLink>

              <NavLink
                to="/about"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                About Us
              </NavLink>

              <NavLink
                to="/contact"
                onClick={closeMenu}
                className={mobileLinkClass}
              >
                Contact Us
              </NavLink>

              {isAuthenticated && (
                <>
                  <NavLink
                    to="/orders"
                    onClick={closeMenu}
                    className={mobileLinkClass}
                  >
                    My Orders
                  </NavLink>

                  <NavLink
                    to="/profile"
                    onClick={closeMenu}
                    className={mobileLinkClass}
                  >
                    My Profile
                  </NavLink>
                </>
              )}

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

export default Navbar;
