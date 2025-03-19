import { useState } from "react";
import VerticleNav from "../components/verticleNav";
import Navbar from "../components/Header/header";
import axios from "axios";
import "../style/matches.css";
import LocationModal from "../components/models/LocationModel";
import CreateMatchModal from "../components/models/createNewMatch";

const AllMatches = () => {
  const [matchType, setMatchType] = useState("all");

  const matches = [
    { id: 1, sport: "Cricket", startDate: "07 Jun 2025", startTime: "05:00 PM", imageUrl: "https://seeklogo.com/images/P/pakistan-super-league-psl-logo-7CA605C19A-seeklogo.com.png", league: "PSL", bidAmount: 5000, security: true, status: "available" },
    { id: 2, sport: "Cricket", startDate: "10 Jun 2025", startTime: "07:00 PM", imageUrl: "https://seeklogo.com/images/P/pakistan-super-league-psl-logo-7CA605C19A-seeklogo.com.png", teams: "Pak vs Ind", league: "PSL", bidAmount: 5000, security: true, status: "booked" },
    { id: 3, sport: "Cricket", startDate: "15 Jun 2025", startTime: "06:30 PM", imageUrl: "https://seeklogo.com/images/P/pakistan-super-league-psl-logo-7CA605C19A-seeklogo.com.png", league: "IPL", bidAmount: 6000, security: false, status: "pending" },
    { id: 4, sport: "Cricket", startDate: "07 Jun 2025", startTime: "05:00 PM", imageUrl: "https://seeklogo.com/images/P/pakistan-super-league-psl-logo-7CA605C19A-seeklogo.com.png", teams: "Pak vs Ind", league: "PSL", bidAmount: 5000, security: true, status: "live" },
  ];

  const filteredMatches = matchType === "all" ? matches : matches.filter(match => match.status === matchType);

  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <div className="container m-auto">
        <div className="row">
          <div className="col-12">
            {/* Simplified Header */}
            <header className="header d-flex justify-content-center align-items-center p-4">
              {/* Create New Match Button */}
              <button className="btn min-w-[140px] mx-2" data-bs-toggle="modal" data-bs-target="#createMatchModal">
                Matches
              </button>
            </header>
            

            {/* Matches List */}
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

                          {/* Buttons based on match status */}
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