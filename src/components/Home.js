import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import CarouselComponent from "./CarouselComponent";

const Home = () => {
  const navigate = useNavigate();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");

  const startBooking = () => navigate("/services");
  const goToAbout = () => navigate("/about");
  const goToFeedback = () => navigate("/feedback");

  const toggleHelp = () => {
    const helpText = document.getElementById("helpText");
    if (helpText) helpText.classList.toggle("d-none");
  };

  const handleAdminLogin = () => {
    if (adminPassword === "admin123") {
      alert("Welcome, Admin!");
      navigate("/admindashboard"); // ✅ make sure App.js uses /admin route
    } else {
      alert("Incorrect Password!");
    }
  };

  return (
    <div style={{ backgroundColor: "#fffbe0", minHeight: "100vh", paddingBottom: "50px" }}>
      <div className="container mt-4">
        {/* Heading */}
        <h2
          className="text-center mb-4"
          style={{
            fontFamily: "Merriweather, serif",
            fontSize: "2.8rem",
            fontWeight: "bold",
            color: "#34495e",
          }}
        >
          Srini's Helping Hub
        </h2>

        {/* Top Buttons */}
        <div className="d-flex justify-content-center mb-3">
          <button className="btn btn-primary mx-2" style={{ borderRadius: "20px" }} onClick={goToAbout}>
            About Us
          </button>
          <button className="btn btn-danger mx-2" style={{ borderRadius: "20px" }} onClick={toggleHelp}>
            Help
          </button>
          <button className="btn btn-success mx-2" style={{ borderRadius: "20px" }} onClick={goToFeedback}>
            Feedback
          </button>
        </div>

        <div id="helpText" className="alert alert-info text-center d-none" style={{ marginBottom: "20px" }}>
          Need help? We're here for you! Contact us: ssrinithi@student.tce.edu
        </div>

        {/* Carousel */}
        <CarouselComponent />

        {/* Intro Text */}
        <div style={{ textAlign: "center", margin: "30px 0", fontSize: "1.2rem", color: "#444" }}>
          <p>
            Welcome to Srini's Helping Hub! We connect you with skilled professionals for Gardening, Plumbing,
            Electricity, Pet Caring, and more. Make your home maintenance hassle-free!
          </p>
        </div>

        {/* Customer & Admin Buttons */}
        <div className="text-center mb-5">
          <button
            className="btn btn-info mx-3"
            style={{ padding: "12px 25px", fontSize: "18px", borderRadius: "20px" }}
            onClick={startBooking}
          >
            Customer
          </button>

          <button
            className="btn btn-warning mx-3"
            style={{ padding: "12px 25px", fontSize: "18px", borderRadius: "20px" }}
            onClick={() => setShowAdminLogin(true)}
          >
            Admin
          </button>
        </div>

        {/* Admin Password Input */}
        {showAdminLogin && (
          <div className="text-center mt-3">
            <input
              type="password"
              placeholder="Enter Admin Password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              style={{
                padding: "10px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                marginRight: "10px",
              }}
            />
            <button className="btn btn-dark" onClick={handleAdminLogin} style={{ borderRadius: "10px" }}>
              Login
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
