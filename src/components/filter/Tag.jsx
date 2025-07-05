import React from "react";
import { Link } from "react-router-dom";

const FilterTag = () => {
  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterTag"
        aria-expanded="true"
        aria-controls="filterTag"
      >
        Product Tags
      </div>
      <div className="card-body show" id="filterTag">
        <Link to="/category/plumbing" className="btn btn-sm btn-outline-info me-2 mb-2">
          Plumbing
        </Link>
        <Link to="/category/tools" className="btn btn-sm btn-outline-secondary me-2 mb-2">
          Tools
        </Link>
        <Link to="/category/electronics" className="btn btn-sm btn-outline-success me-2 mb-2">
          Electronics
        </Link>
        <Link to="/category/maintenance" className="btn btn-sm btn-outline-danger me-2 mb-2">
          Maintenance
        </Link>
        <Link to="/category/safety-gear" className="btn btn-sm btn-outline-dark me-2 mb-2">
          Safety Gear
        </Link>
        <Link to="/category/lighting" className="btn btn-sm btn-outline-primary me-2 mb-2">
          Lighting
        </Link>
        <Link to="/category/accessories" className="btn btn-sm btn-outline-warning me-2 mb-2">
          Accessories
        </Link>
      </div>
    </div>
  );
};

export default FilterTag;
