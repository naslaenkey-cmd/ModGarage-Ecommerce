
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import heroImage from "../assets/hero.jpg";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
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

      setSuccess("Account created successfully! You can now log in.");

      setFormData({
        fullName: "",
        email: "",
        password: "",
      });

      setShowPassword(false);
    } catch (err) {
      setError("Registration failed. Please try again.");
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
          <h2>BUILD YOUR STYLE.</h2>
          <p>
            Join ModGarage and explore premium
            car modifications and accessories.
          </p>
        </div>
      </div>

      <div className="auth-form-section">
        <div className="auth-form-container">
          <span className="auth-tag">JOIN MODGARAGE</span>

          <h1>CREATE ACCOUNT</h1>

          <p className="auth-description">
            Create your account and start exploring.
          </p>

          <form className="auth-form" onSubmit={handleSubmit}>
            {error && <p className="auth-error">{error}</p>}

            {success && <p className="auth-success">{success}</p>}

            <div className="auth-field">
              <label htmlFor="register-name">Full Name</label>

              <input
                id="register-name"
                type="text"
                name="fullName"
                placeholder="Enter your full name"
                value={formData.fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-email">Email Address</label>

              <input
                id="register-email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="auth-field">
              <label htmlFor="register-password">Password</label>

              <div className="password-input-wrapper">
                <input
                  id="register-password"
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  minLength={6}
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
              {isLoading ? "CREATING ACCOUNT..." : "CREATE ACCOUNT"}
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?
            <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
