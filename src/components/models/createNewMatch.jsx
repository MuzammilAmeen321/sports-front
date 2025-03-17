import React, { useState } from 'react';
import axios from 'axios';

const CreateMatchModal = () => {
  const [selectedCategory, setSelectedCategory] = useState({});
  const [security, setSecurity] = useState('no');
  const [securityAmount, setSecurityAmount] = useState(''); // State for custom security amount
  const [matchBid, setMatchBid] = useState('no');
  const [matchDatetime, setMatchDatetime] = useState('');
  const [ballType, setBallType] = useState('tape');
  const [venue, setVenue] = useState('');
  const [overs, setOvers] = useState('');
  const [city, setCity] = useState('');
  const [province, setProvince] = useState('');
  const [joinCode, setJoinCode] = useState(''); // State for join code
  const [toast, setToast] = useState({ show: false, message: '', type: '' }); // Toast state
  const API_URL = "https://matc.matchdada.com/public/api"; // Correct API URL

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

  // Define citiesByProvince
  const citiesByProvince = {
    Punjab: ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan', 'Gujranwala'],
    Sindh: ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana'],
    'Khyber Pakhtunkhwa': ['Peshawar', 'Abbottabad', 'Mardan', 'Swat'],
    Balochistan: ['Quetta', 'Gwadar', 'Khuzdar', 'Turbat'],
    Islamabad: ['Islamabad'],
    'Gilgit-Baltistan': ['Gilgit', 'Skardu'],
    'Azad Jammu & Kashmir': ['Muzaffarabad', 'Mirpur', 'Rawalakot'],
  };

  const handleCategorySelect = (category) => setSelectedCategory(category);

  // Function to generate a random join code
  const generateJoinCode = () => {
    const code = Math.random().toString(36).substr(2, 8).toUpperCase();
    setJoinCode(code);
  };

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
      security_amount: security === 'yes' ? securityAmount : null, // Include custom security amount
      match_bid: matchBid,
      match_datetime: matchDatetime,
      ball_type: ballType,
      venue,
      overs,
      join_code: joinCode, // Include join code in the match data
      city,
      province,
    };

    console.log(matchData);

    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No auth token found.");
      setToast({ show: true, message: "No authentication token found. Please log in.", type: "error" });
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/matches`, // Ensure this URL is correct
        matchData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token in headers
            "Content-Type": "application/json",
          },
        }
      );
      console.log("Match created:", response.data);
      setToast({ show: true, message: "Match created successfully!", type: "success" });
    } catch (error) {
      if (error.response && error.response.status === 409) {
        setToast({ show: true, message: "Join code already exists. Please generate a new code.", type: "error" });
        generateJoinCode(); // Generate a new code automatically
      } else {
        console.error("Error creating match:", error);
        setToast({ show: true, message: "An error occurred. Please try again.", type: "error" });
      }
    }
  };

  return (
    <>
      {/* Toast Notification */}
      <div
        className={`toast position-fixed top-0 end-0 m-3 ${toast.show ? "show" : "hide"}`}
        style={{ zIndex: 1050 }}
      >
        <div className={`toast-header bg-${toast.type} text-white`}>
          <strong className="me-auto">
            {toast.type === "success" ? "Success" : "Error"}
          </strong>
          <button
            type="button"
            className="btn-close"
            onClick={() => setToast({ show: false, message: "", type: "" })}
          ></button>
        </div>
        <div className="toast-body">{toast.message}</div>
      </div>

      {/* Create Match Modal */}
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
                  <label className="form-label">Security Amount</label>
                  <input
                    type="number"
                    className="form-control"
                    value={securityAmount}
                    onChange={(e) => setSecurityAmount(e.target.value)}
                    placeholder="Enter security amount"
                    min="0" // Ensure the amount is not negative
                  />
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
                <select className="form-select" value={province} onChange={(e) => {
                  setProvince(e.target.value);
                  setCity(''); // Reset city when province changes
                }}>
                  <option value="">Select Province</option>
                  {provinces.map((prov) => <option key={prov} value={prov}>{prov}</option>)}
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">City</label>
                <select className="form-select" value={city} onChange={(e) => setCity(e.target.value)} disabled={!province}>
                  <option value="">Select City</option>
                  {province && citiesByProvince[province]?.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>

              {/* Join Code Input */}
              <div className="mb-3">
                <label className="form-label">Join Code</label>
                <div className="input-group">
                  <input
                    type="text"
                    className="form-control"
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Enter or generate a join code"
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={generateJoinCode}
                  >
                    Generate Code
                  </button>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-success" onClick={handleSubmit}>Create Match</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreateMatchModal;