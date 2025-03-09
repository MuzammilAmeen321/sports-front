import React, { useState } from 'react';

const LocationModal = () => {
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [cities, setCities] = useState([]);

  // Sample data for provinces and cities
  const provinceCities = {
    Punjab: ['Lahore', 'Faisalabad', 'Rawalpindi'],
    Sindh: ['Karachi', 'Hyderabad', 'Sukkur'],
    KPK: ['Peshawar', 'Abbottabad', 'Mardan'],
    Balochistan: ['Quetta', 'Gwadar', 'Khuzdar'],
  };

  // Handle province selection
  const handleProvinceChange = (e) => {
    const province = e.target.value;
    setSelectedProvince(province);
    setCities(provinceCities[province] || []);
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          alert(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        (error) => {
          alert('Unable to retrieve your location.');
        }
      );
    } else {
      alert('Geolocation is not supported by your browser.');
    }
  };

  return (
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
            {/* Location Input */}
            <div className="mb-3">
              <label className="form-label">Enter Your Location</label>
              <div className="input-group">
                <input type="text" className="form-control" placeholder="Enter Your Location" />
                <span className="input-group-text" onClick={getCurrentLocation} style={{ cursor: "pointer" }}>
                  <i className="fas fa-location-crosshairs"></i>
                </span>
              </div>
            </div>

            {/* Province Selector */}
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

            {/* City Selector (Conditional Rendering) */}
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

            {/* Map Placeholder */}
            <div className="mt-3 p-3 text-center text-muted bg-light" style={{ borderRadius: "5px" }}>
              <p>Map will be displayed here.</p>
            </div>
          </div>

          {/* Modal Footer */}
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
              Close
            </button>
            <button type="button" className="btn btn-primary">Save Location</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationModal;