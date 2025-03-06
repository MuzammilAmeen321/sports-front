import React from 'react';
import homeicon from '../assets/icons/home.png';
import cricket2 from '../assets/icons/cricket2.png';
import shopping2 from '../assets/icons/trolley.png';
import contact from '../assets/icons/contact-us.png';
import team from '../assets/icons/people.png';
import './verticleNav.css';

const VerticalNav = () => {
  return (
    <nav className="vertical-nav">
      <a href="/" className="nav-item">
        <img src={homeicon} alt="Home" className="nav-icon" />
        <span className="nav-text">Home</span>
      </a>
      <a href="/matches" className="nav-item">
        <img src={cricket2} alt="Matches" className="nav-icon" />
        <span className="nav-text">Matches</span>
      </a>
      <a href="#shop" className="nav-item">
        <img src={shopping2} alt="Shopping" className="nav-icon" />
        <span className="nav-text">Shopping</span>
      </a>
      <a href="/contact-us" className="nav-item">
        <img src={contact} alt="Contact" className="nav-icon" />
        <span className="nav-text">Contact</span>
      </a>
      <a href="/my-teams" className="nav-item">
        <img src={team} alt="Team" className="nav-icon" />
        <span className="nav-text">Team</span>
      </a>
    </nav>
  );
};

export default VerticalNav;