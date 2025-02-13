
import React, { useState, useEffect } from 'react';
import AuthContainer from './Auth/AuthContainer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Profiles from './pages/MyTeam';
import ProfileUpdateModal from './components/Edit_profile';
import MatchesManagement from './pages/Matches';
function App() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');

  // Set the theme on body and store in localStorage
  useEffect(() => {
    document.body.className = theme === 'light' ? 'light-theme' : 'dark-theme';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <Router>
      <div className="App">
        {/* Theme Toggle Button */}
        <button className="theme-toggle" onClick={toggleTheme}>
          <i className="fas fa-adjust"></i>
        </button>

        <Routes>
          {/* <Route path="/login" element={<AuthContainer />} /> */}
          <Route path="/" /* element={<ProtectedRoute><Home /></ProtectedRoute>}  */ element={<Home />}/>
          <Route path="/team" element={<Profiles />} />
          <Route path="/edit-profile" element={<ProfileUpdateModal />} />
          <Route path="/matches" element={<MatchesManagement />} />
        </Routes>
        
      </div>
    </Router>
  );
}
/* const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");
  return token ? children : <Navigate to="/login" />;
}; */
export default App;
