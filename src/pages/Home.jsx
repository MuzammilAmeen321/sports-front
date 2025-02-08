import React from 'react';

import MatchSlider from '../components/Header/headerSlider';
import GamesNewsPage from '../components/ShoppingCards';
import ModernTabs from '../components/MatchTabs/MatchsTab';
import '../style/main.css';
const Home = () => {
    
  return (
    <>
    <div className="container-fluid">
      <div className="row">
     <div className="container home-page">
    <div className="row">
      <div className="col-md-9">
      <MatchSlider />
     <div className="row mt-5">
     <ModernTabs page="home" /> 
      </div>
    </div>
    <div className="col-md-3">
    <aside id="sidebar" className="left-bar container mt-4">
            <div className="feature-matchs">
              <table className="table match-table">
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
                          src={`images/img-0${index}_002.png`}
                          alt="Portugal"
                          className="team-icon"
                        />
                        <div>Portugal</div>
                      </td>
                      <td className="vs-cell">VS</td>
                      <td>
                        <img
                          src={`images/img-0${index + 1}.png`}
                          alt="Germany"
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
      
    </div>
     
    </>
    

  );
};

export default Home;