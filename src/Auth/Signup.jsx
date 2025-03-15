import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({ toggleForms }) => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    playerCode: "",
  });
  const API_URL = "https://matc.matchdada.com/public/api"; // Correct API URL
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const generatePlayerCode = (username) => {
    if (!username) return "";
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const prefix = username.substring(0, 3).toUpperCase();
    return `${prefix}${randomDigits}`;
  };

  const isPlayerCodeUnique = async (code) => {
    try {
      const response = await axios.get(`${API_URL}/check-player-code?code=${code}`);
      return !response.data.exists;
    } catch (error) {
      console.error("Error checking player code uniqueness:", error);
      return false;
    }
  };

  const generateUniquePlayerCode = async (username) => {
    let isUnique = false;
    let playerCode = "";

    while (!isUnique) {
      playerCode = generatePlayerCode(username);
      isUnique = await isPlayerCodeUnique(playerCode);
    }

    return playerCode;
  };

  const handleUsernameChange = async (e) => {
    const { value } = e.target;
    setFormData((prevData) => ({ ...prevData, username: value }));

    if (value) {
      const uniquePlayerCode = await generateUniquePlayerCode(value);
      setFormData((prevData) => ({ ...prevData, playerCode: uniquePlayerCode }));
    }
  };

  const showToast = (message, type) => {
    setToast({ show: true, message, type });

    setTimeout(() => {
      setToast({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match.", "danger");
      return;
    }

    try {
      // Use template literals correctly for the API URL
      const response = await axios.post(`${API_URL}/register`, {
        username: formData.username,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        player_code: formData.playerCode,
        profile_picture: formData.profilePicture,
        club_name: formData.clubName,
        sponsor_name: formData.sponsorName,
        total_matches: 0,
        matches_won: 0,
        matches_loss: 0,
        role: "player",
      });

      showToast("Signup successful! Redirecting to login...", "success");

      // Clear form data
      setFormData({
        username: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        playerCode: "",
      });

      // Redirect to login page after 3 seconds
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (error) {
      // Handle API error response
      const errorMessage =
        error.response?.data?.error || "Signup failed. Please try again.";

      // If the error is an object, convert it to a string
      const displayMessage =
        typeof errorMessage === "object" ? JSON.stringify(errorMessage) : errorMessage;

      showToast(displayMessage, "danger");
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

      {/* Signup Form */}
      <form id="signupForm" className="auth-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <i className="fas fa-user"></i>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleUsernameChange}
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
          <i className="fas fa-id-card"></i>
          <input
            type="text"
            name="playerCode"
            placeholder="Player Code"
            value={formData.playerCode}
            readOnly
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

        <button type="submit" className="auth-button">
          SIGN UP
        </button>
        <button type="button" className="switch-form" onClick={toggleForms}>
          Already have an account?
        </button>
      </form>
    </>
  );
};

export default Signup;