import React from 'react';

import Slider from '../components/slider';
import GamesNewsPage from '../components/ShoppingCards';
import ModernTabs from '../components/MatchTabs/MatchsTab';
import '../style/main.css';
const Home = () => {
    
  return (
    <div className="container-fluid">
      <div className="row">
     <div className="container home-page">
     <Slider />
     <div className="row mt-5">
     <ModernTabs page="home" /> 
     </div>
     </div>
     
      
     
     
      </div>
      
    </div>
  );
};

export default Home;