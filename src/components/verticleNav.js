import React, { useState } from 'react';

const VerticleNav = () => {

  return (
      <nav className="vertical-nav">
        <a href="#home">
          <i className="fas fa-home"></i>
        </a>
        <a href="#matches">
          <i className="fas fa-futbol"></i>
        </a>
        <a href="#shop">
          <i className="fas fa-shopping-cart"></i>
        </a>
        <a href="#contact">
          <i className="fas fa-envelope"></i>
        </a>
      </nav>

  );
};

export default VerticleNav;
