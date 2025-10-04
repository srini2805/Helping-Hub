import React from "react";

const About = () => {
  return (
    <div style={{ backgroundColor: "#fff8dc", minHeight: "100vh", padding: "2rem" }}>
      <h2 className="text-center mb-4">About Us</h2>
      <p className="lead text-center">
        Helping Hub connects you with skilled professionals for gardening, plumbing, and electrical services. We're committed to making home maintenance easy and reliable.
      </p>
      <div className="text-center mt-5">
        <button onClick={() => window.history.back()} className="btn btn-secondary">
          ← Back to Home
        </button>
      </div>
    </div>
  );
};

export default About;
