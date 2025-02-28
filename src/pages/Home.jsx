import React from 'react';
import Navbar from '../components/Header/header';
import VerticleNav from '../components/verticleNav';
import MatchSlider from '../components/Header/headerSlider';
import SlideShow from '../components/match-series-slider/SeriesSlider';
import '../style/main.css';
const Home = () => {
    
  return (
    <>
    <div className="container-fluid">
    <Navbar />
        <div className="row">
            <div className="container home-page">
              <div className="row ">
                    <div className="col-md-10 m-auto py-5">
                        <MatchSlider />
                        <h2>Top Match Leagues</h2>
                        <SlideShow />
                  </div>
              </div>
            </div>
        </div>
        <VerticleNav />
    </div>
    
    </>
    

  );
};

export default Home;