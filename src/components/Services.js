import React from "react";
import { useNavigate } from "react-router-dom";

const services = [
  { title: "Gardening", image: "/images/garden.jpg", description: "Professional gardening services for your home." },
  { title: "Plumbing", image: "/images/plumb.jpg", description: "Expert plumbing solutions at your fingertips." },
  { title: "Electricity", image: "/images/electric.jpg", description: "Safe and reliable electrical services." },
  { title: "Pet Caring", image: "/images/pet.png", description: "Friendly pet care services for your furry friends." },
  { title: "Buy Household Items", image: "/images/household.png", description: "Get essential household items delivered quickly." },
  { title: "Buy Medicines", image: "/images/medicine.png", description: "Purchase medicines safely and conveniently." }
];

const Services = () => {
  const navigate = useNavigate();

  const bookService = (service) => {
    navigate(`/book/${encodeURIComponent(service)}`);
  };

  const goHome = () => {
    navigate("/");
  };

  return (
    <div
      style={{
        backgroundColor: "#fffbe0", // light yellow
        minHeight: "100vh",
        padding: "40px 20px",
        position: "relative"
      }}
    >
      {/* Back to Home Image */}
      <img
        src="/images/home.png" // replace with your home icon path
        alt="Back to Home"
        onClick={goHome}
        style={{
          position: "absolute",
          top: "20px",
          right: "20px",
          width: "40px",
          height: "35px",
          cursor: "pointer"
        }}
        title="Back to Home"
      />

      <div className="container">
        <h2
          className="text-center mb-5"
          style={{
            fontFamily: "Merriweather, serif",
            fontSize: "2.5rem",
            fontWeight: "bold",
            color: "#34495e"
          }}
        >
          Our Services
        </h2>

        <div className="row">
          {services.map((service, idx) => (
            <div key={idx} className="col-md-4 mb-4 d-flex">
              <div
                className="card flex-fill h-100"
                style={{
                  borderRadius: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
                }}
              >
                <img
                  src={service.image}
                  alt={service.title}
                  className="card-img-top"
                  style={{ height: "200px", objectFit: "cover", borderTopLeftRadius: "12px", borderTopRightRadius: "12px" }}
                />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{service.title}</h5>
                  <p className="card-text">{service.description}</p>
                  <button
                    className="btn btn-info mt-auto"
                    style={{ borderRadius: "20px" }}
                    onClick={() => bookService(service.title)}
                  >
                    Book Service
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
