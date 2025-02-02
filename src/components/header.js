import React from "react";

const TopNavbar = () => {
  return (
    <nav className="navbar navbar-expand-lg ">
      <div className="container-fluid">
        <a className="navbar-brand text-primary" href="#">
         Game Portal
        </a>
        <div className="" id="navbarNav">
          
          <div className="d-flex align-items-center justify-content-center">
          <a href="#" className="nav-link mx-2">
            <i className="fas fa-sign-out-alt"></i>
            </a>
            <a href="#" className="nav-link avatar">
            <img src="https://i2.cdn.turner.com/cnnnext/dam/assets/140926165711-john-sutter-profile-image-large-169.jpg" alt="" class="image--cover" />
            </a>
           
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;