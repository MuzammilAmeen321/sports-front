import { useEffect, useState } from "react";
import './headerSlider.css';

const MatchCountdown = () => {
  const matchDate = new Date("2027-12-02T19:00:00");
  const [timeLeft, setTimeLeft] = useState(getTimeLeft(matchDate));

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeLeft(matchDate));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  function getTimeLeft(targetDate) {
    const now = new Date();
    const difference = targetDate - now;
    return {
      days: Math.max(0, Math.floor(difference / (1000 * 60 * 60 * 24))),
      hours: Math.max(0, Math.floor((difference / (1000 * 60 * 60)) % 24)),
      minutes: Math.max(0, Math.floor((difference / (1000 * 60)) % 60)),
      seconds: Math.max(0, Math.floor((difference / 1000) % 60)),
    };
  }

  return (
    <div className="match-container">
    
          <div className="team-info">
            <div className="teams">
              <div className="team">
                <img 
                  src="https://th.bing.com/th/id/OIP.1Kpf8g560qHd5ehuF--QRwHaHa?rs=1&pid=ImgDetMain" 
                  alt="Football Team" 
                  className="team-logo" 
                />
                <span>Football Team</span>
              </div>
              <div className="vs">VS</div>
              <div className="team">
                <img 
                  src="https://th.bing.com/th/id/OIP.tHK994kv74amise73FjI5gHaHa?w=626&h=626&rs=1&pid=ImgDetMain" 
                  alt="Super Team Club" 
                  className="team-logo" 
                />
                <span>Super Team Club</span>
              </div>
            </div>
          </div>

          {/* Right Side - Countdown */}
          <div className="match-time">
            <h3 className="text-dark">Next Match</h3>
            <ul className="countdown">
              <li><span>{timeLeft.days}</span> Days</li>
              <li><span>{timeLeft.hours}</span> Hours</li>
              <li><span>{timeLeft.minutes}</span> Minutes</li>
              <li><span>{timeLeft.seconds}</span> Seconds</li>
            </ul>
            <p>Match Date: 12/02/2027 - 19:00 PM</p>
          </div>
        </div>
  );
};

export default MatchCountdown;
