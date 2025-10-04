import React from "react";
import { useNavigate } from "react-router-dom";

const ImageCard = ({ image, title, description }) => {
  const navigate = useNavigate();

  return (
    <div className="col-md-4 mb-3">
      <div className="card shadow">
        <img src={image} className="card-img-top" alt={title} />
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <button
            onClick={() => navigate("/book", { state: { service: title } })}
            className="btn btn-success"
          >
            Book Service
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCard;
