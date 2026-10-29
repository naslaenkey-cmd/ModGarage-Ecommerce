
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../redux/slices/authSlice";
import api from "../services/api";

function Login() {

  const dispatch=useDispatch();


  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");

    try {
      setIsLoading(true);

      const response = await api.get("/users");

      const user = response.data.find(
        (item) =>
          item.email === formData.email &&
          item.password === formData.password
      );

      if (!user) {
        setError("Invalid email or password.");
        return;
      }

      dispatch(loginSuccess(user));
      navigate("/dashboard");
      
    } catch {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div>
      <h1>Welcome Back to ModGarage</h1>
      <p>Login to explore car accessories and upgrades.</p>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p role="alert">{error}</p>}

        <button type="submit" disabled={isLoading}>
          {isLoading ? "Logging in..." : "Login"}
        </button>
      </form>

      <p>
        Don't have an account? <Link to="/register">Create Account</Link>
      </p>
    </div>
  );
}

export default Login;
