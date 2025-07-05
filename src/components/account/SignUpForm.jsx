import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import useAdmin from "../../hooks/useUser"; // Custom hook for form submission
import LoadingPage from "../../lodingPage";
const SignUpForm = () => {
  const { AddClientDetails, verification, Notification } = useAdmin();
  const [loading, setLoading] = useState(false);
  useEffect(() => {

    verification();
    Notification();
  }, []);
  // Local state to hold form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    mobileNumber: "",
    email: "",
    password: "",
    country: "",
    city: "",
    state: ""
  });

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); 
    try {
     
      const response = await AddClientDetails(formData);
        if (response.status === 200) {
          setLoading(false)
         
        } else {
          console.error("failed to create new client:", response);
        }
      
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); 
    }
  };

  return (
    <div className="container my-4 d-flex justify-content-center  border ">
       {loading && <LoadingPage />}
      <div className="col-md-8 col-lg-12 p-4 rounded  " >
        <form onSubmit={handleSubmit}>
          <div className="form-group mb-3">
            <label htmlFor="firstName" className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="Enter First Name"
              required
            />
          </div>

          {/* Last Name */}
          <div className="form-group mb-3">
            <label htmlFor="lastName" className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Enter Last Name"
              required
            />
          </div>

          {/* Mobile Number */}
          <div className="form-group mb-3">
            <label htmlFor="mobileNumber" className="form-label">Mobile Number</label>
            <input
              type="tel"
              className="form-control"
              id="mobileNumber"
              name="mobileNumber"
              value={formData.mobileNumber}
              onChange={handleChange}
              placeholder="Enter Mobile Number"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Email"
              required
            />
          </div>

          {/* Password */}
          <div className="form-group mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              required
            />
          </div>

          {/* Address Information */}
          <div className="row">
            <div className="col-md-6 mb-3">
              <label htmlFor="city" className="form-label">City</label>
              <input
                type="text"
                className="form-control"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Enter City"
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <label htmlFor="state" className="form-label">State</label>
              <input
                type="text"
                className="form-control"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                placeholder="Enter State"
                required
              />
            </div>
            <div className="col-md-12 mb-3">
              <label htmlFor="country" className="form-label">Country</label>
              <input
                type="text"
                className="form-control"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Enter Country"
                required
              />
            </div>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-primary w-100 mt-3">
            Create Account
          </button>

          {/* Sign In Link */}
          <div className="text-center mt-4">
            <Link to="/signin" className="text-decoration-none" >
              Already have an account? Sign In
            </Link>
          </div>
          <div className="text-center mt-4">
            <Link to="/" className="text-decoration-none">
              <button type="button" className="btn btn-secondary">
                <i className="bi bi-house-fill me-2"></i>
              </button>
            </Link>
          </div>
        </form>
      </div>
    </div>


  );
};

export default SignUpForm;
