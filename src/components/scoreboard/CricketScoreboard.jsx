import React, { useState } from "react";
import "./CricketScoreboard.css";


const CricketScoreboard = () => {
  const [runs, setRuns] = useState(0);
  const [over, setOver] = useState(0);
  const [ball, setBall] = useState(0);
  const [wicket, setWicket] = useState(0);
  const [dismissalType, setDismissalType] = useState([]);

  const addScore = (score) => {
    setRuns((prevRuns) => prevRuns + score);
    addBall();
  };

  const addExtra = (extra, isLegBye = false) => {
    setRuns((prevRuns) => prevRuns + extra);
    if (!isLegBye) {
      updateScore();
    } else {
      addBall();
    }
  };

  const addBall = () => {
    setBall((prevBall) => {
      if (prevBall === 5) {
        setOver((prevOver) => prevOver + 1);
        return 0;
      }
      return prevBall + 1;
    });
    checkEndCondition();
  };

  const addWicket = (dismissal) => {
    setWicket((prevWicket) => prevWicket + 1);
    setDismissalType((prev) => [...prev, dismissal]);
    addBall();
  };

  const checkEndCondition = () => {
    if (wicket === 10 || over === 4) {
      displaySummary();
      resetScoreboard();
    }
  };

  const displaySummary = () => {
    let dismissalSummary = dismissalType.length > 0 ? `Dismissals: ${dismissalType.join(", ")}` : "";
    alert(`Final Score: ${runs} in ${over}.${ball} overs with ${wicket} wickets lost. ${dismissalSummary}`);
  };

  const resetScoreboard = () => {
    setRuns(0);
    setOver(0);
    setBall(0);
    setWicket(0);
    setDismissalType([]);
  };

  return (
    <div id="container">
      <header>
        <h1>Live Cricket Scoreboard</h1>
      </header>
      <section className="scoreboard">
        <p>Score / Wicket: {runs} / {wicket}</p>
        <p>Current Over: {over}</p>
        <p>Ball: {over}.{ball}</p>
      </section>
      <section id="controls">
        <button onClick={() => addScore(1)}>1 Run</button>
        <button onClick={() => addScore(2)}>2 Runs</button>
        <button onClick={() => addScore(3)}>3 Runs</button>
        <button onClick={() => addScore(4)}>4 Runs</button>
        <button onClick={() => addScore(6)}>6 Runs</button>
        <button onClick={() => addBall()}>Dot Ball</button>

        <select onChange={(e) => { addWicket(e.target.value); e.target.selectedIndex = 0; }}>
          <option value="" disabled selected>Out</option>
          <option value="bowled">Bowled</option>
          <option value="caught">Caught</option>
          <option value="lbw">LBW</option>
          <option value="stumped">Stumped</option>
          <option value="runout">Run Out</option>
          <option value="hitwicket">Hit Wicket</option>
        </select>

        <select onChange={(e) => { addExtra(parseInt(e.target.value), false); e.target.selectedIndex = 0; }}>
          <option value="" disabled selected>Wide Ball</option>
          <option value="1">Wide +0</option>
          <option value="2">Wide +1</option>
          <option value="3">Wide +2</option>
          <option value="4">Wide +3</option>
          <option value="5">Wide +4</option>
          <option value="6">Wide +5</option>
        </select>

        <select onChange={(e) => { addExtra(parseInt(e.target.value), false); e.target.selectedIndex = 0; }}>
          <option value="" disabled selected>No Ball</option>
          <option value="1">No Ball +0</option>
          <option value="2">No Ball +1</option>
          <option value="3">No Ball +2</option>
          <option value="4">No Ball +3</option>
          <option value="5">No Ball +4</option>
          <option value="6">No Ball +5</option>
          <option value="7">No Ball +6</option>
        </select>
      </section>
    </div>
  );
};

export default CricketScoreboard;
