import React, { useState, useEffect } from "react";
import axios from "axios";

export default function ProfileUpdateModal({ onClose, view }) {
  const [modalView, setModalView] = useState(view);
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    clubName: "",
    sponsorName: "",
    avatar: null, // Set to null initially
  });
  const API_URL = "https://matc.matchdada.com/public/api";
  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch user profile
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await axios.get(`${API_URL}/user-profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
  
        console.log("User Profile Response:", response.data); // Debugging
  
        setUser({
          name: response.data.username || "",
          email: response.data.email || "",
          phone: response.data.phone || "",
          clubName: response.data.club_name || "",
          sponsorName: response.data.sponsor_name || "",
          avatar: response.data.profile_picture 
            ? `https://matc.matchdada.com/public/storage/${response.data.profile_picture}` 
            : null, // Ensure correct path
        });
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };
  
    fetchUserProfile();
  }, []);
  
  

  // Handle file upload
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUser({ ...user, avatar: e.target.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle profile update submission
  const handleProfileUpdate = async () => {
    setLoading(true);
    setMessage("");

    try {
        const token = localStorage.getItem("authToken");
        const response = await axios.post(
            `${API_URL}/update-profile`,
            {
                username: user.name,
                email: user.email,
                phone: user.phone,
                club_name: user.clubName,
                sponsor_name: user.sponsorName,
                avatar: user.avatar || null, 
            },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );

        setMessage(response.data.message);

        // Update the user object with the new data
        const updatedUser = {
            ...user,
            name: response.data.username,
            email: response.data.email,
            phone: response.data.phone,
            clubName: response.data.club_name,
            sponsorName: response.data.sponsor_name,
            avatar: response.data.profile_picture 
                ? `http://127.0.0.1:8000/storage/${response.data.profile_picture}`
                : user.avatar,
        };

        // Update state
        setUser(updatedUser);

        // Store updated user in localStorage
        localStorage.setItem("user", JSON.stringify(updatedUser));

        // Trigger parent update if needed
        if (typeof onProfileUpdate === "function") {
            onProfileUpdate(updatedUser);
        }

    } catch (error) {
        setMessage(error.response?.data?.message || "Failed to update profile");
    }

    setLoading(false);
};


  // Handle password update submission
  const handlePasswordUpdate = async () => {
    setLoading(true);
    setMessage("");

    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/update-password",
        {
          oldPassword: passwords.oldPassword,
          newPassword: passwords.newPassword,
          newPassword_confirmation: passwords.confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Failed to update password");
    }

    setLoading(false);
  };

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">
              {modalView === "profile" ? "Update Profile" : "Change Password"}
            </h5>
            <button type="button" className="btn btn-danger btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body text-center">
            {message && <div className="alert alert-info">{message}</div>}
            
            {modalView === "profile" ? (
              <>
                <div className="position-relative d-inline-block">
                  <img
                    src={user.avatar || "https://via.placeholder.com/120"}
                    alt="Avatar"
                    className="rounded-circle border border-secondary"
                    width="120"
                    height="120"
                    style={{ objectFit: "cover", cursor: "pointer" }}
                    onClick={() => document.getElementById("avatarInput").click()}
                  />
                  <input
                    type="file"
                    id="avatarInput"
                    className="d-none"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>

                {["name", "email", "phone", "clubName", "sponsorName"].map((field, index) => (
                  <div className="mt-3" key={index}>
                    <label className="form-label fw-bold">
                      {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                    </label>
                    <input
                      type={field === "email" ? "email" : "text"}
                      className="form-control"
                      value={user[field]}
                      onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                    />
                  </div>
                ))}
              </>
            ) : (
              ["oldPassword", "newPassword", "confirmPassword"].map((field, index) => (
                <div className="mt-3" key={index}>
                  <label className="form-label fw-bold">
                    {field.replace(/([A-Z])/g, " $1").replace(/^./, (str) => str.toUpperCase())}
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    value={passwords[field]}
                    onChange={(e) => setPasswords({ ...passwords, [field]: e.target.value })}
                  />
                </div>
              ))
            )}
          </div>

          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn text-white" onClick={onClose}>
              Close
            </button>
            <button
              type="button"
              className="btn btn-dark text-white"
              onClick={modalView === "profile" ? handleProfileUpdate : handlePasswordUpdate}
              disabled={loading}
            >
              {loading ? "Saving..." : modalView === "profile" ? "Save Changes" : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
