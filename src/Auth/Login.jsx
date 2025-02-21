import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ toggleForms }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", formData);
      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));
      
      navigate("/");
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
  className="styled-input"
  placeholder="Enter your username"
  value={formData.username}
  onChange={handleChange}
  required
  autoComplete="off"
  autoCapitalize="none"
  spellCheck="false"
/>
      </div>
      
      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
  type="password"
  name="password"
  className="styled-input"
  placeholder="Enter your password"
  value={formData.password}
  onChange={handleChange}
  required
  autoComplete="new-password"
/>
      </div>
      
      <button type="submit" className="auth-button">LOGIN</button>
      
      <button type="button" className="switch-form" onClick={toggleForms}>
        Create Account
      </button>
      
      <a href="#" className="switch-form mx-2">Forget your Password?</a>
    </form>
  );
};

export default Login;