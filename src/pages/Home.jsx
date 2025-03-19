import React from 'react';
import Navbar from '../components/Header/header';
import AllMatches from './Matches';
import '../style/main.css';
import FilterButtonWithModal from '../components/models/FilterModel';
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
    <FilterButtonWithModal />
    </>
    

  );
};

export default Home;