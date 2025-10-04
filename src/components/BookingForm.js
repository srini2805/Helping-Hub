import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addBooking } from "../reducers/bookingReducer";

const serviceDetails = {
  Gardening: "Professional gardening services including lawn care, trimming, planting, and landscaping.",
  Plumbing: "Expert plumbing solutions for leaks, pipe installation, and maintenance.",
  Electricity: "Safe and reliable electrical services including wiring, repair, and appliance support.",
  "Pet Caring": "Friendly and trustworthy pet care services including walking, feeding, and grooming.",
  "Buy Household Items": "Quick and convenient delivery of essential household items.",
  "Buy Medicines": "Safe and reliable purchase and delivery of medicines to your home.",
};

const BookingForm = () => {
  const { serviceName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    image: null,
  });

  const [notification, setNotification] = useState("");

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // create payload (convert image to name only for now)
      const payload = {
        ...formData,
        service: decodeURIComponent(serviceName),
        image: formData.image ? formData.image.name : null,
      };

      // save to backend (MongoDB)
      const response = await axios.post("http://localhost:5000/api/bookings", payload);

      // save to Redux
      dispatch(addBooking(response.data));

      setNotification("✅ Service booked successfully!");
      setFormData({ name: "", email: "", phone: "", address: "", date: "", image: null });
    } catch (err) {
      console.error(err);
      setNotification("❌ Error booking service. Try again!");
    }
  };

  // ---------- styles ----------
  const containerStyle = {
    backgroundColor: "#fffbe0",
    minHeight: "100vh",
    padding: "40px 20px",
  };

  const formWrapperStyle = {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "30px",
    borderRadius: "15px",
    backgroundColor: "#fff8dc",
    boxShadow: "0 4px 15px rgba(0,0,0,0.1)",
  };

  const infoBoxStyle = {
    maxWidth: "600px",
    margin: "0 auto 30px auto",
    padding: "20px",
    borderRadius: "12px",
    backgroundColor: "#fff3cd",
    borderLeft: "6px solid #ffc107",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)",
    fontSize: "0.95rem",
    lineHeight: "1.5",
  };

  const submitButtonStyle = {
    backgroundColor: "#ffb300",
    borderColor: "#ffa000",
    color: "#fff",
    marginRight: "10px",
  };

  const backButtonStyle = {
    marginLeft: "10px",
  };

  return (
    <div style={containerStyle}>
      <h2
        style={{
          textAlign: "center",
          marginBottom: "20px",
          fontWeight: "bold",
          color: "#34495e",
        }}
      >
        Book {decodeURIComponent(serviceName)}
      </h2>

      {/* Service Details Box */}
      <div style={infoBoxStyle}>
        {serviceDetails[decodeURIComponent(serviceName)] ||
          "Please fill out the form below to book this service."}
      </div>

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

      <div style={formWrapperStyle}>
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label>Name</label>
            <input
              type="text"
              className="form-control"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Email</label>
            <input
              type="email"
              className="form-control"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Phone</label>
            <input
              type="tel"
              className="form-control"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group mb-3">
            <label>Address</label>
            <textarea
              className="form-control"
              name="address"
              rows="3"
              value={formData.address}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          <div className="form-group mb-3">
            <label>Upload Image</label>
            <input
              type="file"
              className="form-control-file"
              name="image"
              onChange={handleChange}
            />
          </div>

          <div className="form-group mb-4">
            <label>Preferred Date & Time</label>
            <input
              type="datetime-local"
              className="form-control"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>

          <div className="text-center">
            <button type="submit" className="btn" style={submitButtonStyle}>
              Submit
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={backButtonStyle}
              onClick={() => navigate("/")}
            >
              ← Back to Home
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
