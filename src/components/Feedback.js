import React, { useState, useEffect } from "react";
import axios from "axios";


const Feedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [notification, setNotification] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch all feedbacks from backend on component mount
  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        setLoading(true);
        const response = await axios.get("http://localhost:5000/api/feedbacks");
        setFeedbacks(response.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err.message);
        setNotification("❌ Failed to load feedbacks.");
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Simple validation
    if (!form.name || !form.email || !form.message) {
      setNotification("❌ Please fill all fields.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:5000/api/feedbacks", form);
      setFeedbacks([response.data, ...feedbacks]); // Add new feedback to top
      setForm({ name: "", email: "", message: "" });
      setNotification("✅ Feedback submitted successfully!");
    } catch (err) {
      console.error("Error submitting feedback:", err.response || err.message);
      const errorMsg = err.response?.data?.error || "Error submitting feedback. Try again!";
      setNotification(`❌ ${errorMsg}`);
    } finally {
      setLoading(false);
      // Hide notification after 4 seconds
      setTimeout(() => setNotification(""), 4000);
    }
  };

  return (
    <div style={{ backgroundColor: "#fffbea", minHeight: "100vh", padding: "2rem" }}>
      <h2 className="text-center mb-4">Feedback</h2>

      {/* Notification */}
      {notification && (
        <div
          style={{
            textAlign: "center",
            marginBottom: "15px",
            color: notification.includes("✅") ? "#155724" : "#721c24",
            backgroundColor: notification.includes("✅") ? "#d4edda" : "#f8d7da",
            padding: "10px",
            borderRadius: "5px",
            fontWeight: "500",
          }}
        >
          {notification}
        </div>
      )}

      {/* Feedback Form */}
      <div
        style={{
          maxWidth: "700px",
          margin: "0 auto",
          padding: "2rem",
          backgroundColor: "#fff",
          borderRadius: "15px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            className="form-control mb-3"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="form-control mb-3"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            required
          />
          <textarea
            placeholder="Message"
            className="form-control mb-3"
            rows="4"
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            required
          />
          <div className="d-flex justify-content-between">
            <button type="submit" className="btn btn-success" disabled={loading}>
              {loading ? "Submitting..." : "Submit Feedback"}
            </button>
            <button type="button" onClick={() => window.history.back()} className="btn btn-secondary">
              ← Back to Home
            </button>
          </div>
        </form>
      </div>

      {/* Display feedbacks */}
      <div className="w-75 mx-auto mt-4">
        {loading && feedbacks.length === 0 && <p>Loading feedbacks...</p>}
        {feedbacks.map((fb, idx) => (
          <div
            key={idx}
            style={{
              borderLeft: "5px solid #ffc107",
              padding: "10px",
              marginBottom: "10px",
              backgroundColor: "#fff",
            }}
          >
            <h5>{fb.name}</h5>
            <p><strong>{fb.email}</strong></p>
            <p>{fb.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Feedback;
