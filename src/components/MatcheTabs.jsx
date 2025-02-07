import { useState } from "react";

const Header = () => {
  const [selectedCategory, setSelectedCategory] = useState({
    name: "Select Category",
    icon: "fa-bars",
  });
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [cities, setCities] = useState([]);
  const [selectedProvince, setSelectedProvince] = useState("");

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

  const toggleSearch = () => {
    setSearchExpanded(!searchExpanded);
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

  return (
    <header className="header d-flex justify-content-center  align-items-center p-3">
      {/* Left Side - Search Box */}
      <div className="d-flex align-items-center">
        <div className={`search-box d-flex align-items-center me-3 ${searchExpanded ? "expanded" : ""}`}>
          <input
            type="search"
            className="form-control"
            placeholder="Search..."
            style={{ display: searchExpanded ? "block" : "none" }}
          />
          <button className="btn btn-outline-dark bg-light mx-1" onClick={toggleSearch}>
            <i className="fas fa-search"></i>
          </button>
        </div>

        {/* Category Selector */}
        <div className="dropdown">
          <button className="btn btn-light" type="button" data-bs-toggle="dropdown">
            <i className={`fas ${selectedCategory.icon} `}></i>
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
      </div>

      {/* Right Side - Location Button */}
      <button id="cust_btn" className="btn btn-light  ms-3" data-bs-toggle="modal" data-bs-target="#locationModal">
        <i className="fas fa-map-marker-alt p-1"></i>
      </button>

      {/* Location Modal */}
      <div id="locationModal" className="modal fade" tabIndex="-1">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">
                <i className="fas fa-map-marker-alt me-2"></i> Select Your Location
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label className="form-label">Enter Your Location</label>
                <div className="input-group">
                  <input type="text" className="form-control" placeholder="Enter Your Location" />
                  <span className="input-group-text" onClick={getCurrentLocation} style={{ cursor: "pointer" }}>
                    <i className="fas fa-location-crosshairs"></i>
                  </span>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Select Province</label>
                <select className="form-select" onChange={handleProvinceChange}>
                  <option value="" disabled selected>
                    Choose a province
                  </option>
                  {Object.keys(provinceCities).map((province) => (
                    <option key={province} value={province}>
                      {province}
                    </option>
                  ))}
                </select>
              </div>

              {selectedProvince && (
                <div className="mb-3">
                  <label className="form-label">Select City</label>
                  <select className="form-select">
                    <option value="" disabled selected>
                      Choose a city
                    </option>
                    {cities.map((city) => (
                      <option key={city} value={city}>
                        {city}
                      </option>
                    ))}
                  </select>
                </div>
              )}

              <div className="mt-3 p-3 text-center text-muted bg-light" style={{ borderRadius: "5px" }}>
                <p>Map will be displayed here.</p>
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary">Save Location</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
