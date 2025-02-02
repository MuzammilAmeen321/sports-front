import React, { useState } from 'react';

const VerticleNav = () => {

  return (
      <nav className="vertical-nav">
        <a href="#home" className='d-flex flex-column justify-content-center'>
          <i className="fas fa-home"></i>
          Home
        </a>
        <a href="#matches" className='d-flex flex-column justify-content-center'>
          <i className="fas fa-futbol"></i>
          Matches
        </a>
        <a href="#shop" className='d-flex flex-column justify-content-center'>
          <i className="fas fa-shopping-cart"></i>
          Shopping
        </a>
        <a href="#contact" className='d-flex flex-column justify-content-center'>
          <i className="fas fa-envelope"></i>
          Contact
        </a>
        <a href="/team" className='d-flex flex-column justify-content-center'>
        <i class="fas fa-users"></i>

          Team
        </a>
      </nav>

  );
};

export default VerticleNav;
