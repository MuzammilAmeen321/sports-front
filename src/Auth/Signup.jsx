import React from 'react';

const Signup = ({ toggleForms }) => {
  return (
    <form id="signupForm" className="auth-form">
      <div className="input-group">
        <i className="fas fa-user"></i>
        <input type="text" placeholder="Username" required />
      </div>
      <div className="input-group">
        <i className="fas fa-envelope"></i>
        <input type="email" placeholder="Email" required />
      </div>
      <div className="input-group">
        <i className="fas fa-phone"></i>
        <input type="tel" placeholder="Phone" required />
      </div>
      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Password" required />
      </div>
      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Confirm Password" required />
      </div>
      <button type="submit" className="auth-button">SIGN UP</button>
      <button type="button" className="switch-form" onClick={toggleForms}>
        Already have an account?
      </button>
    </form>
  );
};

export default Signup;