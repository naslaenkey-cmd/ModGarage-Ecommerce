
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { adminLogin } from "../../redux/slices/adminAuthSlice";

function AdminLogin() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoading, error } = useSelector(
    (state) => state.adminAuth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await dispatch(
        adminLogin({ email, password })
      ).unwrap();

      navigate("/admin/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex min-h-[100vh] min-h-[100dvh] w-full items-center justify-center overflow-x-hidden bg-[#080808] px-4 py-6 sm:px-6 sm:py-10">

      <div className="w-full max-w-md rounded-2xl border border-[#333] bg-[#171717] p-5 shadow-2xl sm:p-8">

        {/* Heading */}
        <div className="mb-6 text-center sm:mb-8">

          <h1 className="text-2xl font-bold tracking-wide text-[#D6B36A] sm:text-3xl">
            MODGARAGE
          </h1>

          <p className="mt-2 text-xs text-gray-400 sm:text-sm">
            Admin Dashboard
          </p>

          <h2 className="mt-5 text-xl font-semibold text-white sm:mt-6 sm:text-2xl">
            Welcome Back
          </h2>

          <p className="mt-2 text-xs text-gray-400 sm:text-sm">
            Sign in to manage your store
          </p>

        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">

          {/* Email */}
          <div>

            <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
              Email Address
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-lg border border-[#444] bg-[#101010] px-3 py-3 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D6B36A] sm:px-4 sm:text-base"
            />

          </div>

          {/* Password */}
          <div>

            <label className="mb-2 block text-xs font-medium text-gray-300 sm:text-sm">
              Password
            </label>

            <div className="relative">

              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-lg border border-[#444] bg-[#101010] px-3 py-3 pr-20 text-sm text-white outline-none transition placeholder:text-gray-600 focus:border-[#D6B36A] sm:px-4 sm:text-base"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-medium text-[#D6B36A] transition hover:text-[#E8C982] sm:right-4 sm:text-sm"
              >
                {showPassword ? "HIDE" : "SHOW"}
              </button>

            </div>

          </div>

          {/* Error */}
          {error && (
            <p className="break-words rounded-lg bg-red-500/10 p-3 text-xs text-red-400 sm:text-sm">
              {error}
            </p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-lg bg-[#D6B36A] py-3 text-sm font-semibold text-black transition hover:bg-[#E8C982] disabled:cursor-not-allowed disabled:opacity-50 sm:text-base"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>

        </form>

        {/* Footer */}
        <p className="mt-6 text-center text-[10px] text-gray-500 sm:mt-8 sm:text-xs">
          ModGarage Admin Portal
        </p>

      </div>
    </div>
  );
}

export default AdminLogin;
