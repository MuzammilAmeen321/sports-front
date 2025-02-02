import React from 'react';

const Login = ({ toggleForms }) => {
  return (
    <form id="loginForm" className="auth-form">
      <div className="input-group">
        <i className="fas fa-user"></i>
        <input type="text" placeholder="Username" required />
      </div>
      <div className="input-group">
        <i className="fas fa-lock"></i>
        <input type="password" placeholder="Password" required />
      </div>
      <button type="submit" className="auth-button">LOGIN</button>

      <div className="social-auth">
        <button type="button" className="social-button facebook">
          Login with <i className="fab fa-facebook-f"></i>acebook
        </button>
        <button type="button" className="social-button google">
          Login with <i className="fab fa-google"></i>oogle
        </button>
      </div>

      <button type="button" className="switch-form" onClick={toggleForms}>
        Create Account
      </button>
    </form>
  );
};

export default Login;