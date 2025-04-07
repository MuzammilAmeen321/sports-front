import { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://matc.matchdada.com/public/api";

const Notifications = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });
  const [notifications, setNotifications] = useState([]);
  const [isPopupVisible, setPopupVisible] = useState(false);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found.");
        setToast({
          show: true,
          message: "No authentication token found. Please log in.",
          type: "error",
        });
        return;
      }

      try {
        const response = await axios.get(`${API_URL}/getUserNotifications`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        console.log("API response:", response.data);

        setNotificationCount(response.data.notificationCount);
        setNotifications(response.data.notifications || []);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
        setToast({
          show: true,
          message: "Failed to load notifications.",
          type: "error",
        });
      }
    };

    fetchNotifications();
  }, []);

  const togglePopup = () => {
    setPopupVisible(!isPopupVisible); // Toggle visibility of the notification popup
  };

  const handleAccept = (id) => {
    console.log(`Accepted notification with id: ${id}`);
    // Handle accept logic (e.g., update notification status in backend)
  };

  const handleReject = (id) => {
    console.log(`Rejected notification with id: ${id}`);
    // Handle reject logic (e.g., update notification status in backend)
  };

  return (
    <div>
      {/* Bell Icon with Notification Count */}
      <span
        className="text-center text-decoration-none text-white icon-link position-relative"
        onClick={togglePopup}
      >
        <i className="fa fa-bell fs-4 mt-1"></i>
        {notificationCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notificationCount}
            <span className="visually-hidden">unread notifications</span>
          </span>
        )}
      </span>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type} position-fixed top-0 end-0 m-3`}>
          {toast.message}
        </div>
      )}

      {/* Floating Popup with Notifications */}
      {isPopupVisible && (
        <div className="popup-container position-fixed top-50 start-50 translate-middle p-3 shadow-lg bg-white rounded">
          <div className="popup-header d-flex justify-content-between align-items-center">
            <h5>Notifications</h5>
            <button
              onClick={togglePopup}
              className="btn-close"
              aria-label="Close"
            ></button>
          </div>

          <div className="notifications-list">
            {notifications && notifications.length > 0 ? (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className="notification-card d-flex align-items-center p-3 mb-2 border rounded"
                >
                  <img
                    src={notification.logo} // Assuming you have logo image URL
                    alt="Logo"
                    className="notification-logo me-3"
                    width="50"
                    height="50"
                  />
                  <div className="notification-body flex-grow-1">
                    <h6>{notification.title}</h6>
                    <p>{notification.description}</p>
                    <p><strong>Match Date:</strong> {notification.match_date}</p>
                    <p><strong>Category:</strong> {notification.category}</p>
                    <p><strong>Bid Amount:</strong> {notification.bid_amount}</p>
                    <p><strong>Venue:</strong> {notification.venue}</p>
                  </div>
                  <div className="notification-actions d-flex flex-column justify-content-between">
                    <button
                      className="btn btn-success mb-2"
                      onClick={() => handleAccept(notification.id)}
                    >
                      Accept
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleReject(notification.id)}
                    >
                      Reject
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <p>No notifications available.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Notifications;
