import React from "react";

const MatchCard = ({ match }) => {
  return (
    <div className="col-md-6 mb-4">
      <div className="card text-black  shadow-sm">
        <div className="card-header  d-flex justify-content-between align-items-center p-3">
          <div className="d-flex align-items-center">
            <i className="fas fa-baseball fa-1x text-warning me-2"></i>
            <p className="mb-0 fw-bold">{match.sport}</p>
          </div>
          <div>
            <p className="text-muted small mb-0">
              Starts: {match.startDate} - {match.startTime}
            </p>
          </div>
        </div>

        <div className="card-body p-3">
          <div className="row align-items-center">
            <div className="col-md-3 text-center">
              <img
                src={match.imageUrl}
                alt="League Logo"
                className="img-fluid rounded-circle"
                style={{ maxHeight: "80px" }}
              />
            </div>

            <div className="col-md-5">
              <h5 className="mb-2 fw-bold">{match.teams}</h5>
              <span className="badge bg-warning text-dark fs-6">{match.league}</span>
            </div>

            <div className="col-md-4">
              <div className="d-flex flex-column">
                <p className="mb-2">
                  <span className="fw-bold">Bid:</span> ${match.bidAmount}
                </p>
                <p className="mb-0">
                  <span className="fw-bold">Security:</span>{" "}
                  {match.securityVenue ? (
                    <span className="text-success">Yes</span>
                  ) : (
                    <span className="text-danger">No</span>
                  )}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="card-footer bg-light p-3">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <span className="text-muted small">Match Status:</span>
              <span className="ms-2 fw-bold">{match.status.toUpperCase()}</span>
            </div>
            <button className="btn btn-primary btn-sm">
              <i className="fas fa-ticket-alt me-2"></i>Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Example Usage
const MatchList = () => {
  const matches = [
    {
      sport: "Cricket",
      startDate: "07 Jun 2025",
      startTime: "05:00 PM",
      imageUrl: "./images/pakistan-super-league-psl-logo.png",
      teams: "KKR vs RGB",
      league: "PSL",
      bidAmount: 5000,
      security: true,
      status: "available", // Change to "booked" or "pending" for different states
    },
    {
      sport: "Cricket",
      startDate: "10 Jun 2025",
      startTime: "07:00 PM",
      imageUrl: "./images/pakistan-super-league-psl-logo.png",
      teams: "MI vs CSK",
      league: "IPL",
      bidAmount: 7000,
      security: false,
      status: "booked",
    },
    {
      sport: "Cricket",
      startDate: "15 Jun 2025",
      startTime: "06:30 PM",
      imageUrl: "./images/pakistan-super-league-psl-logo.png",
      teams: "RCB vs DC",
      league: "IPL",
      bidAmount: 6000,
      security: true,
      status: "pending",
    },
  ];

  return (
    <div className="row p-3">
      {matches.map((match, index) => (
        <MatchCard key={index} match={match} />
      ))}
    </div>
  );
};

export default MatchList;