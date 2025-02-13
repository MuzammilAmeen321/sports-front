import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // Import for redirection

const Login = ({ toggleForms }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate(); // React Router navigation

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", formData);

      // Save token to localStorage
      localStorage.setItem("authToken", response.data.token);

      // Redirect to home page after successful login
      navigate("/home"); 
    } catch (error) {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <form id="loginForm" className="auth-form" onSubmit={handleSubmit}>
      {error && <p className="error-message">{error}</p>}

      <div className="input-group">
        <i className="fas fa-user"></i>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="auth-button">LOGIN</button>

      <button type="button" className="switch-form" onClick={toggleForms}>
        Create Account
      </button>
      <a href="#" className="switch-form mx-2">Forget your Password?</a>
      <div className="social-auth">
        <button type="button" className="social-button facebook">
          Login with <i className="fab fa-facebook-f"></i>acebook
        </button>
        <button type="button" className="social-button google">
          Login with <i className="fab fa-google"></i>oogle
        </button>
      </div>


    </form>
  );
};

export default Login;
