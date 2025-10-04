// server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// =================== MongoDB Atlas Connection ===================
mongoose
  .connect(
"mongodb+srv://srinithi:sri82nithi@plantportal.iffjj.mongodb.net/?retryWrites=true&w=majority&appName=Plantportal",    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("✅ MongoDB Atlas connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// =================== Schema & Model ===================
const bookingSchema = new mongoose.Schema({
  service: String,
  name: String,
  email: String,
  phone: String,
  address: String,
  date: String,
  image: String,
  status: {
    type: String,
    default: "Pending", // default when customer books
  },
});


const Booking = mongoose.model("Booking", bookingSchema);

const feedbackSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now },
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

// =================== CRUD Routes ===================

// Create
app.post("/api/bookings", async (req, res) => {
  try {
    const newBooking = new Booking(req.body);
    await newBooking.save();
    res.json(newBooking);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Read
app.get("/", (req, res) => {
  res.send("Helping Hub backend is running successfully 🚀");
});

app.get("/api/bookings", async (req, res) => {
  try {
    const bookings = await Booking.find();
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update
app.put("/api/bookings/:id", async (req, res) => {
  try {
    const updated = await Booking.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete
app.delete("/api/bookings/:id", async (req, res) => {
  try {
    await Booking.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// =================== Feedback Schema & Model ===================


// =================== Feedback Routes ===================

// Create feedback
app.post("/api/feedbacks", async (req, res) => {
  try {
    const newFeedback = new Feedback(req.body);
    await newFeedback.save();
    res.json(newFeedback);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all feedbacks
app.get("/api/feedbacks", async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =================== Start Server ===================
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
