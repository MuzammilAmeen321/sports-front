import React, { useState } from 'react';
import '../style/matchTabs.css';
const Tabs = () => {
  const [activeTab, setActiveTab] = useState('tab1');

  const handleTabChange = (event) => {
    setActiveTab(event.target.id);
  };

  return (
    <div className="container-fluid p-0 m-3">
     <h2><strong>All Matches bets</strong></h2>
          <div className="tabs-block">
            <div className="tabs">
              <input
                type="radio"
                name="tabs"
                id="tab1"
                checked={activeTab === 'tab1'}
                onChange={handleTabChange}
              />
              <label htmlFor="tab1">
                Available Matches
              </label>
              {activeTab === 'tab1' && (
                <div className="tab">
                  <h2>Fixed Matches</h2>
                  <p>
                    One of the most powerful, efficient, and open-source JavaScript frameworks is{' '}
                    <a href="https://angularjs.org/">Angular</a>. Google operates this framework and is
                    implemented to use for developing a Single Page Application (SPA). It extends the HTML
                    into the application and interprets the attributes to perform data binding.
                  </p>
                </div>
              )}

              <input
                type="radio"
                name="tabs"
                id="tab2"
                checked={activeTab === 'tab2'}
                onChange={handleTabChange}
              />
              <label htmlFor="tab2">
                Live Matchs
              </label>
              {activeTab === 'tab2' && (
                <div className="tab">
                  <h2>React</h2>
                  <p>
                    Created by Facebook, the <a href="https://reactjs.org/">React framework</a> has earned
                    popularity within a short period. It is used to develop and operate the dynamic User
                    Interface of the web pages with high incoming traffic. It makes the use of a virtual DOM,
                    and hence, the integration of the same with any application is more straightforward.
                  </p>
                </div>
              )}

              <input
                type="radio"
                name="tabs"
                id="tab3"
                checked={activeTab === 'tab3'}
                onChange={handleTabChange}
              />
              <label htmlFor="tab3">
                Upcomming Matches
              </label>
              {activeTab === 'tab3' && (
                <div className="tab">
                  <h2>Vue</h2>
                  <p>
                    Though developed in the year 2016, this <a href="https://vuejs.org/">JavaScript framework</a>{' '}
                    has already made its way into the market and has proven its worth by offering various features.
                    Its dual integration mode is one of the most attractive features for creating high-end SPA or
                    Single Page Application.It is a much reliable platform for developing cross-platform.
                  </p>
                </div>
              )}

            </div>
          </div>
        
    </div>
  );
};

export default Tabs;
