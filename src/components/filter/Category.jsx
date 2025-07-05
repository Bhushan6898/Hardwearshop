import React from "react";

const FilterCategory = ({ onCategorySelect, selectedCategory }) => {
  const categories = [
    "Nuts & Bolts",
    "Cement",
    "Agricultural Tools",
    "Building Materials",
    "Plumbing Supplies",
    "Electrical Tools",
    "Paint & Finishing Supplies",
    "Hand Tools",
    "Power Tools",
    "Gardening Tools",
    "Safety Equipment",
    "Machinery & Equipment",
    "Welding Supplies",
    "Automotive Tools",
    "Fasteners",
    "Adhesives & Sealants",
    "Cleaning Supplies",
    "Flooring Materials",
    "Lighting Fixtures",
    "Roofing Materials",
    "Waterproofing Solutions",
    "Pipes & Fittings",
    "Insulation Materials",
    "Wood & Timber",
    "Glass & Glazing",
    "Metal Fabrication Tools",
  ];

  const handleCategorySelect = (category) => {
    onCategorySelect(category); // Notify parent component
  };

  return (
    <div className="card mb-3">
      <div
        className="card-header fw-bold text-uppercase accordion-icon-button"
        data-bs-toggle="collapse"
        data-bs-target="#filterCategory"
        aria-expanded="true"
        aria-controls="filterCategory"
      >
        Categories
      </div>
      <ul className="list-group list-group-flush" id="filterCategory">
        <li
          className={`list-group-item ${
            selectedCategory === null ? "text-dark bg-secondary fw-bold" : "text-muted"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleCategorySelect(null)}
        >
          All
        </li>
        {categories.map((category, index) => (
          <li
            key={index}
            className={`list-group-item ${
              selectedCategory === category
                ? "text-dark fw-bold"
                : "text-muted"
            }`}
            style={{ cursor: "pointer" }}
            onClick={() => handleCategorySelect(category)}
          >
            {category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FilterCategory;
