import React, { useState } from 'react';
import Navbar from '../components/Header/header';
import AllMatches from './Matches';
import '../style/main.css';
import FilterButtonWithModal from '../components/models/FilterModel';

const Home = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    // Yahan tum search ka logic add kar sakte ho, ya kisi state ko update kar sakte ho
    console.log('Search:', e.target.value);
  };

  const handleFilter = () => {
    // Yahan filter button ka logic likho ya modal open kara lo
    console.log('Filter button clicked');
  };

  return (
    <>
      <div className="container-fluid">
        <Navbar />

        {/* 🔍 Search + Filter (Just below Navbar) */}
        <div className="container w-100 my-3 d-flex justify-content-center">

          <div className="d-flex justify-content-center w-100 gap-2">
            <input
              type="text"
              className="form-control w-25"
              placeholder="Search..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button className="btn btn-warning" onClick={handleFilter}>
              Filter
            </button>
          </div>
        </div>

      

        <AllMatches home="home" searchTerm={searchTerm} />
      </div>

      <FilterButtonWithModal />
    </>
  );
};

export default Home;