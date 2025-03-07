import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Navbar from "../Header/header";
import VerticleNav from "../verticleNav";
import "./teamManagement.css";

const TeamManagement = () => {
    const [teams, setTeams] = useState([]);
    const [filteredTeams, setFilteredTeams] = useState([]); // Filtered teams
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [isEditMode, setIsEditMode] = useState(false);
    const [teamForm, setTeamForm] = useState({ name: "", address: "", city: "", pin: "", logo: null });
    const [loading, setLoading] = useState(false);

    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    const loggedInUserId = loggedInUser?.id ? String(loggedInUser.id) : null;  // Ensure it's a string

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

            console.log("API Response:", response.data);

            const teamsData = Array.isArray(response.data) ? response.data : response.data.teams || [];

            console.log("Fetched Teams Data:", teamsData);
            console.log("Logged in User ID:", loggedInUserId);

            const userTeams = teamsData.filter(team => String(team.user_id) === loggedInUserId);

            console.log("Filtered Teams:", userTeams);

            setTeams(teamsData);
            setFilteredTeams(userTeams);
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
                                <button className="text-dark bg-warning p-2 rounded-md min-w-[140px]">
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
                                                <a href="#" className="edit" title="Edit"><i className="fas fa-edit"></i></a>
                                                <a href="#" className="delete" title="Delete"><i className="fas fa-trash"></i></a>
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
            <VerticleNav />
        </div>
    );
};

export default TeamManagement;
