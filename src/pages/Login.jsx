
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { loginSuccess } from "../redux/slices/authSlice";
import api from "../services/api";
import heroImage from "../assets/hero.jpg";

import "./Login.css";

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
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

      const response = await api.get("/users");

      const user = response.data.find(
        (item) =>
          item.email.toLowerCase() === formData.email.trim().toLowerCase() &&
          item.password === formData.password
      );

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      dispatch(loginSuccess(user));
      navigate("/dashboard");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div
        className="auth-visual"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="auth-visual-overlay">
          <h1>MODGARAGE</h1>
          <h2>WELCOME BACK.</h2>
          <p>
            Your garage. Your style. Your rules.
            Discover premium automotive upgrades.
          </p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-container">
          <span className="auth-tag">MODGARAGE ACCOUNT</span>

          <h1>LOGIN</h1>

          <p className="auth-description">
            Sign in to continue your automotive journey.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="auth-error">{error}</p>}

            <div className="auth-field">
              <label htmlFor="login-email">Email Address</label>

              <input
                id="login-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="login-password">Password</label>

              <div className="password-input-wrapper">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword((prev) => !prev)}
                >
                  {showPassword ? "HIDE" : "SHOW"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="auth-submit-button"
              disabled={isLoading}
            >
              {isLoading ? "LOGGING IN..." : "LOGIN"}
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?
            <Link to="/register">Create Account</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
