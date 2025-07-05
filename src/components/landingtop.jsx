import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LandingTopMenu = () => {
  const [navbarToggled, setNavbarToggled] = useState(false);

  // This function will toggle the navbar state
  const handleToggle = () => {
    setNavbarToggled(!navbarToggled);
  };

  return (
    <nav
      className={`navbar navbar-expand-lg navbar-dark p-0 fixed-top ${
        navbarToggled ? 'bg-secondary' : 'bg-transparent'  // Set background based on toggle state
      }`}
      style={{ right: 0, top: 0 }}
    >
      <div className="container-fluid">
        {/* The navbar toggler (hamburger icon) */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded={navbarToggled ? 'true' : 'false'}
          aria-label="Toggle navigation"
          style={{ position: 'absolute', right: 20, top: 4,borderColor: 'black', }}
          onClick={handleToggle} // Toggle the navbar state on click
        >
          <span className="navbar-toggler-icon" style={{
      backgroundImage: `url("data:image/svg+xml;charset=utf8,%3Csvg viewBox='0 0 30 30' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath stroke='black' stroke-width='2' stroke-linecap='round' stroke-miterlimit='10' d='M4 7h22M4 15h22M4 23h22'/%3E%3C/svg%3E")`,
    }}/>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto"> {/* ms-auto for right alignment */}
           
            <li className="nav-item">
              <a  className="nav-link"  href="#about"style={{ color: "black", fontWeight: "bold" }}
              >  About Us</a>
               
              
            </li>
            <li className="nav-item">
              <a className="nav-link"href="#services" style={{ color: "black", fontWeight: "bold" }}
              > Services</a>
               
              
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#contact" style={{ color: "black", fontWeight: "bold" }}
              > Contact Us</a>
               
              
            </li>

           

            <li className="nav-item">
              <Link className="nav-link" to="/signin" style={{ color: "black", fontWeight: "bold" }}
              >
                Sign In
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/account/signup" style={{ color: "black", fontWeight: "bold" }}
              >
                Sign Up
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default LandingTopMenu;
