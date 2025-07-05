import React from 'react'

const servies = () => {
  return (
    <div className="container-fluid py-5" id="services">
    <h2
        className="text-center mb-5 display-5"
        style={{
            background: "linear-gradient(to right, #ff7e5f, #feb47b)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            fontWeight: "bold",
            textShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
        }}
    >
        Our Services
    </h2>
    <div className="row">
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow-lg h-100">
                <div className="card-body text-center">
                    <i
                        className="bi bi-tools text-danger"
                        style={{ fontSize: "3rem" }}
                    ></i>
                    <h5 className="card-title mt-3">Tool Rentals</h5>
                    <p className="card-text">
                        Rent a variety of professional tools for your projects at affordable rates.
                    </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow-lg h-100">
                <div className="card-body text-center">
                    <i
                        className="bi bi-paint-bucket text-primary"
                        style={{ fontSize: "3rem" }}
                    ></i>
                    <h5 className="card-title mt-3">Paint Mixing</h5>
                    <p className="card-text">
                        Get custom paint shades mixed on demand for your home or commercial projects.
                    </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow-lg h-100">
                <div className="card-body text-center">
                    <i
                        className="bi bi-hammer text-warning"
                        style={{ fontSize: "3rem" }}
                    ></i>
                    <h5 className="card-title mt-3">Expert Repair</h5>
                    <p className="card-text">
                        Professional repair services for your hardware tools and equipment.
                    </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow-lg h-100">
                <div className="card-body text-center">
                    <i
                        className="bi bi-box-seam text-success"
                        style={{ fontSize: "3rem" }}
                    ></i>
                    <h5 className="card-title mt-3">Packaging Supplies</h5>
                    <p className="card-text">
                        Wide range of packaging materials for shipping, storage, or moving needs.
                    </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow-lg h-100">
                <div className="card-body text-center">
                    <i
                        className="bi bi-people text-info"
                        style={{ fontSize: "3rem" }}
                    ></i>
                    <h5 className="card-title mt-3">Custom Consultations</h5>
                    <p className="card-text">
                        Get professional advice and recommendations for your construction projects.
                    </p>
                </div>
            </div>
        </div>
        <div className="col-md-6 col-lg-4 mb-4">
            <div className="card border-0 shadow-lg h-100">
                <div className="card-body text-center">
                    <i
                        className="bi bi-lightbulb text-secondary"
                        style={{ fontSize: "3rem" }}
                    ></i>
                    <h5 className="card-title mt-3">Energy Solutions</h5>
                    <p className="card-text">
                        Find energy-efficient solutions, including lighting and solar installations.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>

  )
}

export default servies
