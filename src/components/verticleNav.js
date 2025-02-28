import React, { useState } from 'react';

const VerticleNav = () => {

  return (
      <nav className="vertical-nav">
        <a href="/" className='d-flex flex-column justify-content-center'>
          <i className="fas fa-home nav_icon"></i>
          Home
        </a>
        <a href="/matches" className='d-flex flex-column justify-content-center'>
          <i className="">🏏</i>
          Matches
        </a>
        <a href="#shop" className='d-flex flex-column justify-content-center'>
          <i className="fas fa-shopping-cart nav_icon"></i>
          Shopping
        </a>
        <a href="#contact" className='d-flex flex-column justify-content-center'>
          <i className="fas fa-envelope nav_icon"></i>
          Contact
        </a>
        <a href="/my-teams" className='d-flex flex-column justify-content-center'>
        <i className="fas fa-users nav_icon"></i>

          Team
        </a>
      </nav>

  );
};

export default VerticleNav;
