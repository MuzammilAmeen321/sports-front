import React, { useState } from "react";
import "./teamManagement.css";
import axios from "axios";

const TeamManagement = () => {
    const [search, setSearch] = useState("");
    const [newTeam, setNewTeam] = useState({ name: "", address: "", city: "", pin: "", logo: null });

    const Teams = [
        { id: 1, name: "Thomas Hardy", logo: "https://via.placeholder.com/50", address: "89 Chiaroscuro Rd.", city: "Portland", pin: "97219", country: "USA" },
        { id: 2, name: "Maria Anders", logo: "https://via.placeholder.com/50", address: "Obere Str. 57", city: "Berlin", pin: "12209", country: "Germany" },
        { id: 3, name: "Fran Wilson", logo: "https://via.placeholder.com/50", address: "C/ Araquil, 67", city: "Madrid", pin: "28023", country: "Spain" }
    ];

    const handleChange = (e) => {
        setNewTeam({ ...newTeam, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        setNewTeam({ ...newTeam, logo: e.target.files[0] });
    };

    const generateTeamCode = () => {
        const randomDigits = Math.floor(1000 + Math.random() * 9000);
        const namePrefix = newTeam.name ? newTeam.name.substring(0, 3).toUpperCase() : "TMT";
        setNewTeam({ ...newTeam, pin: `${namePrefix}${randomDigits}` });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const formData = new FormData();
        formData.append("name", newTeam.name);
        formData.append("address", newTeam.address);
        formData.append("city", newTeam.city);
        formData.append("pin", newTeam.pin);
        if (newTeam.logo) {
            formData.append("logo", newTeam.logo);
        }
    
        try {
            const token = localStorage.getItem("authToken");
            const response = await axios.post(
                "http://127.0.0.1:8000/api/teams",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
    
            alert("Team added successfully!");
            fetchTeams(); // Refresh list
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to add team.");
        }
    };
    
    

    return (
        <div className="container-xl">
            <div className="table-responsive">
                <div className="table-wrapper">
                    <div className="table-title">
                        <div className="row">
                            <div className="col-sm-8">
                                <h2>My <b>Teams</b></h2>
                            </div>
                            <div className="col-sm-4">
                                <div className="search-box">
                                    <button className="text-dark bg-warning p-2 rounded-md min-w-[140px]" data-bs-toggle="modal" data-bs-target="#addTeamModal">
                                        Add New Team
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <table className="table table-striped table-hover table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Logo</th>
                                <th>Name</th>
                                <th>Address</th>
                                <th>City</th>
                                <th>Team Code</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {Teams.map(customer => (
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>
                                        <img src={customer.logo} alt="Team Logo" style={{ width: "50px", height: "50px", borderRadius: "50%" }} />
                                    </td>
                                    <td>{customer.name}</td>
                                    <td>{customer.address}</td>
                                    <td>{customer.city}</td>
                                    <td>{customer.pin}</td>
                                    <td>
                                    <a href="#" className="view" title="team-members"><i className="fas fa-users me-2"></i></a>
                                        <a href="#" className="edit" title="Edit"><i className="fas fa-edit"></i></a>
                                        <a href="#" className="delete" title="Delete"><i className="fas fa-trash"></i></a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Modal */}
            <div className="modal fade" id="addTeamModal" tabIndex="-1" aria-labelledby="addTeamModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="addTeamModalLabel">Add New Team</h5>
                            <button type="button" className="btn-close text-warning" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {newTeam.logo && (
                                <div className="text-center mb-3">
                                    <img
                                        src={URL.createObjectURL(newTeam.logo)}
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
                                    <input type="text" className="form-control" name="name" value={newTeam.name} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-control" name="address" value={newTeam.address} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-control" name="city" value={newTeam.city} onChange={handleChange} required />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Team Code</label>
                                    <div className="d-flex">
                                        <input type="text" className="form-control me-2" value={newTeam.pin} readOnly />
                                        <button type="button" className="btn btn-warning" onClick={generateTeamCode}>Generate</button>
                                    </div>
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                    <button type="submit" className="btn btn-primary">Save Team</button>
                                </div>
                            </form>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeamManagement;
