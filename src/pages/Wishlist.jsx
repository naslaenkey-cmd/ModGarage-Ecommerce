
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import useWishlist from "../hooks/useWishlist";
import useCart from "../hooks/useCart";

function Wishlist() {
  const {
    wishlistItems,
    isLoading,
    isError,
    error,
    removeFromWishlist,
  } = useWishlist();

  const { addToCart } = useCart();

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
    toast.success("Removed from wishlist");
  };

  const handleMoveToCart = (product) => {
    if (product.stock <= 0) {
      toast.error("This product is out of stock.");
      return;
    }

    addToCart(product);
    removeFromWishlist(product.id);

    toast.success("Product moved to cart");
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#080808] text-[#D6B36A]">
        Loading your wishlist...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center bg-[#080808] text-[#E58B8B]">
        Unable to load wishlist: {error?.message}
      </div>
    );
  }

  if (wishlistItems.length === 0) {
    return (
      <section className="flex min-h-screen items-center justify-center bg-[#080808] px-[6%] py-16 text-center text-[#F5F3EE]">
        <div className="flex min-h-[70vh] flex-col items-center justify-center">
          <span className="mb-5 text-[65px] text-[#D6B36A]">
            ♡
          </span>

          <p className="mb-3 text-[11px] font-bold tracking-[3px] text-[#D6B36A]">
            YOUR COLLECTION
          </p>

          <h1 className="mb-3 font-['Bebas_Neue'] text-[clamp(48px,6vw,72px)] tracking-[3px]">
            MY <span className="text-[#D6B36A]">WISHLIST.</span>
          </h1>

          <p className="mb-7 text-sm text-[#999]">
            Your wishlist is waiting for some upgrades.
          </p>

          <Link
            to="/products"
            className="border border-[#D6B36A] bg-[#D6B36A] px-8 py-4 font-['Oswald'] text-[13px] font-bold tracking-[1.5px] text-[#080808] transition duration-300 hover:bg-[#E8C982]"
          >
            EXPLORE PRODUCTS
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#080808] px-[6%] py-[65px] text-[#F5F3EE] max-[750px]:px-[4%] max-[750px]:py-[45px]">
      <div className="mx-auto max-w-[1400px]">

        {/* Heading */}
        <div className="mb-[45px] border-b border-[#292929] pb-[25px]">
          <p className="mb-3 text-[11px] font-bold tracking-[3px] text-[#D6B36A]">
            SAVED FOR YOUR NEXT UPGRADE
          </p>

          <h1 className="mb-2 font-['Bebas_Neue'] text-[clamp(48px,6vw,72px)] font-normal tracking-[3px]">
            MY <span className="text-[#D6B36A]">WISHLIST.</span>
          </h1>

          <p className="text-[13px] text-[#888]">
            {wishlistItems.length} saved{" "}
            {wishlistItems.length === 1 ? "product" : "products"}
          </p>
        </div>

        {/* Wishlist Products */}
        <div className="grid grid-cols-4 gap-[25px] max-[1100px]:grid-cols-3 max-[750px]:grid-cols-2 max-[750px]:gap-4 max-[480px]:grid-cols-1">
          {wishlistItems.map((product) => (
            <article
              key={product.id}
              className="group overflow-hidden border border-[#262626] bg-[#121212] transition duration-300 hover:-translate-y-1.5 hover:border-[#C49A45]"
            >
              {/* Product Image */}
              <Link
                to={`/products/${product.id}`}
                className="block h-[230px] overflow-hidden bg-[#181818] max-[750px]:h-[190px] max-[480px]:h-[250px]"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.06]"
                />
              </Link>

              {/* Product Information */}
              <div className="p-5 max-[750px]:p-[15px]">
                <p className="mb-2.5 text-[10px] font-bold uppercase tracking-[1.5px] text-[#C49A45]">
                  {product.category}
                </p>

                <h2 className="mb-3 min-h-[42px] font-['Oswald'] text-[19px] font-medium text-[#F5F3EE]">
                  {product.name}
                </h2>

                <p className="mb-3 text-xl font-bold text-[#D6B36A]">
                  ₹{Number(product.price).toLocaleString("en-IN")}
                </p>

                <p
                  className={`mb-[18px] text-[10px] font-bold tracking-[1px] ${
                    product.stock > 0
                      ? "text-[#8FBD83]"
                      : "text-[#E07878]"
                  }`}
                >
                  {product.stock > 0 ? "IN STOCK" : "OUT OF STOCK"}
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2.5">
                  <button
                    onClick={() => handleMoveToCart(product)}
                    disabled={product.stock <= 0}
                    className="min-h-[43px] w-full border border-[#D6B36A] bg-[#D6B36A] font-['Oswald'] text-xs font-semibold tracking-[1.5px] text-[#080808] transition duration-300 hover:border-[#E8C982] hover:bg-[#E8C982] disabled:cursor-not-allowed disabled:opacity-40"
                  >
                    MOVE TO CART
                  </button>

                  <button
                    onClick={() => handleRemove(product.id)}
                    className="min-h-[43px] w-full border border-[#393939] bg-transparent font-['Oswald'] text-xs font-semibold tracking-[1.5px] text-[#AAA] transition duration-300 hover:border-[#BD5555] hover:text-[#E07878]"
                  >
                    REMOVE
                  </button>
                </div>

                <Link
                  to={`/products/${product.id}`}
                  className="mt-[18px] block text-center text-[10px] font-bold tracking-[1.5px] text-[#999] transition hover:text-[#D6B36A]"
                >
                  VIEW DETAILS →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Continue Shopping */}
        <Link
          to="/products"
          className="mt-10 inline-block text-xs font-bold tracking-[1px] text-[#D6B36A] transition hover:text-white"
        >
          ← CONTINUE SHOPPING
        </Link>

      </div>
    </section>
  );
}

export default Wishlist;
