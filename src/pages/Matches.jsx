import { useState, useEffect } from "react";
import VerticleNav from "../components/verticleNav";
import Navbar from "../components/Header/header";
import axios from "axios";
import "../style/matches.css";
import DownArrow from '../assets/icons/downarrow.png';
import CreateMatchModal from "../components/models/createNewMatch";



const AllMatches = () => {
  const [matchType, setMatchType] = useState("all");
  const [matches, setMatches] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [currentUser, setCurrentUser] = useState(null);

  const API_URL = "https://matc.matchdada.com/public/api"; // Correct API URL
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setCurrentUser(parsedUser);
      } catch (error) {
        console.error("Error parsing user data:", error);
      }
    }
  }, []);
  useEffect(() => {
    const fetchMatches = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found.");
        setToast({ show: true, message: "No authentication token found. Please log in.", type: "error" });
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/matches`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setMatches(response.data);
      } catch (error) {
        console.error("Error fetching matches:", error);
      }
    };

    fetchMatches();
  }, []);


  const filteredMatches = matchType === "all" ? matches : matches.filter(match => match.status === matchType);
/* Notificarion update for request sent */
const handleClick = (status, matchId, userId) => {
  const token = localStorage.getItem("authToken");
  const storedUser = localStorage.getItem("user");

  if (!token) {
    console.error("No auth token found.");
    setToast({
      show: true,
      message: "No authentication token found. Please log in.",
      type: "error",
    });
    return;
  }

  if (!storedUser) {
    console.error("No user data found in localStorage.");
    setToast({
      show: true,
      message: "No user data found. Please log in.",
      type: "error",
    });
    return;
  }

  // Parse user data from localStorage to get sender_id
  const parsedUser = JSON.parse(storedUser);
  const senderId = parsedUser.id; // Assuming 'id' is the unique identifier of the current user

  // Prepare data to be sent to the backend
  const notificationData = {
    user_id: userId,
    match_id: matchId,
    notification: status,
    sender_id: senderId, // Include sender_id here (from the current authenticated user)
  };
  console.log(notificationData);
  // Send the notification update request
  axios
    .post(`${API_URL}/push-notification`, notificationData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((response) => {
      console.log("Notification updated:", response.data);
      setToast({
        show: true,
        message: "Notification updated successfully!",
        type: "success",
      });
    })
    .catch((error) => {
      console.error("Error updating notification:", error);
      setToast({
        show: true,
        message: "Failed to update notification. Try again.",
        type: "error",
      });
    });
};


  return (
    <>
      {location.pathname !== "/" && <Navbar />}
      <div className="container m-auto">
        <div className="row">
          <div className="col-12">
           

            <div className="container m-auto">
              <div className="row">
                <div className="col-12">
                  <div className="row p-2 cards-container">
                  {filteredMatches.map((match) => (
                      <div key={match.id} className="col-lg-4 col-md-6 col-12 mb-3">
                        <div className="card bg-white text-black p-2 text-center shadow-sm h-100">
                          <div className="d-flex justify-content-between align-items-center mb-1">
                            <div className="d-flex align-items-center">
                              <i className="fas fa-baseball-bat-ball fa-1x text-warning me-1"></i>
                              <p className="mb-0 fw-bold">{match.category}</p>
                            </div>
                            <p className="text-muted small mb-0">Starts: {match.match_datetime}</p>
                          </div>

                          <div className="row align-items-center">
                            <div className="col-4 text-center">
                              <p className="mb-0 text-danger fw-bold">
                                Overs <br />
                                <span className="text-muted small">{match.overs}</span>
                              </p>
                            </div>
                            <div className="col-4 text-right">
                              <p className="mb-1 small">{match.user.username}</p>
                              <span className={`badge small ${
                                match.match_status === "available" ? "bg-success text-black" :
                                  match.match_status === "booked" ? "bg-danger text-black" :
                                    match.match_status === "live" ? "bg-danger text-black" :
                                      "bg-warning text-black"}`}>
                                {match.match_status === "available" ? "Available" :
                                  match.match_status === "booked" ? "Booked" :
                                    match.match_status === "live" ? "Live" :
                                      "Pending"}
                              </span>
                            </div>
                            <div className="col-4 text-center d-flex align-items-center justify-content-around">
                              <p className="mb-0 text-danger fw-bold">
                                Bid <br />
                                <span className="text-muted small">${match.match_bid}</span>
                              </p>
                              <p className="mb-0 text-danger fw-bold">
                                Security <br />
                                <span className="text-muted small">{match.security === "1" ? `${match.security_amount ?? "0"}` : "No"}</span>
                              </p>
                            </div>

                            <div className="col-12 text-center">
                              <p className="mb-0  text-danger fw-bold d-flex justify-content-center">
                                Venue:
                                <span className="text-muted mx-1 small">${match.venue}</span>
                              </p>
                            </div>
                          </div>

                          <div className="card-footer bg-light mt-1">
  {/* For "available" matches — show "Request" button */}
  {match.match_status === "available" && (
    <a
      href="#"
      className="btn btn-request w-100 text-decoration-none"
      onClick={() => handleClick(true, match.id, match.user_id)}
    >
      Request
    </a>
  )}

  {/* For "pending" matches — show "Cancel" button if the user owns the match, otherwise show "Pending" */}
  {match.match_status === "pending" &&
    (match.user_id === currentUser?.id ? (
      <span
        className="btn btn-danger w-100 text-decoration-none"
        onClick={() => handleClick(false, match.id, match.user_id)}
      >
        Cancel
      </span>
    ) : (
      <a
        href="#"
        className="btn btn-warning w-100 text-decoration-none"
        onClick={() => handleClick(false, match.id, match.user_id)}
      >
        Cancel
      </a>
    ))}

  {/* For "booked" matches — show "Request" button */}
  {match.match_status === "booked" && (
    <a href="#" className="btn btn-danger w-100 text-decoration-none">
      Details
    </a>
  )}

  {/* For "live" matches — show "Score" button */}
  {match.match_status === "live" && (
    <a href="/scoreboard" className="btn btn-score w-100 text-decoration-none">
      Score
    </a>
  )}
</div>

                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AllMatches;