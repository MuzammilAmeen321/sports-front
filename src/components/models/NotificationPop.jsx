import { useState, useEffect } from "react";
import axios from "axios";

import {  Link } from "react-router-dom";
const API_URL = "https://matc.matchdada.com/public/api";

const Notifications = () => {
  const [notificationCount, setNotificationCount] = useState(0);
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

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
      
          setNotificationCount(response.data.notificationCount);
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

  return (
    <div>
      <Link to="/notifications" className="text-center text-decoration-none text-white icon-link position-relative">
        <i className="fa fa-bell fs-1"></i>
        {notificationCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {notificationCount}
            <span className="visually-hidden">unread notifications</span>
          </span>
        )}
      </Link>

      {/* Toast Notification */}
      {toast.show && (
        <div className={`toast toast-${toast.type} position-fixed top-0 end-0 m-3`}>
          {toast.message}
        </div>
      )}
    </div>
  );
};

export default Notifications;
