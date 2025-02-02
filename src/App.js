import React, { useState, useEffect } from 'react';
import AuthContainer from './Auth/AuthContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Profiles from './pages/MyTeam';
function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : '';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
    <div className="App">
      <button className="theme-toggle" onClick={toggleTheme}>
      <i class="fas fa-adjust"></i>

      </button>
  
      <Routes>
        <Route path="/login" element={<AuthContainer />} />
        <Route path="/" element={<Home />} />
        <Route path="/team" element={<Profiles />} />
      </Routes>
    </div>
  </Router>
  );
}

export default App;