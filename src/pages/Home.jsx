import React from 'react';
import Navbar from '../components/Header/header';
import VerticleNav from '../components/verticleNav';
import MatchSlider from '../components/Header/headerSlider';
import ModernTabs from '../components/MatchTabs/MatchsTab';
import SlideShow from '../components/match-series-slider/SeriesSlider';
import '../style/main.css';
const Home = () => {
    
  return (
    <>
    <div className="container-fluid ">
      <Navbar />
      <div className="row">
     <div className="container home-page">
    <div className="row">
      <div className="col-md-9">
      <MatchSlider />
      <h2>Top Match Leagues</h2>
      <SlideShow />
     <div className="row mt-5">
     <ModernTabs page="home" /> 
      </div>
    </div>
    <div className="col-md-3">
    <aside id="sidebar" className="left-bar container mt-4 ">
            <div className="feature-matchs ">
              <table className="table match-table " >
                <thead>
                  <tr>
                    <th>Team 1</th>
                    <th>VS</th>
                    <th>Team 2</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3, 4, 5].map((index) => (
                    <tr key={index}>
                      <td>
                        <img
                          src={`https://thecricketcauldron.com/wp-content/uploads/2018/02/germany-cricket.jpg`}
                          alt=" Germany"
                          className="team-icon"
                        />
                        <div>Portugal</div>
                      </td>
                      <td className="vs-cell">VS</td>
                      <td>
                        <img
                          src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxDaYimUSiC0acoUU7IDnw1LCQ0BS0oO0w5A&s`}
                          alt="Portugal"
                          className="team-icon"
                        />
                        <div>Germany</div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </aside>
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