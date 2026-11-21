
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginSuccess } from "../redux/slices/authSlice";
import { useLogin } from "../hooks/useAuth";

import heroImage from "../assets/hero.jpg";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    loginMutation.mutate(formData, {
      onSuccess: (user) => {
        dispatch(loginSuccess(user));
        navigate("/", { replace: true });
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#080808] p-4">
      <div className="w-full max-w-5xl overflow-hidden rounded-2xl bg-[#151515] shadow-2xl md:flex">

        {/* Left Image Section */}
        <div className="hidden md:block md:w-1/2">
          <img
            src={heroImage}
            alt="ModGarage"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Right Login Section */}
        <div className="w-full p-8 md:w-1/2 md:p-12">

          <h1 className="mb-2 text-3xl font-bold text-[#D6B36A]">
            Welcome Back
          </h1>

          <p className="mb-8 text-gray-400">
            Login to your ModGarage account
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Email */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Email Address
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
                className="w-full rounded-lg border border-gray-700 bg-[#202020] px-4 py-3 text-white outline-none focus:border-[#D6B36A]"
              />
            </div>

            {/* Password */}
            <div>
              <label className="mb-2 block text-sm text-gray-300">
                Password
              </label>

              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full rounded-lg border border-gray-700 bg-[#202020] px-4 py-3 pr-20 text-white outline-none focus:border-[#D6B36A]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#D6B36A]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* Error */}
            {loginMutation.isError && (
              <p className="text-sm text-red-500">
                {loginMutation.error.message}
              </p>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={loginMutation.isPending}
              className="w-full rounded-lg bg-[#D6B36A] py-3 font-semibold text-black transition hover:bg-[#E8C982] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loginMutation.isPending ? "Logging in..." : "LOGIN"}
            </button>

          </form>

          <p className="mt-6 text-center text-sm text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="font-semibold text-[#D6B36A] hover:underline"
            >
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Login;
