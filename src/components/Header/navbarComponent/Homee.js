 function Homee() {
    return(
      <div className="container d-flex justify-content-center align-items-center vh-100">
      <div className="card shadow-lg p-3 bg-white rounded" style={{ minWidth: "600px" }}>
        
        {/* Header */}
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

        {/* Match Content */}
        <div className="card-body row text-center">
          {/* Home Team */}
          <div className="col">
            <div>
              <div className="rounded-circle bg-light p-3 shadow-sm" style={{ width: "80px", height: "80px", margin: "auto" }}>
                <img src="https://assets.codepen.io/285131/whufc.svg" alt="West Ham" width="50" />
              </div>
              <h5 className="mt-2">West Ham</h5>
            </div>
          </div>

          {/* Match Details */}
          <div className="col">
            <p className="text-muted">12 Aug at <strong>19:00</strong></p>
            <h3>
              <span className="text-primary">2</span> : <span className="text-secondary">0</span>
            </h3>
            <p className="text-warning">72'</p>
            <p className="text-muted">Referee: <strong>Joseph Hicks</strong></p>

            <div className="d-flex justify-content-center gap-2 my-2">
              <button className="btn btn-outline-dark">1.48</button>
              <button className="btn btn-outline-dark">4.98</button>
              <button className="btn btn-outline-dark">8.24</button>
            </div>
            
            <button className="btn btn-primary">Place a Bet</button>
          </div>

          {/* Away Team */}
          <div className="col">
            <div>
              <div className="rounded-circle bg-light p-3 shadow-sm" style={{ width: "80px", height: "80px", margin: "auto" }}>
                <img src="https://assets.codepen.io/285131/chelsea.svg" alt="Chelsea" width="50" />
              </div>
              <h5 className="mt-2">Chelsea</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
    );
    
  }
  


  export default Homee;