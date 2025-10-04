import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// ====== Components ======
import Home from "./components/Home";
import Services from "./components/Services";
import BookingForm from "./components/BookingForm";
import About from "./components/About";
import Feedback from "./components/Feedback";
import AdminLogin from "./components/Adminlogin";
import AdminDashboard from "./components/AdminDashboard";

function App() {
  return (
    <Router>
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Customer Flow */}
        <Route path="/services" element={<Services />} />
        <Route path="/book/:serviceName" element={<BookingForm />} />

        {/* Info Pages */}
        <Route path="/about" element={<About />} />
        <Route path="/feedback" element={<Feedback />} />

        {/* Admin Flow */}
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admindashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
