import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../Header/header";
import "./teamManagement.css";
import { Link } from "react-router-dom";


const AllTeams = () => {
    const [teams, setTeams] = useState([]);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [teamForm, setTeamForm] = useState({ name: "", address: "", city: "", pin: "", logo: null });
    const API_URL = "https://matc.matchdada.com/public/api"; // Correct API URL
    // Fetch teams from the API
    const fetchTeams = async () => {
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("No auth token found.");
                return;
            }
    
            const response = await axios.get(`${API_URL}/teams`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });
    
            // Log the response for debugging
            console.log("API Response:", response.data);
    
            // Check if the response contains a `teams` key or is the array directly
            const teamsData = Array.isArray(response.data) ? response.data : response.data.teams || [];
            setTeams(teamsData);
        } catch (error) {
            console.error("Error fetching teams:", error);
            if (error.response) {
                console.error("Server responded with:", error.response.data);
            } else if (error.request) {
                console.error("No response received:", error.request);
            } else {
                console.error("Error setting up the request:", error.message);
            }
            setTeams([]);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    // Initialize the modal
    useEffect(() => {
        const modalElement = document.getElementById("teamModal");
        if (modalElement) {
            new bootstrap.Modal(modalElement, { backdrop: true });
        }
    }, []);

    // Handle form input changes
    const handleChange = (e) => {
        setTeamForm({ ...teamForm, [e.target.name]: e.target.value });
    };

    // Handle file input changes
    const handleFileChange = (e) => {
        setTeamForm({ ...teamForm, logo: e.target.files[0] });
    };

    // Generate a random team code
    const generateTeamCode = () => {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const namePrefix = teamForm.name ? teamForm.name.substring(0, 3).toUpperCase() : "TMT";
        setTeamForm({ ...teamForm, pin: `${namePrefix}${randomDigits}` });
    };

    // Handle form submission (create or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", teamForm.name);
        formData.append("address", teamForm.address);
        formData.append("city", teamForm.city);
        formData.append("pin", teamForm.pin);
        if (teamForm.logo) {
            formData.append("logo", teamForm.logo);
        }
    
        try {
            const token = localStorage.getItem("authToken");
            const url = isEditMode
                ? `${API_URL}/teams/${selectedTeam.id}`
                : `${API_URL}/teams`;
    
            const method = isEditMode ? "post" : "post";
            await axios[method](url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });
    
            alert(`Team ${isEditMode ? "updated" : "added"} successfully!`);
            fetchTeams(); // Refresh the teams list
            resetForm();
            closeModal();
        } catch (error) {
            console.error("Error:", error);
            alert(`Failed to ${isEditMode ? "update" : "add"} team.`);
        }
    };
    // Handle team deletion
    const handleDelete = async (teamId) => {
        if (!window.confirm("Are you sure you want to delete this team?")) return;
        try {
            const token = localStorage.getItem("authToken");
            await axios.delete(`${API_URL}/teams/${teamId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setTeams(teams.filter(team => team.id !== teamId));
        } catch (error) {
            console.error("Error deleting team:", error);
            alert("Failed to delete team.");
        }
    };

    // Open modal for editing a team
    const openEditModal = (team) => {
        setSelectedTeam(team);
        setIsEditMode(true);
        setTeamForm({ ...team, logo: null });
        openModal();
    };

    // Open modal for creating a new team
    const openCreateModal = () => {
        setIsEditMode(false);
        setTeamForm({ name: "", address: "", city: "", pin: "", logo: null });
        openModal();
    };

    // Reset form fields
    const resetForm = () => {
        setTeamForm({ name: "", address: "", city: "", pin: "", logo: null });
    };

   // Open the modal
const openModal = () => {
    const modalElement = document.getElementById("teamModal");
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
        modal.show();
    }
};

// Close the modal
const closeModal = () => {
    const modalElement = document.getElementById("teamModal");
    if (modalElement) {
        const modal = bootstrap.Modal.getInstance(modalElement);
        modal.hide();
    }
};

    return (
        <div className="container-xl">
            <Navbar />
            <div className="table-responsive">
                <div className="table-wrapper ">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2>All <b>Teams</b></h2>
                            </div>
                            <div className="col-sm-4">
                                <button className="text-dark bg-warning p-2 rounded-md min-w-[140px]" onClick={openCreateModal}>
                                    Add New Team
                                </button>
                                
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover table-bordered ">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Join Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {teams.length > 0 ? (
                                teams.map((team, index) => (
                                    <tr key={team.id}>
                                        <td>{index + 1}</td>
                                        <td>
                                            <img
                                                src={team.logo ? `https://matc.matchdada.com/storage/app/public/${team.logo}` : "https://via.placeholder.com/50"}
                                                alt="Team Logo"
                                                style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                            />
                                        </td>
                                        <td>{team.name}</td>
                                        <td>{team.address}</td>
                                        <td>{team.city}</td>
                                        <td>{team.pin}</td>
                                        <td>
                                            <Link to={`/team-members/${team.user_id}`} className="view users d-flex text-align-center justify-content-center" title="team-members">
                                                <i className="fas fa-users me-2"></i>
                                            </Link>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className="text-center">No teams available</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Single Modal for Create and Edit */}
            <div className="modal fade" id="teamModal" tabIndex="-1" aria-labelledby="teamModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="teamModalLabel">
                                {isEditMode ? "Edit Team" : "Add New Team"}
                            </h5>
                            <button type="button" className="btn-close text-warning" data-bs-dismiss="modal" aria-label="Close" onClick={closeModal}></button>
                        </div>
                        <div className="modal-body">
                            {teamForm.logo && (
                                <div className="text-center mb-3">
                                    <img
                                        src={URL.createObjectURL(teamForm.logo)}
                                        alt="Team Logo"
                                        className="rounded-circle"
                                        style={{ width: "80px", height: "80px", objectFit: "cover" }}
                                    />
                                </div>
                            )}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label className="form-label">Choose Team Logo</label>
                                    <input type="file" className="form-control mb-2" accept="image/*" onChange={handleFileChange} />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-control" name="name" value={teamForm.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" value={teamForm.address} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" name="city" value={teamForm.city} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Join Code</label>
                                    <div className="d-flex">
                                        <input type="text" className="form-control me-2" value={teamForm.pin} readOnly />
                                        <button type="button" className="btn btn-warning" onClick={generateTeamCode}>Generate</button>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal" onClick={closeModal}>Close</button>
                                    <button type="submit" className="btn btn-primary">
                                        {isEditMode ? "Update Team" : "Save Team"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllTeams;