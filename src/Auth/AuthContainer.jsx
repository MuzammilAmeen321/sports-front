import React, { useState } from 'react';
import Login from './Login';
import Signup from './Signup';
import '../style/Auth.css';
const AuthContainer = () => {
  const [isLoginFormVisible, setIsLoginFormVisible] = useState(true);

  const toggleForms = () => {
    setIsLoginFormVisible((prevState) => !prevState);
  };

  return (
   <div className="login-box d-flex justify-content-center align-items-center">
     <div className="auth-container">
      <h1 className="auth-title">GAME PORTAL</h1>
      {isLoginFormVisible ? (
        <Login toggleForms={toggleForms} />
      ) : (
        <Signup toggleForms={toggleForms} />
      )}
    </div>
   </div>
  );
};

export default AuthContainer;