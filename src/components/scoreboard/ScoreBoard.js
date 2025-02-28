import React, { useState, useEffect } from "react";
import axios from "axios";

const Scoreboard = () => {
  const [scoreboardData, setScoreboardData] = useState(null);
  const [activeTab, setActiveTab] = useState("batting");

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (!token) {
      console.error("No token found");
      return;
    }

    // Fetch data from Laravel backend with token
    axios.get("http://localhost:8000/api/scoreboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        setScoreboardData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching scoreboard data:", error);
      });
  }, []);

  if (!scoreboardData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container">
      <div className="scoreboard p-4 rounded shadow-lg text-center" style={{ background: "#111", color: "#fff" }}>
        <h2 className="mb-4" style={{ color: "rgb(255, 187, 0)" }}>🏏 Match Scoreboard 🏏</h2>
        <div className="">Date: {scoreboardData.date} | Location: {scoreboardData.location}</div>
        <div className="text-light">
          <strong>Toss:</strong> {scoreboardData.toss}
        </div>
        <h1 className="mt-4 text-white">{scoreboardData.teamA} VS {scoreboardData.teamB}</h1>
        <div className="row align-items-center mt-3">
          <div className="col-5 fs-4 fw-bold">{scoreboardData.teamA}</div>
          <div className="col-2 fs-2 fw-bold text-light">{scoreboardData.score}</div>
        </div>
        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "batting" ? "active" : ""}`}
              onClick={() => setActiveTab("batting")}
            >
              {scoreboardData.teamA} (Batting)
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "bowling" ? "active" : ""}`}
              onClick={() => setActiveTab("bowling")}
            >
              {scoreboardData.teamB} (Bowling)
            </button>
          </li>
        </ul>
        <div className="tab-content mt-3">
          {activeTab === "batting" ? (
            <BattingDetails battingData={scoreboardData.batting} />
          ) : (
            <BowlingDetails bowlingData={scoreboardData.bowling} />
          )}
        </div>
      </div>
    </div>
  );
};

const BattingDetails = ({ battingData }) => {
  return (
    <div>
      <h4 className="mt-4 text-white">Batting Details</h4>
      <table className="table table-bordered table-hover" style={{ background: "#222", color: "#fff" }}>
        <thead style={{ background: "#444" }}>
          <tr>
            <th>Player</th>
            <th>Runs</th>
            <th>Balls</th>
            <th>4s</th>
            <th>6s</th>
            <th>Strike Rate</th>
          </tr>
        </thead>
        <tbody>
          {battingData.map((player, index) => (
            <tr key={index}>
              <td>{player.player}</td>
              <td>{player.runs}</td>
              <td>{player.balls}</td>
              <td>{player.fours}</td>
              <td>{player.sixes}</td>
              <td>{((player.runs / player.balls) * 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BowlingDetails = ({ bowlingData }) => {
  return (
    <div>
      <h4 className="mt-4 text-white">Bowling Details</h4>
      <table className="table table-bordered table-hover" style={{ background: "#222", color: "#fff" }}>
        <thead style={{ background: "#444" }}>
          <tr>
            <th>Bowler</th>
            <th>Overs</th>
            <th>Runs Given</th>
            <th>Wickets</th>
            <th>Dot Balls</th>
            <th>Economy</th>
          </tr>
        </thead>
        <tbody>
          {bowlingData.map((bowler, index) => (
            <tr key={index}>
              <td>{bowler.bowler}</td>
              <td>{bowler.overs}</td>
              <td>{bowler.runsGiven}</td>
              <td>{bowler.wickets}</td>
              <td>{bowler.dotBalls}</td>
              <td>{(bowler.runsGiven / bowler.overs).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;