import React, { useState } from "react";
import ProfileUpdateModal from "../Edit_profile";


export default function Navbar() {
  const [modalView, setModalView] = useState(null); // "profile" or "password"

  return (
    <>
      <nav className="navbar navbar-expand-lg ">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Game Portal
          </a>

          {/* Center Menu Items */}
          <div className="mx-auto">
            <ul className="navbar-nav d-flex flex-row gap-3">
              <li className="nav-item">
                <a className="nav-link text-warning" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-warning" href="/live">Live</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-warning" href="/upcoming">Upcoming</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-warning" href="/result">Result</a>
              </li>
            </ul>
          </div>

          <div className="ms-auto">
            <div className="dropdown">
              <button
                className="btn"
                id="navbarDropdown"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <img
                  src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                  className="rounded-circle"
                  alt="User Avatar"
                  width="40"
                  height="40"
                />
              </button>
              <ul className="dropdown-menu dropdown-menu-end bg-dark border border-warning">
                <li>
                  <a
                    className="dropdown-item text-warning d-flex align-items-center"
                    href="#"
                    onClick={() => setModalView("profile")}
                  >
                    <i className="fas fa-user me-2"></i> Profile
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-warning d-flex align-items-center" href="#">
                    <i className="fas fa-tachometer-alt me-2"></i> Dashboard
                  </a>
                </li>
                <li>
                  <a
                    className="dropdown-item text-warning d-flex align-items-center"
                    href="#"
                    onClick={() => setModalView("password")}
                  >
                    <i className="fas fa-key me-2"></i> Change Password
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-warning d-flex align-items-center" href="#">
                    <i className="fas fa-users me-2"></i> My Team
                  </a>
                </li>
                <li>
                  <a className="dropdown-item text-warning bg-danger d-flex align-items-center" href="#">
                    <i className="fas fa-sign-out-alt me-2"></i> Log Out
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>

      {/* Profile Update Modal (Dynamic View) */}
      {modalView && <ProfileUpdateModal view={modalView} onClose={() => setModalView(null)} />}
    </>
  );
}
