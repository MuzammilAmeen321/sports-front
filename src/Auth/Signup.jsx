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

  // State for toast messages
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to show toast notifications
  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    // Auto-hide the toast after 3 seconds
    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple password confirmation check
    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match.", "danger");
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

      showToast("Signup successful!", "success");

      // Clear the form inputs on success
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      showToast(
        error.response?.data?.error || "Signup failed. Please try again.",
        "danger"
      );
    }
  };

  return (
    <>
      {/* Floating Bootstrap Toast Notification */}
      <div
        className={`toast position-fixed top-0 end-0 m-3 ${
          toast.show ? "show" : "hide"
        }`}
        style={{ zIndex: 1050 }}
      >
        <div
          className={`toast-header bg-${toast.type} text-white`}
        >
          <strong className="me-auto">
            {toast.type === "success" ? "Success" : "Error"}
          </strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => setToast({ show: false, message: "", type: "" })}
          ></button>
        </div>
        <div className="toast-body">{toast.message}</div>
      </div>

      {/* Signup Form */}
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
    </>
  );
};

export default Signup;
