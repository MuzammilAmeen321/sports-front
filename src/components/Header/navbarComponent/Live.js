export default function Live() {
  const matches = [
      {
          homeTeam: "West Ham",
          homeLogo: "https://assets.codepen.io/285131/whufc.svg",
          awayTeam: "Chelsea",
          awayLogo: "https://assets.codepen.io/285131/chelsea.svg",
          score: "2 : 0",
          time: "72'",
          date: "12 Aug at 19:00",
          referee: "Joseph Hicks"
      },
      {
          homeTeam: "Liverpool",
          homeLogo: "https://assets.codepen.io/285131/whufc.svg",
          awayTeam: "Man City",
          awayLogo: "https://assets.codepen.io/285131/chelsea.svg",
          score: "1 : 1",
          time: "60'",
          date: "13 Aug at 21:00",
          referee: "Michael Oliver"
      },
      {
          homeTeam: "Arsenal",
          homeLogo: "https://assets.codepen.io/285131/whufc.svg",
          awayTeam: "Tottenham",
          awayLogo: "https://assets.codepen.io/285131/chelsea.svg",
          score: "0 : 3",
          time: "50'",
          date: "14 Aug at 18:30",
          referee: "Anthony Taylor"
      }
  ];
  
  return (
      <div className="container d-flex flex-row justify-content-center align-items-center vh-100 gap-2">
          {matches.map((match, index) => (
              <div key={index} className="card shadow-lg p-3 bg-white rounded" style={{ minWidth: "500px" }}>
                  <div className="card-header d-flex justify-content-between align-items-center">
                      <span className="badge bg-danger">Live</span>
                      <div className="d-flex align-items-center">
                          <img src="https://assets.codepen.io/285131/pl-logo.svg" alt="League Logo" width="20" className="me-2" />
                          <strong>English Premier League</strong>
                      </div>
                      <div>
                          <button className="btn btn-light me-2">
                              <i className="fas fa-star"></i>
                          </button>
                          <button className="btn btn-light">
                              <i className="fas fa-bell"></i>
                          </button>
                      </div>
                  </div>
                  <div className="card-body row text-center">
                      <div className="col">
                          <div>
                              <div className="rounded-circle bg-light p-3 shadow-sm" style={{ width: "80px", height: "80px", margin: "auto" }}>
                                  <img src={match.homeLogo} alt={match.homeTeam} width="50" />
                              </div>
                              <h5 className="mt-2">{match.homeTeam}</h5>
                          </div>
                      </div>
                      <div className="col">
                          <p className="text-muted">{match.date}</p>
                          <h3>
                              <span className="text-primary">{match.score.split(" : ")[0]}</span> : <span className="text-secondary">{match.score.split(" : ")[1]}</span>
                          </h3>
                          <p className="text-warning">{match.time}</p>
                          <p className="text-muted">Referee: <strong>{match.referee}</strong></p>
                          <div className="d-flex justify-content-center gap-2 my-2">
                              <button className="btn btn-outline-dark">1.48</button>
                              <button className="btn btn-outline-dark">4.98</button>
                              <button className="btn btn-outline-dark">8.24</button>
                          </div>
                          <button className="btn btn-primary">Place a Bet</button>
                      </div>
                      <div className="col">
                          <div>
                              <div className="rounded-circle bg-light p-3 shadow-sm" style={{ width: "80px", height: "80px", margin: "auto" }}>
                                  <img src={match.awayLogo} alt={match.awayTeam} width="50" />
                              </div>
                              <h5 className="mt-2">{match.awayTeam}</h5>
                          </div>
                      </div>
                  </div>
              </div>
          ))}
      </div>
  );
}
