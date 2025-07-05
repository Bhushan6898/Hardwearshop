import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ReactComponent as IconShieldLock } from "bootstrap-icons/icons/shield-lock.svg";
import { ReactComponent as IconEmail } from "bootstrap-icons/icons/envelope.svg";
import useAdmin from './../../hooks/useUser';
import 'bootstrap/dist/css/bootstrap.min.css';
import LoadingPage from "../../lodingPage";
import Switch from "react-switch";  // Import Switch component

const SignInPage = () => {
  const { Login, verification, getUsers, genrateotp } = useAdmin();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    otp: ''
  });

  const [isPasswordMode, setIsPasswordMode] = useState(true);  // Switch state to toggle between Password/OTP
  const [otpGenerated, setOtpGenerated] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    verification();
    getUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading
    try {
      if (isPasswordMode || formData.otp) {
        await Login(formData);
      } else {
        const response = await genrateotp(formData);
        if (response.status === 200) {
          setOtpGenerated(true);
          setFormData((prevData) => ({
            email: prevData.email,
            password: '',
            otp: ''
          }));
        } else {
          console.error("Failed to generate OTP:", response);
        }
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="container-fluid mt-5">
      {loading && <LoadingPage />}
      <div className="row justify-content-center">
        <div className="col-lg-8 col-md-8 col-sm-12">
          <h2
            className="text-center mb-4"
            style={{
              color: 'white', // Sets the text color to white
              fontWeight: 'bold',
              textShadow: '2px 2px 5px rgba(0, 0, 0, 0.3)',
            }}
            
          >
            Sign In
          </h2>
          <div className="card shadow-lg border-0" style={{ borderRadius: '20px' }}>
            <div className="card-body p-4">
              <form onSubmit={handleSubmit} className="needs-validation" noValidate>
                {/* Switch for Password/OTP */}
                <div className="d-flex justify-content-center mb-4">
                  <label className="me-2"> Use OTP</label>
                  <Switch
                    checked={isPasswordMode}
                    onChange={() => setIsPasswordMode(!isPasswordMode)}
                    offColor="#ff7e5f"
                    onColor="#feb47b"
                    width={60}
                    height={30}
                    uncheckedIcon={false}
                    checkedIcon={false}
                  />
                  <label className="ms-2">Use Password </label>
                </div>

                {/* Email field */}
                <div className="form-group mb-4">
                  <label htmlFor="email" className="form-label">Email</label>
                  <div className="input-group">
                    <span className="input-group-text bg-primary text-white">
                      <IconEmail />
                    </span>
                    <input
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter a valid email address.</div>
                  </div>
                </div>

                {/* Password field */}
                {isPasswordMode && (
                  <div className="form-group mb-4">
                    <label htmlFor="password" className="form-label text-primary">Password</label>
                    <div className="input-group">
                      <span className="input-group-text bg-primary text-white">
                        <IconShieldLock />
                      </span>
                      <input
                        type="password"
                        name="password"
                        className="form-control"
                        placeholder="Enter your password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        minLength="8"
                        maxLength="20"
                      />
                      <div className="invalid-feedback">Please enter a valid password (8-20 characters).</div>
                    </div>
                  </div>
                )}

                {/* OTP field */}
                {otpGenerated ? (
                  <div className="form-group mb-4">
                    <label htmlFor="otp" className="form-label text-primary">OTP</label>
                    <input
                      type="text"
                      name="otp"
                      className="form-control"
                      placeholder="Enter your OTP"
                      value={formData.otp}
                      onChange={handleChange}
                      required
                    />
                    <div className="invalid-feedback">Please enter the OTP sent to your email.</div>
                  </div>
                ) : null}


                <div className="d-grid mb-4">
                  <button type="submit" className="btn btn-success">
                    {otpGenerated ? "Verify OTP" : isPasswordMode ? "Sign In" : "Generate OTP"}
                  </button>
                </div>
              </form>

              <div className="mt-3 text-center">
                <Link to="/account/signup" className="me-3">Create your account</Link>
                <Link to="/account/forgotpassword">Forgot password?</Link>
              </div>

              <div className="text-center mt-4">
                <Link to="/" className="text-decoration-none">
                  <button type="button" className="btn btn-secondary">
                    <i className="bi bi-house-fill me-2"></i>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for Loading Overlay */}
      <style>
        {`
          .loading-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            display: flex;
            align-items: center;
            justify-content: center;
            background: rgba(255, 255, 255, 0.8);
            z-index: 1050;
          }
        `}
      </style>
    </div>
  );
};

export default SignInPage;
