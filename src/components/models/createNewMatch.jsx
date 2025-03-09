import React, { useState } from 'react';
import axios from 'axios';

const CreateMatchModal = () => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [security, setSecurity] = useState('no');
  const [securityAmount, setSecurityAmount] = useState('');
  const [matchBid, setMatchBid] = useState('no');
  const [matchDatetime, setMatchDatetime] = useState('');
  const [ballType, setBallType] = useState('tape');
  const [venue, setVenue] = useState('');
  const [overs, setOvers] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  // Retrieve user ID from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user ? user.id : null; // Get user ID safely

  const categories = [
    { name: 'Football', icon: 'fa-futbol' },
    { name: 'Cricket', icon: 'fa-basketball-ball' },
    { name: 'Tennis', icon: 'fa-volleyball-ball' },
  ];

  const provinces = [
    'Punjab', 'Sindh', 'Khyber Pakhtunkhwa', 'Balochistan', 'Islamabad', 'Gilgit-Baltistan', 'Azad Jammu & Kashmir'
  ];

  const handleCategorySelect = (category) => setSelectedCategory(category);
  
  const generateCode = () => setGeneratedCode(Math.random().toString(36).substr(2, 8).toUpperCase());

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!userId) {
      alert("User not found. Please log in.");
      return;
    }

    const matchData = {
      user_id: userId,
      category: selectedCategory.name || '',
      security,
      security_amount: security === 'yes' ? securityAmount : null,
      match_bid: matchBid,
      match_datetime: matchDatetime,
      ball_type: ballType,
      venue,
      overs,
      join_code: generatedCode,
      city,
      province,
    };

    const token = localStorage.getItem("authToken");
if (!token) {
  console.error("No auth token found.");
  return;
}

try {
  const response = await axios.post(
    "http://localhost:8000/api/matches", // Ensure this URL is correct
    matchData,
    {
      headers: {
        Authorization: `Bearer ${token}`, // Include token in headers
        "Content-Type": "application/json",
      },
    }
  );
  console.log("Match created:", response.data);
} catch (error) {
  console.error("Error creating match:", error);
}

  };
  
  return (
    <div id="createMatchModal" className="modal fade" tabIndex="-1">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Create New Match</h5>
            <button type="button" className="btn-close text-danger" data-bs-dismiss="modal" aria-label="Close">
              <i className="fas fa-times"></i>
            </button>
          </div>
          
          <div className="modal-body">
            <div className="d-flex justify-content-between mb-3">
              <div>
                <label className="form-label">Category</label>
                <div className="dropdown">
                  <button className="btn btn-light" type="button" data-bs-toggle="dropdown" style={{ width: "180px" }}>
                    {selectedCategory.name ? (
                      <><i className={`fas ${selectedCategory.icon} me-3`}></i>{selectedCategory.name}</>
                    ) : "Select Category"}
                  </button>
                  <ul className="dropdown-menu shadow">
                    {categories.map((category) => (
                      <li key={category.name}>
                        <a className="dropdown-item" href="#" onClick={() => handleCategorySelect(category)}>
                          <i className={`fas ${category.icon} me-2`}></i> {category.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <label className="form-label">Security</label>
                <select className="form-select me-4" onChange={(e) => setSecurity(e.target.value)} style={{ width: "100px" }}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                </select>
              </div>

              <div>
                <label className="form-label">Match Bid</label>
                <select className="form-select" onChange={(e) => setMatchBid(e.target.value)} style={{ width: "100px" }}>
                  <option value="no">No</option>
                  <option value="yes">Yes</option>
                  <option value="100">100</option>
                  <option value="200">200</option>
                </select>
              </div>
            </div>

            {security === "yes" && (
              <div className="mb-3">
                <label className="form-label">Select Security Amount</label>
                <select className="form-select" onChange={(e) => setSecurityAmount(e.target.value)} style={{ width: "465px" }}>
                  <option value="100">100</option>
                  <option value="200">200</option>
                  <option value="500">500</option>
                </select>
              </div>
            )}

            <div className="mb-3">
              <label className="form-label">Match Date & Time</label>
              <input type="datetime-local" className="form-control" onChange={(e) => setMatchDatetime(e.target.value)} />
            </div>

            <div className="mb-3">
              <label className="form-label">Ball Type</label>
              <select className="form-select" onChange={(e) => setBallType(e.target.value)} style={{ width: "465px" }}>
                <option value="tape">Tape Ball</option>
                <option value="hard">Hard Ball</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Venue</label>
              <input type="text" className="form-control" onChange={(e) => setVenue(e.target.value)} placeholder="Enter venue" />
            </div>

            <div className="mb-3">
              <label className="form-label">Overs</label>
              <input type="number" className="form-control" min={1} onChange={(e) => setOvers(e.target.value)} placeholder="Enter number of overs" />
            </div>

            <div className="mb-3">
              <label className="form-label">Province (Pakistan)</label>
              <select className="form-select" value={province} onChange={(e) => setProvince(e.target.value)}>
                <option value="">Select Province</option>
                {provinces.map((prov) => <option key={prov} value={prov}>{prov}</option>)}
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-success" onClick={handleSubmit}>Create Match</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMatchModal;
