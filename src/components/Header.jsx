import { lazy, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from '../../src/images/mylogo.png'
import background from '../../src/images/back.avif'
import useAdmin from "../hooks/useUser";
import { useSelector } from "react-redux";
import SmartTalkIcon from "./SmartTalkIcon";

const Search = lazy(() => import("./Search"));

const Header = () => {
  const { verification,ProfileDetails, userData, Logout} = useAdmin();
  const NotificationData = useSelector((state) => state.auth.notificationdata);


  useEffect(() => {

    verification();
    ProfileDetails();
  }, []);
  // Logout function
  const handleLogout = () => {
    Logout();
  };
  return (
    <>
      <style>
        {`
        .custom-header-fixed {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          z-index: 1100;
          box-shadow: 0 4px 16px rgba(0,0,0,0.10);
          border-radius: 0 0 24px 24px;
      background-image: url(${background});
          min-height: 150px;
          transition: min-height 0.2s;
          repeat: no-repeat;
          background-size: cover;
          background-position: center;
        }
        .mahalaxmi-title {
          font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
          font-size: 2.2rem;
          font-weight: 800;
          background: orange;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 2px 2px 8px rgba(0,0,0,0.12);
          margin-left: 12px;
          margin-top: 8px;
          margin-bottom: 0;
          white-space: nowrap;
          transition: font-size 0.2s;
          list-style: none;
        }
        .header-logo-img {
          width: 80px;
          height: 80px;
          object-fit: contain;
          margin-right: 12px;
          transition: width 0.2s, height 0.2s;
       
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          background: #fff;
          object-fit: contain;
        }
        .custom-header-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
        }
        .header-left {
          display: flex;
          align-items: center;
          flex: 1 1 0;
        }
        .header-center {
          flex: 2 1 0;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .header-search-col {
          width: 100%;
          max-width: 400px;
        }
        .header-actions {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex: 1 1 0;
        }
        @media (max-width: 576px) {
          .custom-header-fixed {
          
            padding: 2px 0 !important;
            border-radius: 0 0 12px 12px;
          }
          .mahalaxmi-title {
            font-size: 0.95rem;
            margin-left: 4px;
            margin-top: 0;
          }
          .header-logo-img {
            width: 32px;
            height: 32px;
            margin-right: 4px;
          }
          .header-search-col {
            min-width: 20px;
            margin-top: 4px;
            margin-left: 10px;
          }
          .custom-header-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .header-actions {
            margin-top: 1px;
            justify-content: flex-start !important;
          }
        }
        @media (max-width: 768px) {
          .mahalaxmi-title {
            font-size: 1.3rem;
            margin-left: 6px;
            margin-top: 0;
          }
          .header-logo-img {
            width: 50px;
            height: 45px;
            margin-right: 6px;
          }
          .header-search-col {
            min-width: 60px;
            margin-top: 8px;
            margin-left: 20px;
          }
          .custom-header-row {
            flex-direction: column !important;
            align-items: stretch !important;
          }
          .header-actions {
            margin-top: 2px;
            justify-content: flex-start !important;
          }
        }
        `}
      </style>
      <header className="custom-header-fixed p-2 border-bottom">
        <div className="container-fluid">
          <div className="custom-header-row">
            {/* Logo and Title on left */}
            <div className="header-left flex-shrink-0">
              <Link to="/" className="d-flex align-items-center text-decoration-none">
                <img
                  alt="logo"
                  src={logo}
                  className="header-logo-img bg-white "
                />
                <span className="mahalaxmi-title">
                  Mahalaxmi Hardware
                </span>
              </Link>
            </div>
            {/* Search center */}
            <div className="header-center">
              <div className="header-search-col">
                <Search />
              </div>
            </div>
            {/* Actions right */}
            <div className="header-actions ms-2">
              <div className="btn-group me-2">
                <button
                  type="button"
                  className="btn btn-secondary rounded-circle border p-0 overflow-hidden"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                  aria-label="Profile"
                  style={{ width: "35px", height: "35px" }}
                >
                  <img
                    src={userData?.profileImage}
                    alt="Profile"
                    className="img-fluid rounded-circle"
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                </button>
                <Link className="btn rounded-circle border me-2 position-relative" to="/account/notification" style={{ width: "35px", height: "35px", padding: "0",marginLeft:"2px" }}>
                  <i className="bi bi-bell-fill text-white"></i>
                  <div className="position-absolute top-0 start-100 translate-middle badge bg-danger rounded-circle" style={{ fontSize: "0.7rem" }}>
                    {NotificationData.length}
                  </div>
                </Link>
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to="/account/profile">
                      <i className="bi bi-person-square"></i> My Profile
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" onClick={handleLogout}>
                      <i className="bi bi-door-closed-fill text-danger"></i>
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="tolkicon ms-2">
                <SmartTalkIcon />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div style={{ height: "56px" }}></div>
    </>
  );
};

export default Header;
