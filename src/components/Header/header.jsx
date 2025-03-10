import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileUpdateModal from "../Edit_profile";
import logo from '../../assets/images/logo512.png';
const Navbar=()=> {
  const navigate = useNavigate();
  const [modalView, setModalView] = useState(null);
  const [user, setUser] = useState(null);
  const defaultImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTM8LrGjiUDcvYjUMk7jUJJZo0kK4Y4NzKxmQ&s";
  const [profile, setProfile] = useState(defaultImage);

  // Fetch user from localStorage on component mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);

        if (parsedUser.profile_picture) {
          console.log(`http://127.0.0.1:8000/storage/${parsedUser.profile_picture}`);
          setProfile(`http://127.0.0.1:8000/storage/${parsedUser.profile_picture}`);
        } else {
          setProfile(defaultImage);
        }
      } catch (error) {
        console.error("Error parsing user data:", error);
        setProfile(defaultImage);
      }
    } else {
      setProfile(defaultImage);
    }
  }, [modalView]); // Re-run effect when modal is opened/closed


  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setUser(null);
    setProfile(defaultImage);
    navigate("/login"); // Redirect to login page
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg">
        <div className="container-fluid d-flex justify-content-around p-2 flex-nowrap">
          <a className="navbar-brand logo " href="/"><img src={logo} alt="logo"/></a>

          <div className="mx-auto header-menu">
            <ul className="navbar-nav d-flex flex-row gap-3">
              <li className="nav-item"><a className="nav-link " href="/live">Live</a></li>
              <li className="nav-item"><a className="nav-link " href="/upcoming">Upcoming</a></li>
            </ul>
          </div>

          <div className="ms-auto">
            {user ? (
              <div className="dropdown">
                <button className="btn" id="navbarDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                  <img
                    src={profile}
                    className="rounded-circle border border-secondary"
                    alt="User Avatar"
                    width="40"
                    height="40"
                    style={{ objectFit: "cover", cursor: "pointer" }}
                    onError={(e) => {
                      e.target.src = defaultImage; // Reset to default if broken
                      setProfile(defaultImage);
                    }}
                  />
                </button>
                <ul className="dropdown-menu dropdown-menu-end bg-dark border border-warning">
                  <li>
                    <a className="dropdown-item text-warning d-flex align-items-center" href="#" onClick={() => setModalView("profile")}>
                      <i className="fas fa-user me-2"></i> Profile
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item text-warning d-flex align-items-center" href="#" onClick={() => setModalView("password")}>
                      <i className="fas fa-key me-2"></i> Change Password
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item text-warning d-flex align-items-center" href="/my-teams">
                      <i className="fas fa-users me-2"></i> Manage Team
                    </a>
                  </li>
                  <li>
                    <button className="dropdown-item text-warning bg-danger d-flex align-items-center" onClick={handleLogout}>
                      <i className="fas fa-sign-out-alt me-2"></i> Log Out
                    </button>
                  </li>
                </ul>
              </div>
            ) : (
              <a href="/login" className="btn btn-warning">Login</a>
            )}
          </div>
        </div>
      </nav>

      {modalView && <ProfileUpdateModal view={modalView} onClose={() => setModalView(null)} />}
    </>
  );
}

export default Navbar;