import { useState } from "react";

const matches = {
  live: [
    {
      id: 1,
      type: "Cricket",
      startTime: "07 Jun 2025 - 05:00 PM",
      teams: "KKR vs RGB",
      league: "PSL",
      bid: 5000,
      securityVenue: "Yes",
      imgSrc: "./images/pakistan-super-league-psl-logo.png",
    },
  ],
  upcoming: [
    {
      id: 2,
      type: "Cricket",
      startTime: "10 Jun 2025 - 06:00 PM",
      teams: "MI vs CSK",
      league: "IPL",
      bid: 7000,
      securityVenue: "No",
      imgSrc: "./images/ipl-logo.png",
    },
  ],
  available: [
    {
      id: 3,
      type: "Cricket",
      teams: "CSK", // Only one team name displayed (match creator)
      imgSrc: "./images/ipl-logo.png",
    },
  ],
};

export default function MatchTabs() {
  const [activeTab, setActiveTab] = useState("live");

  return (
    <div className="container mt-3">
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "live" ? "active" : ""}`} onClick={() => setActiveTab("live")}>
            Live Matches
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "upcoming" ? "active" : ""}`} onClick={() => setActiveTab("upcoming")}>
            Upcoming
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "available" ? "active" : ""}`} onClick={() => setActiveTab("available")}>
            Available Matches
          </button>
        </li>
      </ul>
      <div className="tab-content mt-3">
        <div className={`tab-pane fade ${activeTab === "live" ? "show active" : ""}`}>
          <MatchList matches={matches.live} showRequest={false} />
        </div>
        <div className={`tab-pane fade ${activeTab === "upcoming" ? "show active" : ""}`}>
          <MatchList matches={matches.upcoming} showRequest={false} />
        </div>
        <div className={`tab-pane fade ${activeTab === "available" ? "show active" : ""}`}>
          <MatchList matches={matches.available} showRequest={true} />
        </div>
      </div>
    </div>
  );
}

function MatchList({ matches, showRequest }) {
  return (
    <div className="row">
      {matches.map((match) => (
        <div className="col-md-6 mb-3" key={match.id}>
          <div className="card bg-white text-black p-1 px-2 text-center">
            <div className="d-flex align-items-center justify-content-center mb-2">
              <i className="fas fa-baseball-bat-ball fa-1x text-warning me-2"></i>
              <p className="mb-0 fw-bold">{match.type}</p>
            </div>
            <div className="row">
              <div className="col">
                <img src={match.imgSrc} alt="League Logo" className="img-fluid" style={{ maxWidth: "80px", height: "auto" }} />
              </div>
              <div className="col">
                <h6 className="mb-1">{match.teams}</h6>
                {match.league && <span className="badge bg-warning text-dark">{match.league}</span>}
              </div>
              {match.bid && (
                <div className="col">
                  <p className="mb-0" style={{ color: "red", fontWeight: "bold" }}>
                    Bid <span style={{ color: "black" }}>{match.bid}</span>
                  </p>
                </div>
              )}
              {match.securityVenue && (
                <div className="col">
                  <p className="mb-0" style={{ color: "black", fontWeight: "bold" }}>
                    Security Venue <span style={{ color: match.securityVenue === "Yes" ? "green" : "red" }}>{match.securityVenue}</span>
                  </p>
                </div>
              )}
            </div>
            {showRequest && (
              <button className="btn btn-primary mt-2">Request Match</button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
