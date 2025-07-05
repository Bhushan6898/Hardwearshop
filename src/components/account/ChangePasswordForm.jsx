import React, { useState } from "react";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { ReactComponent as IconCheck } from "bootstrap-icons/icons/check.svg"; // Import the check icon
import useAdmin from "../../hooks/useUser";

const ChangePasswordForm = () => {
  const { updatepassword } = useAdmin();
  const [formData, setFormData] = useState({
    currentPassword: "",
    password: "",
    confirmPassword: "",
  });
 

  // Track if passwords match
  const passwordsMatch = formData.password && formData.password === formData.confirmPassword;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
 

    const password = formData.password;
    try {
      await updatepassword({ password });

      // Clear the form after successful submission
      // setFormData({
      //   currentPassword: "",
      //   password: "",
      //   confirmPassword: "",
      // });
    } catch (error) {
      console.error("Password update failed", error);
    } finally {
     // Always set submitting to false after completion
    }
  };

  return (
    <div className="card border-info">
      <h6 className="card-header bg-info text-white">
        <i className="bi bi-key"></i> Change Password
      </h6>
      <div className="card-body">
        <form
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="currentPassword">Current Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <IconShieldLock />
              </span>
              <input
                name="currentPassword"
                type="password"
                className="form-control"
                placeholder="******"
                value={formData.currentPassword}
                onChange={handleInputChange}
                required
                maxLength="20"
                minLength="8"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="password">New Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <IconShieldLock />
              </span>
              <input
                name="password"
                type="password"
                className="form-control"
                placeholder="******"
                value={formData.password}
                onChange={handleInputChange}
                required
                maxLength="20"
                minLength="8"
              />
            </div>
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword">Confirm New Password</label>
            <div className="input-group">
              <span className="input-group-text">
                <IconShieldLock />
              </span>
              <input
                name="confirmPassword"
                type="password"
                className={`form-control ${
                  passwordsMatch ? "is-valid" : formData.confirmPassword ? "is-invalid" : ""
                }`}
                placeholder="******"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
                maxLength="20"
                minLength="8"
              />
              {passwordsMatch && (
                <span className="input-group-text text-success">
                  <IconCheck /> {/* OK icon when passwords match */}
                </span>
              )}
            </div>
            {!passwordsMatch && formData.confirmPassword && (
              <div className="invalid-feedback">Passwords do not match</div>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-info d-flex"
           
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordForm;
