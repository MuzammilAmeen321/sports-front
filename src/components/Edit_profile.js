import React, { useState } from "react";

export default function ProfileUpdateModal({ onClose, view }) {
  const [modalView, setModalView] = useState(view);
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    clubName: "Warriors FC",
    sponsorName: "Nike",
    avatar: "https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png",
  });

  const [passwords, setPasswords] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

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

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog">
        <div className="modal-content">
          {/* Header */}
          <div className="modal-header">
            <h5 className="modal-title">
              {modalView === "profile" ? "Update Profile" : "Change Password"}
            </h5>
            <button type="button" className="btn btn-danger btn-close" onClick={onClose}></button>
          </div>

          {/* Body */}
          <div className="modal-body text-center">
            {modalView === "profile" ? (
              <>
                <div className="position-relative d-inline-block">
                  <img
                    src={user.avatar}
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

                {['name', 'email', 'phone', 'clubName', 'sponsorName'].map((field, index) => (
                  <div className="mt-3" key={index}>
                    <label className="form-label fw-bold">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      className="form-control"
                      value={user[field]}
                      onChange={(e) => setUser({ ...user, [field]: e.target.value })}
                    />
                  </div>
                ))}
              </>
            ) : (
              ['oldPassword', 'newPassword', 'confirmPassword'].map((field, index) => (
                <div className="mt-3" key={index}>
                  <label className="form-label fw-bold">{field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</label>
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

          {/* Footer */}
          <div className="modal-footer d-flex justify-content-between">
            <button type="button" className="btn text-white" onClick={onClose}>
              Close
            </button>
            <button type="button" className="btn button-dark text-white">
              {modalView === "profile" ? "Save Changes" : "Update Password"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
