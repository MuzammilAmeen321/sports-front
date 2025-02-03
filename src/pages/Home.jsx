import React from 'react';
import Header from '../components/header';

import Slider from '../components/slider';
import GamesNewsPage from '../components/ShoppingCards';
import Tabs from '../components/MatchsTab';
import '../style/main.css';
const Home = () => {
    
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
        <Header />
        </div>
        
     
    
     <div className="container home-page">
     <Slider />
     <GamesNewsPage />
     <Tabs />
     </div>
     
      
     
     
      </div>
      
    </div>
  );
};

export default Home;