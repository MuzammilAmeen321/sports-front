import React, { useState } from "react";
import "../style/contactUs.css"; // Import the CSS file
import VerticalNav from "../components/verticleNav";
import axios from "axios";
import Navbar from "../components/Header/header";

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  

  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleContact = async () => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        console.error("No auth token found.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:8000/api/contact",
        formData, // Sending form data
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response.data)
      
      // Clear form fields after successful submission
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
      });

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container-fluid">
      <Navbar />
      <section className="contact_us">
        <div className="container">
          <div className="row">
            <div className="col-md-10 offset-md-1">
              <div className="contact_inner">
                <div className="row">
                  <div className="col-md-10">
                    <div className="contact_form_inner">
                      <div className="contact_field">
                        <h3>Contact Us</h3>
                        <p>Feel free to contact us any time. We will get back to you as soon as we can!</p>

                        <input
                          type="text"
                          name="name"
                          className="form-control form-group"
                          placeholder="Name"
                          value={formData.name}
                          onChange={handleChange}
                        />

                        <input
                          type="email"
                          name="email"
                          className="form-control form-group"
                          placeholder="Email"
                          value={formData.email}
                          onChange={handleChange}
                        />

                        <input
                          type="tel"
                          name="phone"
                          className="form-control form-group"
                          placeholder="Phone"
                          value={formData.phone}
                          onChange={handleChange}
                        />

                        <textarea
                          name="message"
                          className="form-control form-group"
                          placeholder="Message"
                          value={formData.message}
                          onChange={handleChange}
                        ></textarea>

                        <button className="btn mt-2 h-button" onClick={handleContact}>Send</button>
                      </div>
                    </div>
                  </div>

                  <div className="col-md-2">
                    <div className="right_conatct_social_icon d-flex align-items-end">
                      <div className="socil_item_inner d-flex">
                        <li><a href="#"><i className="fab fa-facebook-square"></i></a></li>
                        <li><a href="#"><i className="fab fa-instagram"></i></a></li>
                        <li><a href="#"><i className="fab fa-twitter"></i></a></li>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="contact_info_sec">
                  <h4>Contact Info</h4>
                  <div className="d-flex info_single align-items-center fs-5 ">
                    <i className="fas fa-headset"></i>
                    <span class=" fs-5" >+91 8009 054294</span>
                  </div>
                  <div className="d-flex info_single align-items-center fs-5">
                    <i className="fas fa-envelope-open-text"></i>
                    <span className="fs-5">info@flightmantra.com</span>
                  </div>
                  <div className="d-flex info_single align-items-center fs-5">
                    <i className="fas fa-map-marked-alt"></i>
                    <span className="fs-5">1000+ Travel partners and 65+ Service city across India, USA, Canada & UAE</span>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>
      <VerticalNav />
    </div>
  );
};

export default ContactUs;
