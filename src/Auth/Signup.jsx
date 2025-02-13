import React, { useState } from "react";
import axios from "axios";

const Signup = ({ toggleForms }) => {
  // State for form inputs
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple password confirmation check
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      // Send data to Laravel API
      const response = await axios.post("http://localhost:8000/api/register", {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      });

      console.log("User registered:", response.data);
      alert("Signup successful!");

      // Clear the form inputs on success
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <form id="signupForm" className="auth-form" onSubmit={handleSubmit}>
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
        <i className="fas fa-envelope"></i>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="input-group">
        <i className="fas fa-phone"></i>
        <input
          type="tel"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
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

      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
      </div>

      <button type="submit" className="auth-button">SIGN UP</button>
      <button type="button" className="switch-form" onClick={toggleForms}>
        Already have an account?
      </button>
    </form>
  );
};

export default Signup;
