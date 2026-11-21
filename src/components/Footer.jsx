
import { Link } from "react-router-dom";
import {
  MessageCircle,
  Camera,
  AtSign,
  Share2,
  Mail,
  MapPin,
  Phone,
  ArrowRight,
} from "lucide-react";

function Footer() {
  const contactEmail = "your-email@example.com";
  const contactPhone = "+91 XXXXX XXXXX";
  const contactLocation = "Your Location, Kerala, India";

  const linkStyle =
    "text-[13px] text-[#858585] no-underline transition-colors duration-300 hover:text-[#d6b36a]";

  const headingStyle =
    "mb-2 font-['Oswald',sans-serif] text-[16px] font-semibold text-[#f5f3ee]";

  return (
    <footer className="w-full overflow-hidden bg-[#080808] px-[7%] pt-[35px] text-[#f5f3ee] max-[550px]:px-[6%]">

      <div className="mx-auto max-w-[1500px]">

        {/* Main Footer */}
        <div className="grid grid-cols-[1.5fr_1fr_1fr_1fr] gap-x-[35px] gap-y-[25px] border-b border-[#292929] pb-[28px] max-[900px]:grid-cols-2 max-[550px]:grid-cols-1">

          {/* Brand */}
          <div>
            <Link
              to="/"
              className="mb-3 inline-block font-['Bebas_Neue',sans-serif] text-[32px] tracking-[2px] text-[#f5f3ee] no-underline"
            >
              MOD<span className="text-[#d6b36a]">GARAGE</span>
            </Link>

            <p className="mb-4 max-w-[350px] text-[12px] leading-[1.7] text-[#858585]">
              Upgrade your drive. Define your style.
              Discover premium automotive accessories
              designed for enthusiasts.
            </p>

            <div className="flex items-center gap-2">
              {[MessageCircle, Camera, AtSign, Share2].map(
                (Icon, index) => (
                  <div
                    key={index}
                    className="flex h-[34px] w-[34px] items-center justify-center rounded-[4px] bg-[#1b1b1b] text-[#eeeeee] transition-all duration-300 hover:bg-[#d6b36a] hover:text-black"
                  >
                    <Icon size={16} />
                  </div>
                )
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-start gap-[12px]">
            <h3 className={headingStyle}>Quick Links</h3>

            <Link to="/" className={linkStyle}>Home</Link>
            <Link to="/products" className={linkStyle}>Shop Products</Link>
            <Link to="/about" className={linkStyle}>About Us</Link>
            <Link to="/cart" className={linkStyle}>Shopping Cart</Link>
            <Link to="/wishlist" className={linkStyle}>Wishlist</Link>
            <Link to="/orders" className={linkStyle}>My Orders</Link>
          </div>

          {/* Categories */}
          <div className="flex flex-col items-start gap-[12px]">
            <h3 className={headingStyle}>Categories</h3>

            <Link to="/products?category=Exterior%20Upgrades" className={linkStyle}>
              Exterior Upgrades
            </Link>

            <Link to="/products?category=Interior%20Upgrades" className={linkStyle}>
              Interior Upgrades
            </Link>

            <Link to="/products?category=Lighting" className={linkStyle}>
              Lighting
            </Link>

            <Link to="/products?category=Wheels%20%26%20Tyres" className={linkStyle}>
              Wheels &amp; Tyres
            </Link>

            <Link to="/products?category=Performance%20Parts" className={linkStyle}>
              Performance Parts
            </Link>
          </div>

          {/* Contact Info */}
          <div className="flex flex-col items-start gap-[14px]">
            <h3 className={headingStyle}>Contact Info</h3>

            <a
              href={`tel:${contactPhone}`}
              className={`${linkStyle} flex items-center gap-2`}
            >
              <Phone size={15} className="shrink-0 text-[#d6b36a]" />
              <span>{contactPhone}</span>
            </a>

            <a
              href={`mailto:${contactEmail}`}
              className={`${linkStyle} flex items-center gap-2`}
            >
              <Mail size={15} className="shrink-0 text-[#d6b36a]" />
              <span className="break-all">{contactEmail}</span>
            </a>

            <div className="flex items-center gap-2 text-[13px] text-[#858585]">
              <MapPin size={15} className="shrink-0 text-[#d6b36a]" />
              <span>{contactLocation}</span>
            </div>

            <Link
              to="/about"
              className="inline-flex items-center gap-2 text-[12px] text-[#d6b36a] no-underline hover:text-white"
            >
              Contact Us <ArrowRight size={14} />
            </Link>
          </div>
        </div>

        {/* Stay Updated */}
        <div className="flex items-center justify-between gap-6 border-b border-[#292929] py-[22px] max-[650px]:flex-col max-[650px]:items-start">

          <div>
            <h3 className="mb-1 font-['Oswald',sans-serif] text-[20px] font-semibold">
              Stay Updated
            </h3>

            <p className="text-[12px] leading-[1.6] text-[#858585]">
              Discover new automotive accessories and upgrades for your drive.
            </p>
          </div>

          <Link
            to="/products"
            className="inline-flex shrink-0 items-center gap-2 rounded-full bg-[#d6b36a] px-6 py-2.5 text-[12px] font-medium text-black no-underline transition-all duration-300 hover:bg-[#e8c982]"
          >
            Explore Products
            <ArrowRight size={15} />
          </Link>
        </div>

        {/* Payment Methods */}
        <div className="flex items-center justify-between gap-4 border-b border-[#292929] py-[15px] max-[550px]:flex-col max-[550px]:items-start">

          <p className="text-[11px] font-medium uppercase tracking-[1.5px] text-[#858585]">
            Secure Payment Methods
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded bg-white px-3 py-1.5 text-[13px] font-bold italic text-[#1434CB]">
              VISA
            </span>

            <span className="rounded bg-white px-3 py-1.5 text-[12px] font-bold text-[#252525]">
              Mastercard
            </span>

            <span className="rounded bg-white px-3 py-1.5 text-[12px] font-bold text-[#4285F4]">
              G Pay
            </span>

            <span className="rounded bg-white px-3 py-1.5 text-[12px] font-bold text-[#252525]">
              UPI
            </span>
          </div>
        </div>

        {/* Copyright */}
        <div className="flex min-h-[45px] items-center justify-between gap-4 max-[550px]:flex-col max-[550px]:items-start max-[550px]:justify-center max-[550px]:py-3">

          <p className="text-[10px] text-[#777]">
            © {new Date().getFullYear()} ModGarage. All Rights Reserved.
          </p>

          <p className="text-[10px] tracking-wide text-[#777]">
            BUILT FOR AUTOMOTIVE ENTHUSIASTS.
          </p>
        </div>

      </div>
    </footer>
  );
}

export default Footer;
