import React from "react";
import { Link } from "react-router-dom";

const TopSection = () => {
  return (
    <div className="top-section">
      <div className="d-flex justify-content-center">
        <Link className="btn btn-outline-warning m-2" to="/home">
          Add Recipe
        </Link>
        <Link className="btn btn-outline-success m-2" to="/view">
          View Recipe List
        </Link>
      </div>
      <div className="bar"></div>
    </div>
  );
};

export default TopSection;
