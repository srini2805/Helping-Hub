import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const navigate = useNavigate();

  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bookings");
      setBookings(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/bookings/${id}`, { status });
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteBooking = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/bookings/${id}`);
      fetchBookings();
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Inline styles
  const styles = {
    container: {
      minHeight: "100vh",
      padding: "20px 40px",
      backgroundColor: "#f0fdf4",
      fontFamily: "Segoe UI, Tahoma, Geneva, Verdana, sans-serif",
    },
    topBar: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: "30px",
    },
    heading: {
      fontSize: "2rem",
      fontWeight: "bold",
      color: "#1f2937",
    },
    homeIcon: {
      width: "40px",
      height: "40px",
      cursor: "pointer",
      transition: "transform 0.2s",
    },
    tableContainer: {
      overflowX: "auto",
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    },
    th: {
      padding: "12px 15px",
      border: "1px solid #d1d5db",
      backgroundColor: "#4ade80",
      color: "#ffffff",
      fontWeight: "bold",
      textAlign: "center",
    },
    td: {
      padding: "12px 15px",
      border: "1px solid #d1d5db",
      textAlign: "center",
    },
    rowEven: { backgroundColor: "#e6fffa" },
    rowHover: { backgroundColor: "#d1fae5" },
    startBtn: {
      backgroundColor: "#facc15",
      color: "#1f2937",
      padding: "6px 12px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 500,
      margin: "0 5px",
    },
    deleteBtn: {
      backgroundColor: "#ef4444",
      color: "white",
      padding: "6px 12px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: 500,
      margin: "0 5px",
    },
  };

  return (
    <div style={styles.container}>
      {/* Top Bar */}
      <div style={styles.topBar}>
        <h2 style={styles.heading}>Admin Dashboard</h2>
        <img
          src="/home.png"
          alt="Home"
          style={styles.homeIcon}
          onClick={() => navigate("/")}
          onMouseOver={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
          onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
        />
      </div>

      {/* Table */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Service</th>
              <th style={styles.th}>Customer</th>
              <th style={styles.th}>Date</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((b, index) => (
              <tr
                key={b._id}
                style={index % 2 === 0 ? styles.rowEven : {}}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#d1fae5")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = index % 2 === 0 ? "#e6fffa" : "white")
                }
              >
                <td style={styles.td}>{b.service}</td>
                <td style={styles.td}>{b.name}</td>
                <td style={styles.td}>{b.date}</td>
                <td style={styles.td}>{b.status || "Pending"}</td>
                <td style={styles.td}>
                  <button
                    style={styles.startBtn}
                    onClick={() =>
                      updateStatus(
                        b._id,
                        b.status === "Pending" ? "In Progress" : "Completed"
                      )
                    }
                  >
                    {b.status === "Pending" ? "Start" : "Complete"}
                  </button>
                  <button style={styles.deleteBtn} onClick={() => deleteBooking(b._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;
