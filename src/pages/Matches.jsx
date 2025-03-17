import { useState } from "react";
import VerticleNav from "../components/verticleNav";
import Navbar from "../components/Header/header";
import axios from "axios";
import "../style/matches.css"
import LocationModal from "../components/models/LocationModel";
import CreateMatchModal from "../components/models/createNewMatch";

const AllMatches = () => {
  const [security, setSecurity] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Select Category",
    icon: "fa-bars",
  });
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");
  const [matchType, setMatchType] = useState("all");
  
  const provinceCities = {
    Sindh: ["Karachi", "Hyderabad", "Sukkur"],
    Punjab: ["Lahore", "Rawalpindi", "Faisalabad"],
    "Khyber Pakhtunkhwa": ["Peshawar", "Abbottabad", "Mardan"],
    Balochistan: ["Quetta", "Gwadar", "Khuzdar"],
  };

  const handleProvinceChange = (event) => {
    const province = event.target.value;
    setSelectedProvince(province);
    setCities(provinceCities[province] || []);
  };
  const [generatedCode, setGeneratedCode] = useState("");

  const generateCode = () => {
      const randomDigits = Math.floor(1000 + Math.random() * 9000);
      const code = `TMT${randomDigits}`; // Prefix + Random 4-digit number
      setGeneratedCode(code);
  };

  const categories = [
    { name: "Football", icon: "fa-futbol" },
    { name: "Cricket", icon: "fa-baseball-ball" },
    { name: "Table-Tennis", icon: "fa-table-tennis" },
    { name: "Hockey", icon: "fa-hockey-puck" },
    { name: "Golf", icon: "fa-golf-ball" },
    { name: "Baseball", icon: "fa-baseball-ball" },
  ];

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          alert(`Lat: ${position.coords.latitude}, Lng: ${position.coords.longitude}`);
        },
        () => {
          alert("Unable to retrieve location");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  const matches = [
    { id: 1, sport: "Cricket", startDate: "07 Jun 2025", startTime: "05:00 PM", imageUrl: "https://seeklogo.com/images/P/pakistan-super-league-psl-logo-7CA605C19A-seeklogo.com.png", league: "PSL", bidAmount: 5000, security: true, status: "available" },
    { id: 2, sport: "Cricket", startDate: "10 Jun 2025", startTime: "07:00 PM", imageUrl: "https://seeklogo.com/images/P/pakistan-super-league-psl-logo-7CA605C19A-seeklogo.com.png", teams: "Pak vs Ind", league: "PSL", bidAmount: 5000, security: true, status: "booked" },
    { id: 3, sport: "Cricket", startDate: "15 Jun 2025", startTime: "06:30 PM", imageUrl: "https://seeklogo.com/images/P/pakistan-super-league-psl-logo-7CA605C19A-seeklogo.com.png", league: "IPL", bidAmount: 6000, security: false, status: "pending" },
    { id: 4, sport: "Cricket", startDate: "07 Jun 2025", startTime: "05:00 PM", imageUrl: "https://seeklogo.com/images/P/pakistan-super-league-psl-logo-7CA605C19A-seeklogo.com.png", teams: "Pak vs Ind", league: "PSL", bidAmount: 5000, security: true, status: "live" },
  ];

  const filteredMatches = matchType === "all" ? matches : matches.filter(match => match.status === matchType);

  return (
    <>
     <Navbar />
     
      <div className="container">
        <div className="row">
          <div className="col-10">
          <header className="header d-flex justify-content-center align-items-center p-4">
  {/* Left Side - Search Box */}
  <div className="d-flex align-items-center s-box">
  <div className="search-box d-flex w-100 flex-grow-1 align-items-center mx-1">
  <input
    type="search"
    className="form-control"
    placeholder="Search..."
    style={{ width: window.innerWidth < 768 ? "160px" : "200px" }}
  />
  
    <i className="fas fa-search"></i>
  
</div>


    {/* Category Selector */}
    <div className="d-flex all-button">
    <div className="dropdown">
      <button className="btn btn-light" type="button" data-bs-toggle="dropdown">
        <i className={`fas ${selectedCategory.icon}`}></i>
        {selectedCategory.name === "" ? selectedCategory.name : ""}
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
    
  {/* Right Side - Location Button, Match Type Selector, and Create Match Button */}
    <button id="cust_btn" className="btn btn-light ms-2" data-bs-toggle="modal" data-bs-target="#locationModal">
      <i className="fas fa-map-marker-alt p-1"></i>
    </button>

    {/* Create New Match Button */}
    <button className="btn   min-w-[140px] mx-2"  data-bs-toggle="modal" data-bs-target="#createMatchModal">
   Matches </button>
   
   <select
     className="form-select ms-2"
     style={{ width: "auto" }}
     value={matchType}
     onChange={(e) => setMatchType(e.target.value)}
   >
     <option value="all">All Matches</option>
     <option value="available">Available</option>
     <option value="booked">Booked</option>
     <option value="pending">Pending</option>
   </select>
   </div>
  
 </div>
 
 {/* Location Model */}
  < LocationModal />
  {/* Create new match Model */}
<CreateMatchModal />




</header>


            <div className="container">
              <div className="row">
                <div className="col-12">
                  <div className="row p-2">
                    {filteredMatches.map((match) => (
                      <div key={match.id} className={`col-lg-4 col-md-6 col-12 mb-3`} data-status={match.status}>
                        <div className="card bg-white text-black p-2 text-center shadow-sm">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-baseball-bat-ball fa-1x text-warning me-1"></i>
                              <p className="mb-0 fw-bold">{match.sport}</p>
                            </div>
                            <p className="text-muted small mb-0">Starts: {match.startDate} - {match.startTime}</p>
                          </div>

                          <div className="row align-items-center">
                            <div className="col-4 text-center">
                              <img src={match.imageUrl} alt="League Logo" className="img-fluid" style={{ maxWidth: "70px" }} />
                            </div>
                            <div className="col-4 text-center">
                              <p className="fw-bold mb-1">{match.teams}</p>
                              <span className={`badge ${
                                match.status === "available" ? "bg-success text-black" :
                                match.status === "booked" ? "bg-danger text-black" :
                                match.status === "live" ? "bg-danger text-black" :
                                "bg-warning text-black"}`}>
                                {match.status === "available" ? "Available" :
                                match.status === "booked" ? "Booked" :
                                match.status === "live" ? "Live" :
                                "Pending"}
                              </span>
                            </div>
                            <div className="col-4 text-center">
                              <p className="mb-0 text-danger fw-bold">Bid <br /><span className="text-black">${match.bidAmount}</span></p>
                            </div>
                          </div>

                          {match.status === "available" && (
                            <div className="card-footer bg-light mt-1">
                              <button className="btn btn-request " onClick={() => alert("Request Sent!")}>Request</button>
                            </div>
                          )}

                          {match.status === "live" && (
                            <div className="mt-2 text-end">
                              
                                <a href="/scoreboard" className="  btn   text-decoration-none">Score</a>
                              
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <VerticleNav />
      </div>
    </>
  );
};

export default AllMatches;