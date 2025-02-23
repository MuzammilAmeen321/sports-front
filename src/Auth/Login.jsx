import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ toggleForms }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Clear input field on focus
  const handleFocus = (e) => {
    const { name } = e.target;
    if (formData[name] === "") {
      return; // Do nothing if the field is already empty
    }
    setFormData((prevData) => ({ ...prevData, [name]: "" }));
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8000/api/login", formData);
      const { token, user } = response.data;

      localStorage.setItem("authToken", token);
      localStorage.setItem("user", JSON.stringify(user));

      showToast("Login successful! Redirecting to home...", "success");

      // Redirect to home page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      showToast("Invalid credentials. Please try again.", "danger");
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <div
        className={`toast position-fixed top-0 end-0 m-3 ${
          toast.show ? "show" : "hide"
        }`}
        style={{ zIndex: 1050 }}
      >
        <div className={`toast-header bg-${toast.type} text-white`}>
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

      {/* Login Form */}
      <form id="loginForm" className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            onFocus={handleFocus} // Clear field on focus
            autoComplete="username" // Enable suggestions for username
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
            onFocus={handleFocus} // Clear field on focus
            autoComplete="current-password" // Enable suggestions for password
            required
          />
        </div>

        <button type="submit" className="auth-button">
          LOGIN
        </button>
        <button type="button" className="switch-form" onClick={toggleForms}>
          Create Account
        </button>
      </form>
    </>
  );
};

export default Login;