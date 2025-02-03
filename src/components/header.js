import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand " href="#">
          Game Portal
        </a>
        <div className="ms-auto">
          <div className="dropdown">
            <button
              className="btn  dropdown-toggle"
              id="navbarDropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="../"
                className="rounded-circle"
                alt="User Avatar"
                width="40"
                height="40"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
              <li>
                <a className="dropdown-item" href="#">Profile</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Dashboard</a>
              </li>
              <li>
                <a className="dropdown-item" href="#">Log Out</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}
