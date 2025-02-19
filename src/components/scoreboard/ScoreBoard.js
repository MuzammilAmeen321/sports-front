import { useState } from "react";

const Scoreboard = () => {
  const [activeTab, setActiveTab] = useState("batting");

  return (
    <div className="container">
      <div className="scoreboard p-4 rounded shadow-lg text-center" style={{ background: "#111", color: "#fff" }}>
        <h2 className="mb-4" style={{ color: "rgb(255, 187, 0)" }}>🏏 Match Scoreboard 🏏</h2>
        <div className="">Date: 10th Feb 2025 | Location: National Stadium</div>
        <div className="text-light">
          <strong>Toss:</strong> Team A won the toss and elected to bat
        </div>
        <h1 className="mt-4 text-white">Team A VS Team B</h1>
        <div className="row align-items-center mt-3">
          <div className="col-5 fs-4 fw-bold">Team A</div>
          <div className="col-2 fs-2 fw-bold text-light">145/6</div>
        </div>
        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "batting" ? "active" : ""}`}
              onClick={() => setActiveTab("batting")}
            >
              Team A (Batting)
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "bowling" ? "active" : ""}`}
              onClick={() => setActiveTab("bowling")}
            >
              Team B (Bowling)
            </button>
          </li>
        </ul>
        <div className="tab-content mt-3">
          {activeTab === "batting" ? <BattingDetails /> : <BowlingDetails />}
        </div>
      </div>
    </div>
  );
};

const BattingDetails = () => {
  const battingData = [
    { player: "Player 1 (B)", runs: 45, balls: 38, fours: 5, sixes: 2, strikeRate: ((45 / 38) * 100).toFixed(2) },
    { player: "Player 2 (L)", runs: 30, balls: 25, fours: 3, sixes: 1, strikeRate: ((30 / 25) * 100).toFixed(2) },
    { player: "Player 3 (R)", runs: 20, balls: 18, fours: 2, sixes: 0, strikeRate: ((20 / 18) * 100).toFixed(2) },
  ];

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
              <td>{player.strikeRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const BowlingDetails = () => {
  const bowlingData = [
    { bowler: "Bowler 1", overs: 4, runsGiven: 30, wickets: 2, dotBalls: 10, economy: (30 / 4).toFixed(2) },
    { bowler: "Bowler 2", overs: 5, runsGiven: 28, wickets: 1, dotBalls: 12, economy: (28 / 5).toFixed(2) },
    { bowler: "Bowler 3", overs: 6, runsGiven: 40, wickets: 3, dotBalls: 14, economy: (40 / 6).toFixed(2) },
  ];

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
              <td>{bowler.economy}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Scoreboard;
