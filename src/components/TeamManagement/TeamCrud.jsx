import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Header/header";
import VerticleNav from "../verticleNav";
import "./teamManagement.css";

const TeamManagement = () => {
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]); // Teams created by the logged-in user
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [teamForm, setTeamForm] = useState({ name: "", address: "", city: "", pin: "", logo: null });
    const [loading, setLoading] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserId = loggedInUser?.id;

    const fetchTeams = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            if (!token) {
                console.error("No auth token found.");
                setLoading(false);
                return;
            }

            const response = await axios.get("http://127.0.0.1:8000/api/teams", {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            });

            const teamsData = Array.isArray(response.data) ? response.data : response.data.teams || [];
            const userTeams = teamsData.filter(team => team.user_id === loggedInUserId);
            setTeams(teamsData);
            setFilteredTeams(userTeams);
            console.log(loggedInUserId);
        } catch (error) {
            console.error("Error fetching teams:", error);
            setTeams([]);
            setFilteredTeams([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTeams();
    }, []);

    useEffect(() => {
        const modalElement = document.getElementById("teamModal");
        if (modalElement) {
            new bootstrap.Modal(modalElement, { backdrop: true });
        }
    }, []);

    const handleChange = (e) => {
        setTeamForm({ ...teamForm, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setTeamForm({ ...teamForm, logo: e.target.files[0] });
    };

    const generateTeamCode = () => {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const namePrefix = teamForm.name ? teamForm.name.substring(0, 3).toUpperCase() : "TMT";
        setTeamForm({ ...teamForm, pin: `${namePrefix}${randomDigits}` });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', teamForm.name);
        formData.append('address', teamForm.address);
        formData.append('city', teamForm.city);
        formData.append('pin', teamForm.pin);
        formData.append('created_by', loggedInUserId); // Include created_by
        if (teamForm.logo) {
            formData.append('logo', teamForm.logo);
        }

        try {
            const token = localStorage.getItem("authToken");
            const url = isEditMode && selectedTeam ? `http://127.0.0.1:8000/api/teams/${selectedTeam.id}` : "http://127.0.0.1:8000/api/teams";
            const method = isEditMode && selectedTeam ? "put" : "post";

            const response = await axios[method](url, formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "multipart/form-data",
                },
            });

            console.log('Response:', response.data);
            fetchTeams(); // Refresh the list of teams
            closeModal(); // Close the modal
        } catch (error) {
            console.error('Error:', error.response ? error.response.data : error.message);
        }
    };

    const handleDelete = async (teamId) => {
        if (!window.confirm("Are you sure you want to delete this team?")) return;
        setLoading(true);
        try {
            const token = localStorage.getItem("authToken");
            await axios.delete(`http://127.0.0.1:8000/api/teams/${teamId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            setFilteredTeams(filteredTeams.filter(team => team.id !== teamId));
        } catch (error) {
            console.error("Error deleting team:", error);
            alert("Failed to delete team.");
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (team) => {
        setSelectedTeam(team);
        setIsEditMode(true);
        setTeamForm({ ...team, logo: null });
        openModal();
    };

    const openCreateModal = () => {
        setIsEditMode(false);
        setTeamForm({ name: "", address: "", city: "", pin: "", logo: null });
        openModal();
    };

    const resetForm = () => {
        setTeamForm({ name: "", address: "", city: "", pin: "", logo: null });
    };

    const openModal = () => {
        const modalElement = document.getElementById("teamModal");
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement) || new bootstrap.Modal(modalElement);
            modal.show();
        }
    };

    const closeModal = () => {
        const modalElement = document.getElementById("teamModal");
        if (modalElement) {
            const modal = bootstrap.Modal.getInstance(modalElement);
            modal.hide();
        }
    };

    return (
        <div className="container-fluid">
            <Navbar />
            <div className="table-responsive container m-auto">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2>My <b>Teams</b></h2>
                            </div>
                            <div className="col-sm-4">
                                <button className="text-dark bg-warning p-2 rounded-md min-w-[140px]" onClick={openCreateModal}>
                                    Add New Team
                                </button>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <div className="text-center">
                            <div className="spinner-border text-warning" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <table className="table table-striped table-hover table-bordered">
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
                                {filteredTeams.length > 0 ? (
                                    filteredTeams.map((team, index) => (
                                        <tr key={team.id}>
                                            <td>{index + 1}</td>
                                            <td>
                                                <img
                                                    src={team.logo ? `http://127.0.0.1:8000/storage/${team.logo}` : "https://via.placeholder.com/50"}
                                                    alt="Team Logo"
                                                    style={{ width: "50px", height: "50px", borderRadius: "50%" }}
                                                />
                                            </td>
                                            <td>{team.name}</td>
                                            <td>{team.address}</td>
                                            <td>{team.city}</td>
                                            <td>{team.pin}</td>
                                            <td>
                                                <Link to={`/team-members/${team.id}`} className="view users" title="team-members">
                                                    <i className="fas fa-users me-2"></i>
                                                </Link>
                                                <a href="#" className="edit" title="Edit" onClick={() => openEditModal(team)}><i className="fas fa-edit"></i></a>
                                                <a href="#" className="delete" title="Delete" onClick={() => handleDelete(team.id)}><i className="fas fa-trash"></i></a>
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
                    )}
                </div>
            </div>

            {/* Modal for Create and Edit */}
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
            <VerticleNav />
        </div>
    );
};

export default TeamManagement;