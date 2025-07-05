import React from "react";

const FilterPrice = ({ onPriceFilterChange, selectedPriceRange }) => {
  const priceRanges = [
    { id: "priceRange1", label: "1.00 - 100.00", count: 10 },
    { id: "priceRange2", label: "100.00 - 300.00", count: 8 },
    { id: "priceRange3", label: "300.00 - 600.00", count: 6 },
    { id: "priceRange4", label: "600.00 - 1,500.00", count: 4 },
    { id: "priceRange5", label: "1,500.00 - 3,000.00", count: 3 },
    { id: "priceRange6", label: "3,000.00 & Above", count: 2 },
  ];

  const handlePriceRangeChange = (range) => {
    onPriceFilterChange(range);
  };

  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterPrice"
        aria-expanded="true"
        aria-controls="filterPrice"
      >
        Price
      </div>
      <ul className="list-group list-group-flush show" id="filterPrice">
        {priceRanges.map(({ id, label, count }) => (
          <li
            key={id}
            className={`list-group-item ${
              selectedPriceRange === id ? "text-dark bg-secondary fw-bold" : "text-muted"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handlePriceRangeChange(id)}
          >
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id={id}
                checked={selectedPriceRange === id}
                onChange={() => handlePriceRangeChange(id)}
              />
              <label className="form-check-label" htmlFor={id}>
                {label} <span className="text-muted">({count})</span>
              </label>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterPrice;
