import React from 'react';
import Navbar from '../components/Header/header';
import VerticleNav from '../components/verticleNav';
import MatchSlider from '../components/Header/headerSlider';
import SlideShow from '../components/match-series-slider/SeriesSlider';
import AllMatches from './Matches';
import '../style/main.css';
import CricketScoreboard from '../components/scoreboard/CricketScoreboard';
import Scoreboard from '../components/scoreboard/Scoreboard';
const Home = () => {
    
  return (
    <>
    <div className="container-fluid">
    <Navbar />
       
            <div className="container home-page">
              <div className="row ">
                    {/* <div className="col-md-10 m-auto py-5">
                        <MatchSlider />
                        <h2>Top Match Leagues</h2>
                        <SlideShow />

                       
                  </div> */}
              </div>
            </div>
       
            <AllMatches home="home" />
      
    </div>
    
    </>
    

  );
};

export default Home;