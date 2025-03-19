import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFilter, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Modal, Button, Tabs, Tab, Form, ListGroup } from 'react-bootstrap';

const FilterButtonWithModal = () => {
    const [showModal, setShowModal] = useState(false);
    const [activeTab, setActiveTab] = useState('city'); // Default active tab
    const [searchQuery, setSearchQuery] = useState(''); // Search query for provinces
    const [selectedProvince, setSelectedProvince] = useState(null); // Selected province
    const [cities, setCities] = useState([]); // Cities for the selected province
    const [selectedCity, setSelectedCity] = useState(null); // Selected city for filtering
    const [selectedStatus, setSelectedStatus] = useState('All Matches'); // Selected status for filtering
    const [selectedCategories, setSelectedCategories] = useState([]); // Selected categories for filtering
    const [selectedBallType, setSelectedBallType] = useState(null); // Selected ball type for Cricket

    // Sample data for provinces and cities in Pakistan
    const provincesData = {
        'Punjab': ['Lahore', 'Faisalabad', 'Rawalpindi', 'Multan'],
        'Sindh': ['Karachi', 'Hyderabad', 'Sukkur', 'Larkana'],
        'Khyber Pakhtunkhwa': ['Peshawar', 'Abbottabad', 'Mardan', 'Swat'],
        'Balochistan': ['Quetta', 'Gwadar', 'Turbat', 'Khuzdar'],
        'Gilgit-Baltistan': ['Gilgit', 'Skardu', 'Hunza', 'Nagar'],
        'Azad Kashmir': ['Muzaffarabad', 'Mirpur', 'Rawalakot', 'Kotli'],
    };

    // Sample data for categories
    const categoriesData = [
        'Cricket',
        'Football',
        'Kabaddi',
        'Badminton',
        'Tennis',
        'Hockey',
        'Basketball',
        'Volleyball',
    ];

    // Handle modal open/close
    const handleShowModal = () => setShowModal(true);
    const handleCloseModal = () => {
        setShowModal(false);
        setSelectedProvince(null); // Reset selected province
        setCities([]); // Reset cities
        setSearchQuery(''); // Reset search query
        setSelectedCity(null); // Reset selected city
        setSelectedStatus('All Matches'); // Reset selected status
        setSelectedCategories([]); // Reset selected categories
        setSelectedBallType(null); // Reset selected ball type
    };

    // Handle province selection
    const handleProvinceSelect = (province) => {
        setSelectedProvince(province);
        setCities(provincesData[province]); // Set cities for the selected province
    };

    // Handle back button click
    const handleBackToProvinces = () => {
        setSelectedProvince(null); // Go back to provinces
        setCities([]); // Reset cities
        setSelectedCity(null); // Reset selected city
    };

    // Handle city selection
    const handleCitySelect = (city) => {
        setSelectedCity(city); // Set the selected city
    };

    // Handle status selection
    const handleStatusSelect = (status) => {
        setSelectedStatus(status); // Set the selected status
    };

    // Handle category selection
    const handleCategorySelect = (category) => {
        if (selectedCategories.includes(category)) {
            // If category is already selected, remove it
            setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
        } else {
            // If category is not selected, add it
            setSelectedCategories([...selectedCategories, category]);
        }
    };

    // Handle ball type selection
    const handleBallTypeSelect = (ballType) => {
        setSelectedBallType(ballType); // Set the selected ball type
    };

    // Filter provinces based on search query
    const filteredProvinces = Object.keys(provincesData).filter((province) =>
        province.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div>
            {/* Circular Div with Filter Icon */}
            <div
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    cursor: 'pointer',
                    backgroundColor: '#0d6efd',
                    color: 'white',
                    borderRadius: '50%',
                    width: '60px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                }}
                onClick={handleShowModal}
            >
                <FontAwesomeIcon icon={faFilter} size="2x" />
            </div>

            {/* Bootstrap Modal */}
            <Modal show={showModal} onHide={handleCloseModal} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Filter Options</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* Tabs for City, Categories, Status, and Ball Type (if Cricket is selected) */}
                    <Tabs
                        activeKey={activeTab}
                        onSelect={(key) => setActiveTab(key)}
                        className="mb-3"
                    >
                        <Tab eventKey="city" title="City">
                            {/* Back Arrow (Visible only when a province is selected) */}
                            {selectedProvince && (
                                <Button
                                    variant="link"
                                    onClick={handleBackToProvinces}
                                    className="p-0 mb-3"
                                >
                                    <FontAwesomeIcon icon={faArrowLeft} /> Back to Provinces
                                </Button>
                            )}

                            {/* Search Bar for Provinces (Visible only when no province is selected) */}
                            {!selectedProvince && (
                                <Form.Control
                                    type="text"
                                    placeholder="Search for a province..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="mb-3"
                                />
                            )}

                            {/* Display Provinces (Visible only when no province is selected) */}
                            {!selectedProvince && (
                                <ListGroup>
                                    {filteredProvinces.map((province) => (
                                        <ListGroup.Item
                                            key={province}
                                            action
                                            onClick={() => handleProvinceSelect(province)}
                                        >
                                            {province}
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}

                            {/* Display Cities for Selected Province */}
                            {selectedProvince && (
                                <div>
                                    <h6>Cities in {selectedProvince}:</h6>
                                    <ListGroup>
                                        {/* "All Cities" Option */}
                                        <ListGroup.Item>
                                            <Form.Check
                                                type="radio"
                                                id="all-cities"
                                                label="All Cities"
                                                name="city"
                                                checked={selectedCity === 'All Cities'}
                                                onChange={() => handleCitySelect('All Cities')}
                                            />
                                        </ListGroup.Item>

                                        {/* List of Cities */}
                                        {cities.map((city) => (
                                            <ListGroup.Item key={city}>
                                                <Form.Check
                                                    type="radio"
                                                    id={city}
                                                    label={city}
                                                    name="city"
                                                    checked={selectedCity === city}
                                                    onChange={() => handleCitySelect(city)}
                                                />
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </div>
                            )}
                        </Tab>

                        <Tab eventKey="categories" title="Categories">
                            <h6>Select Categories:</h6>
                            <ListGroup>
                                {categoriesData.map((category) => (
                                    <ListGroup.Item key={category}>
                                        <Form.Check
                                            type="checkbox"
                                            id={category}
                                            label={category}
                                            checked={selectedCategories.includes(category)}
                                            onChange={() => handleCategorySelect(category)}
                                        />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab>

                        <Tab eventKey="status" title="Status">
                            <h6>Select Status:</h6>
                            <ListGroup>
                                {['All Matches', 'Available', 'Pending', 'Booked'].map((status) => (
                                    <ListGroup.Item key={status}>
                                        <Form.Check
                                            type="radio"
                                            id={status}
                                            label={status}
                                            name="status"
                                            checked={selectedStatus === status}
                                            onChange={() => handleStatusSelect(status)}
                                        />
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        </Tab>

                        {/* Ball Type Tab (Visible only if Cricket is selected) */}
                        {selectedCategories.includes('Cricket') && (
                            <Tab eventKey="ballType" title="Ball Type">
                                <h6>Select Ball Type:</h6>
                                <ListGroup>
                                    {['Tap Ball', 'Hard Ball'].map((ballType) => (
                                        <ListGroup.Item key={ballType}>
                                            <Form.Check
                                                type="radio"
                                                id={ballType}
                                                label={ballType}
                                                name="ballType"
                                                checked={selectedBallType === ballType}
                                                onChange={() => handleBallTypeSelect(ballType)}
                                            />
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            </Tab>
                        )}
                    </Tabs>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleCloseModal}>
                        Apply Filters
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
};

export default FilterButtonWithModal;