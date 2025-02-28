import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import VerticleNav from "../../verticleNav";
import Navbar from "../header";

export default function Live() {
  const [matchesData, setMatches] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No token found");
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8000/api/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const today = new Date().toISOString().split("T")[0]; // Get today's date in "YYYY-MM-DD" format

        // Filter matches happening today
        const liveMatches = response.data.filter(
          (match) => match.date === today
        );

        setMatches(liveMatches);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);

  // Function to handle match click
  const handleMatchClick = (matchId) => {
    navigate(`/scoreboard/${matchId}`);
  };

  return (
    <div className="container py-4">
      <Navbar />
      <h2 className="text-center mb-4">
        Live Matches ({new Date().toISOString().split("T")[0]})
      </h2>

      <div className="row justify-content-center">
        {matchesData.length > 0 ? (
          matchesData.map((match, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-5 mb-4">
              {/* Clickable Match Card */}
              <div
                className="card shadow-lg rounded-3 border-0 match-card p-3"
                onClick={() => handleMatchClick(match.id)}
                style={{
                  cursor: "pointer",
                  transition: "transform 0.3s ease-in-out",
                }}
              >
                {/* Card Header */}
                <div className="card-header d-flex align-items-center justify-content-between bg-light">
                  <h5 className="m-0 fw-bold">
                    {match.home_team} vs {match.away_team}
                  </h5>
                  <span className="badge bg-dark">{match.sport}</span>
                </div>

                {/* Card Body */}
                <div className="card-body d-flex flex-column align-items-center">
                  <div className="mb-2 d-flex justify-content-evenly align-items-center w-100">
                    <div><span className="fw-semibold text-muted">Venue:</span> {match.venue}</div>
                    <button className="btn btn-danger btn-sm px-3 py-1">
 Live
</button>
                  </div>

                  <div className="d-flex justify-content-between align-items-center w-100 px-3">
                    <span className="text-muted">{match.date}</span>
                    <h3 className="text-primary fw-bold">{match.score || "0 - 0"}</h3>
                    <span className="text-muted">{match.overs} overs</span>
                  </div>

                  <div className="mt-3">
                    <span className="fw-semibold text-dark">Bid Amount:</span>{" "}
                    <span className="fw-bold text-success">{match.bid || "5000"}</span>
                  </div>

                  <div className="mt-2">
                    <span className="fw-semibold">Security:</span>{" "}
                    <span className={`fw-bold ${match.security === "yes" ? "text-success" : "text-danger"}`}>
                      {match.security}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-muted">
            No live matches available today.
          </p>
        )}
      </div>

      <VerticleNav />

      {/* Hover Effect CSS */}
      <style>{`
        .match-card:hover {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
