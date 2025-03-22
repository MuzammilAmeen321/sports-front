import { useState, useEffect } from "react";
import VerticleNav from "../components/verticleNav";
import Navbar from "../components/Header/header";
import axios from "axios";
import "../style/matches.css";
import LocationModal from "../components/models/LocationModel";
import CreateMatchModal from "../components/models/createNewMatch";

const API_URL = "https://matc.matchdada.com/public/api"; // Correct API URL

const AllMatches = () => {
  const [matchType, setMatchType] = useState("all");
  const [matches, setMatches] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  /* const [security , setSecurity] = useState(0); */

 
  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found.");
        setToast({ show: true, message: "No authentication token found. Please log in.", type: "error" });
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  const filteredMatches = matchType === "all" ? matches : matches.filter(match => match.status === matchType);

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <div className="container m-auto">
        <div className="row">
          <div className="col-12">
            <header className="header d-flex justify-content-center align-items-center p-4">
              <button className="btn min-w-[140px] mx-2" data-bs-toggle="modal" data-bs-target="#createMatchModal">
                Matches
              </button>
            </header>
            <CreateMatchModal />

            <div className="container m-auto">
              <div className="row">
                <div className="col-12">
                  <div className="row p-2 cards-container">
                    {filteredMatches.map((match) => (
                      <div key={match.id} className="col-lg-4 col-md-6 col-12 mb-3">
                        <div className="card bg-white text-black p-2 text-center shadow-sm h-100">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-baseball-bat-ball fa-1x text-warning me-1"></i>
                              <p className="mb-0 fw-bold">{match.category}</p>
                            </div>
                            <p className="text-muted small mb-0">Starts: {match.match_datetime}</p>
                          </div>

                          <div className="row align-items-center">
                            <div className="col-4 text-center">
                            <p className="mb-0 text-danger fw-bold">
    Overs <br />
    <span className="text-black">{match.overs}</span>
  </p>
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
                            <div className="col-4 text-center d-flex align-items-center justify-content-around">
  <p className="mb-0 text-danger fw-bold">
    Bid <br />
    <span className="text-black">${match.match_bid}</span>
  </p>
  <p className="mb-0 text-danger fw-bold">
    Security <br />
    <span className="text-black">{match.security === "1" ? `$${match.security_amount ?? "0"}` : "No"}</span>
  </p>
</div>

<div className="col-12 text-center">
  <p className="mb-0  text-danger fw-bold d-flex justify-content-center">
    Venue:
    <span className="text-black mx-1">${match.venue}</span>
  </p>
 
</div>      
                          </div>

                          <div className="card-footer bg-light mt-1">
                            {match.status === "available" && (
                              <a href="/scoreboard" className="btn btn-score w-100 text-decoration-none">Request</a>
                            )}

                            {match.status === "pending" && (
                              <a href="/scoreboard" className="btn btn-score w-100 text-decoration-none">Cancel</a>
                            )}

                            {match.status === "booked" && (
                              <a href="/scoreboard" className="btn btn-score w-100 text-decoration-none">Request</a>
                            )}

                            {match.status === "live" && (
                              <a href="/scoreboard" className="btn btn-score w-100 text-decoration-none">Score</a>
                            )}
                            <a href="/scoreboard" className="btn btn-score w-100 text-decoration-none">Request</a>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMatches;
