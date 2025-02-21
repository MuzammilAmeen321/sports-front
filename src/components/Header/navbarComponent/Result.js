import React from "react";

const matches = [
  {
    id: 1,
    title: "Qualifier 2",
    time: "8:00pm IST (2:30pm GMT), Friday 22nd May 2015",
    teams: {
      home: {
        name: "Mumbai Indians",
        logo: "http://cricket.indiatoday.in/ipl/2009/images/200X200/Chennai-Super-Kings.jpg",
        score: "140/7",
        overs: "19.5/20",
      },
      away: {
        name: "Chennai Super Kings",
        logo: "http://cricket.indiatoday.in/ipl/2009/images/200X200/Chennai-Super-Kings.jpg",
        score: "139/8",
        overs: "20/20",
      },
    },
    result: "Chennai Super Kings won by 3 wickets",
    stadium: "JSCA International Cricket Stadium, Ranchi",
  },
  {
    id: 2,
    title: "Eliminator",
    time: "7:30pm IST (2:00pm GMT), Saturday 23rd May 2015",
    teams: {
      home: {
        name: "Kolkata Knight Riders",
        logo: "https://upload.wikimedia.org/wikipedia/en/6/60/Kolkata_Knight_Riders_Logo.svg",
        score: "167/6",
        overs: "20/20",
      },
      away: {
        name: "Royal Challengers Bangalore",
        logo: "https://upload.wikimedia.org/wikipedia/en/5/5f/Royal_Challengers_Bangalore_Logo.svg",
        score: "160/9",
        overs: "20/20",
      },
    },
    result: "Kolkata Knight Riders won by 7 runs",
    stadium: "Eden Gardens, Kolkata",
  },
  {
    id: 3,
    title: "Final",
    time: "8:00pm IST (2:30pm GMT), Sunday 24th May 2015",
    teams: {
      home: {
        name: "Mumbai Indians",
        logo: "http://www.t20worldcricket.com/images/clt20/mumbai_indians1.jpg",
        score: "202/5",
        overs: "20/20",
      },
      away: {
        name: "Chennai Super Kings",
        logo: "http://cricket.indiatoday.in/ipl/2009/images/200X200/Chennai-Super-Kings.jpg",
        score: "161/8",
        overs: "20/20",
      },
    },
    result: "Mumbai Indians won by 41 runs",
    stadium: "Wankhede Stadium, Mumbai",
  },
];

const MatchCard = ({ match }) => {
  return (
    <div className="panel panel-primary mb-4">
      <div className="panel-heading match-header p-3 text-white bg-warning">
        <h3 className="panel-title text-uppercase">
          {match.title}
          <span className="float-end">{match.time}</span>
        </h3>
      </div>
      <div className="panel-body bg-light p-3">
        <div className="row align-items-center">
          <div className="col-md-5 text-center">
            <div className="score">
              <div className="runs fs-4 fw-bold text-primary">{match.teams.home.score}</div>
              <div className="overs text-muted">{match.teams.home.overs}</div>
            </div>
            <img src={match.teams.home.logo} alt={match.teams.home.name} className="img-fluid rounded-circle" width="80" />
          </div>
          <div className="col-md-2 text-center">
            <div className="vs fs-3 fw-bold">vs</div>
          </div>
          <div className="col-md-5 text-center">
            <img src={match.teams.away.logo} alt={match.teams.away.name} className="img-fluid rounded-circle" width="80" />
            <div className="score">
              <div className="runs fs-4 fw-bold text-primary">{match.teams.away.score}</div>
              <div className="overs text-muted">{match.teams.away.overs}</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <h4 className="summary text-primary fw-bold">{match.result}</h4>
          <div className="stadium text-muted">{match.stadium}</div>
        </div>
        <div className="text-center mt-3">
          <a href="fullscorecard.html" className="btn btn-info text-white">
            <i className="fa fa-list-alt"></i> Full ScoreCard
          </a>
        </div>
      </div>
    </div>
  );
};

const Result = () => {
  return (
    <div className="container py-4">
      {matches.map((match) => (
        <MatchCard key={match.id} match={match} />
      ))}
    </div>
  );
};

export default Result;
