import React from "react";
import "./Scoreboard.css";
import Navbar from "../Header/header";
import CricketScoreboard from "./CricketScoreboard";


const Scoreboard = () => {
  return (
    <>
    <Navbar />
    <div className="col-8">
    <div className="container">
      <header>
        <div className="match-info">
          <p>Agra District Women's League / League Matches</p>
          <p>Kachibagh, Shriankota, Limited Overs, 20 Ov, 18-Mar-25 11:53 AM</p>
          <p>Toss: Agra Royals opt to bat</p>
        </div>
        <div className="live-indicator">LIVE</div>
      </header>

      <div className="score-section">
        <h1>Agra Royals</h1>
        <h2>
          <span id="score">39/7 - 20.0 overs</span>
        </h2>
        <p>The Aryans Cricket Academy <span>Yet to Bat</span></p>
      </div>

      <div className="tabs">
        <button className="tab active">LIVE</button>
        <button className="tab">SCORECARD</button>
        <button className="tab">COMMENTARY</button>
        <button className="tab">TEAMS</button>
      </div>

      <div className="stats">
        <h3>On Strike</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>R</th>
              <th>B</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Hema*</td>
              <td id="hema-runs">7</td>
              <td>3</td>
              <td>1</td>
              <td>0</td>
              <td>233.33</td>
            </tr>
            <tr>
              <td>Geeta*</td>
              <td>6</td>
              <td>7</td>
              <td>0</td>
              <td>0</td>
              <td>85.71</td>
            </tr>
          </tbody>
        </table>

        <h3>Current Bowler</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>O</th>
              <th>M</th>
              <th>R</th>
              <th>W</th>
              <th>Eco</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Lata*</td>
              <td>3.0</td>
              <td>0</td>
              <td>11</td>
              <td>1</td>
              <td>3.67</td>
            </tr>
          </tbody>
        </table>

        <h3>Out Batters</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>R</th>
              <th>B</th>
              <th>4s</th>
              <th>6s</th>
              <th>SR</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Priya (out)</td>
              <td>8</td>
              <td>12</td>
              <td>1</td>
              <td>0</td>
              <td>66.67</td>
            </tr>
            <tr>
              <td>Shalini (out)</td>
              <td>5</td>
              <td>15</td>
              <td>0</td>
              <td>0</td>
              <td>33.33</td>
            </tr>
            <tr>
              <td>Ritu (out)</td>
              <td>2</td>
              <td>8</td>
              <td>0</td>
              <td>0</td>
              <td>25.00</td>
            </tr>
            <tr>
              <td>Neha (out)</td>
              <td>0</td>
              <td>3</td>
              <td>0</td>
              <td>0</td>
              <td>0.00</td>
            </tr>
            <tr>
              <td>Kavita (out)</td>
              <td>1</td>
              <td>5</td>
              <td>0</td>
              <td>0</td>
              <td>20.00</td>
            </tr>
          </tbody>
        </table>

        <h3>Other Bowlers</h3>
        <table>
          <thead>
            <tr>
              <th></th>
              <th>O</th>
              <th>M</th>
              <th>R</th>
              <th>W</th>
              <th>Eco</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Azru</td>
              <td>4.0</td>
              <td>0</td>
              <td>15</td>
              <td>1</td>
              <td>3.75</td>
            </tr>
            <tr>
              <td>Anika</td>
              <td>4.0</td>
              <td>0</td>
              <td>14</td>
              <td>2</td>
              <td>3.50</td>
            </tr>
            <tr>
              <td>Sneha</td>
              <td>3.0</td>
              <td>1</td>
              <td>8</td>
              <td>1</td>
              <td>2.67</td>
            </tr>
            <tr>
              <td>Divya</td>
              <td>3.0</td>
              <td>0</td>
              <td>12</td>
              <td>1</td>
              <td>4.00</td>
            </tr>
            <tr>
              <td>Meera</td>
              <td>3.0</td>
              <td>0</td>
              <td>10</td>
              <td>1</td>
              <td>3.33</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="recent-balls">
        <h4>Recent (51%)</h4>
        <div className="balls">
          {["1", "1", "0", "2", "W", "1", "2", "0", "4", "2"].map((ball, index) => (
            <span key={index}>{ball}</span>
          ))}
        </div>
      </div>
    </div>
    </div>
    <CricketScoreboard />
    </>
  );
};

export default Scoreboard;
