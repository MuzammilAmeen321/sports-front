import React from 'react';
import TopNavbar from '../components/TopNavBar';
import VerticalNavbar from '../components/verticleNav';
import Slider from '../components/slider';
import '../style/main.css';
const Home = () => {
    
  return (
    <div className="home-page container-fluid">
      <TopNavbar />
        <Slider />
      <VerticalNavbar />
    </div>
  );
};

export default Home;