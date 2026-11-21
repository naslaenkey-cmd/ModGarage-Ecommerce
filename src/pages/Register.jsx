
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import heroImage from "../assets/hero.jpg";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      setError("");
      setSuccess("");

      
      if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match.");
        return;
      }

      const response = await api.get("/users");

      const existingUser = response.data.find(
        (user) =>
          user.email.toLowerCase() ===
          formData.email.trim().toLowerCase()
      );

      if (existingUser) {
        setError("An account with this email already exists.");
        return;
      }

      
      const newUser = {
        fullName: formData.fullName.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
      };

      await api.post("/users", newUser);

      setSuccess(
        "Account created successfully! Redirecting to login..."
      );

      setFormData({
        fullName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });

      setShowPassword(false);
      setShowConfirmPassword(false);

      navigate("/login", { replace: true });

    } catch (err) {
      setError("Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-[#080808] font-sans text-[#F5F3EE] md:grid-cols-2">

      {/* LEFT IMAGE SECTION */}
      <div
        className="relative hidden min-h-screen items-end bg-cover bg-center md:flex"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 to-black/15"></div>

        <div className="relative z-10 max-w-[550px] p-[35px] lg:p-[60px]">
          <h1 className="mb-[25px] font-bold tracking-[5px] text-[#D6B36A]">
            MODGARAGE
          </h1>

          <h2 className="mb-[18px] text-[42px] font-bold leading-[1.1] tracking-[2px] lg:text-[55px]">
            BUILD YOUR STYLE.
          </h2>

          <p className="max-w-[380px] text-[15px] leading-[1.8] text-[#C2C2C2]">
            Join ModGarage and explore premium car modifications
            and accessories.
          </p>
        </div>
      </div>

      {/* RIGHT FORM SECTION */}
      <div className="flex min-h-screen items-center justify-center bg-[#080808] px-[25px] py-[35px] sm:px-[35px] md:px-[30px] lg:px-[50px]">
        <div className="w-full max-w-[430px]">

          <span className="mb-[18px] inline-block text-[11px] font-bold tracking-[3px] text-[#D6B36A]">
            JOIN MODGARAGE
          </span>

          <h1 className="mb-[12px] text-[35px] font-bold tracking-[2px] text-[#F5F3EE] sm:text-[42px]">
            CREATE ACCOUNT
          </h1>

          <p className="mb-[30px] text-[14px] leading-[1.7] text-[#999999]">
            Create your account and start exploring.
          </p>

          <form
            className="flex flex-col gap-[19px]"
            onSubmit={handleSubmit}
          >

            {/* ERROR MESSAGE */}
            {error && (
              <p className="rounded-[4px] border border-red-500/30 bg-red-500/10 px-[14px] py-[12px] text-[13px] leading-[1.5] text-[#FF7777]">
                {error}
              </p>
            )}

            {/* SUCCESS MESSAGE */}
            {success && (
              <p className="rounded-[4px] border border-green-500/30 bg-green-500/10 px-[14px] py-[12px] text-[13px] leading-[1.5] text-[#75D995]">
                {success}
              </p>
            )}

            {/* FULL NAME */}
            <div className="flex flex-col gap-[9px]">
              <label htmlFor="register-name" className="text-[12px] font-bold tracking-[1px] text-[#D6B36A]">
                FULL NAME
              </label>

              <input
                id="register-name"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="!w-full !rounded-[4px] !border !border-[#333333] !bg-[#151515] !px-[15px] !py-[15px] !text-[14px] !text-[#F5F3EE] placeholder:!text-[#666666] focus:!border-[#D6B36A] focus:!outline-none"
              />
            </div>

            {/* EMAIL */}
            <div className="flex flex-col gap-[9px]">
              <label htmlFor="register-email" className="text-[12px] font-bold tracking-[1px] text-[#D6B36A]">
                EMAIL ADDRESS
              </label>

              <input
                id="register-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
                className="!w-full !rounded-[4px] !border !border-[#333333] !bg-[#151515] !px-[15px] !py-[15px] !text-[14px] !text-[#F5F3EE] placeholder:!text-[#666666] focus:!border-[#D6B36A] focus:!outline-none"
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-[9px]">
              <label htmlFor="register-password" className="text-[12px] font-bold tracking-[1px] text-[#D6B36A]">
                PASSWORD
              </label>

              <div className="relative w-full">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="!w-full !rounded-[4px] !border !border-[#333333] !bg-[#151515] !py-[15px] !pl-[15px] !pr-[75px] !text-[14px] !text-[#F5F3EE] placeholder:!text-[#666666] focus:!border-[#D6B36A] focus:!outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute top-1/2 right-[15px] -translate-y-1/2 border-none bg-transparent p-[5px] text-[11px] font-extrabold tracking-[1px] text-[#D6B36A] hover:text-[#E8C982]"
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* CONFIRM PASSWORD */}
            <div className="flex flex-col gap-[9px]">
              <label htmlFor="confirm-password" className="text-[12px] font-bold tracking-[1px] text-[#D6B36A]">
                CONFIRM PASSWORD
              </label>

              <div className="relative w-full">
                <input
                  id="confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  minLength={6}
                  className="!w-full !rounded-[4px] !border !border-[#333333] !bg-[#151515] !py-[15px] !pl-[15px] !pr-[75px] !text-[14px] !text-[#F5F3EE] placeholder:!text-[#666666] focus:!border-[#D6B36A] focus:!outline-none"
                />

                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute top-1/2 right-[15px] -translate-y-1/2 border-none bg-transparent p-[5px] text-[11px] font-extrabold tracking-[1px] text-[#D6B36A] hover:text-[#E8C982]"
                >
                  {showConfirmPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            {/* CREATE ACCOUNT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="mt-[5px] w-full rounded-[4px] border border-[#D6B36A] bg-[#D6B36A] px-[16px] py-[16px] text-[13px] font-extrabold tracking-[2px] text-[#080808] transition-all duration-300 hover:-translate-y-[2px] hover:border-[#E8C982] hover:bg-[#E8C982] disabled:translate-y-0 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>

          </form>

          {/* LOGIN LINK */}
          <p className="mt-[25px] text-center text-[13px] text-[#999999]">
            Already have an account?

            <Link
              to="/login"
              className="ml-[6px] font-bold text-[#D6B36A] transition-colors hover:text-[#E8C982]"
            >
              Login
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default Register;
