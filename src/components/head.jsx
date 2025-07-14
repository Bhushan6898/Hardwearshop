

import React from "react";
import { Link } from "react-router-dom";
import logo from "../../src/images/mylogo.png";
import TopMenu from "./TopMenu";
import LandingTopMenu from "./landingtop";

const Header = () => {
  return (
    <>
      <style>
        {`
        .header-attractive {
          position: relative;
          background: white;
          box-shadow: 0 4px 18px rgba(0,0,0,0.08);
          padding: 0.5rem 0 0.2rem 0;
        }
        .header-content {
          position: relative;
          z-index: 2;
        }
        .header-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          justify-content: space-between;
          position: relative;
        }
        .header-left {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: auto;
          margin-left: 0;
          flex: 0 0 auto;
        }
        .header-center {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          top: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          align-items: center;
          justify-content: center;
          width: max-content;
        }
        .site-title {
          font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
          font-size: 2rem;
          font-weight: 900;
          letter-spacing: 2px;
          background: linear-gradient(90deg, #ff512f 0%, #dd2476 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          text-fill-color: transparent;
          margin-left: 14px;
          margin-bottom: 0;
          display: inline-block;
          vertical-align: middle;
          text-shadow: 1px 2px 8px rgba(0,0,0,0.08);
          text-align: center;
          width: 100%;
        }
        .logo-img {
          width: 100px;
          height: 100px;
          border-radius: 12px;
          box-shadow: 0 2px 8px rgba(0,0,0,0.10);
          background: #fff;
          object-fit: contain;
        }
        .header-right {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          flex: 1;
        }
        @media (max-width: 768px) {
          .header-row {
            flex-direction: column;
            align-items: stretch;
          }
          .header-left {
            justify-content: flex-start;
            margin-bottom: 0.5rem;
            width: 100%;
            margin-left: 0;
          }
          .header-center {
            position: static;
            transform: none;
            width: 100%;
            justify-content: center;
            margin-bottom: 0.5rem;
          }
          .site-title {
            font-size: 1.2rem;
            margin-left: 8px;
            text-align: center;
            width: 100%;
          }
          .logo-img {
            width: 60px;
            height: 60px;
          }
          .header-right {
            justify-content: center;
          }
        }
        `}
      </style>
      <header className="header-attractive">
        <div className="container-fluid header-content">
          <div className="header">
            <div className="header-row">
              {/* Logo on left */}
              <div className="header-left">
                <Link
                  to="/"
                  className="d-flex align-items-center text-decoration-none"
                >
                  <img
                    alt="Mahalaxmi Hardware Logo"
                    src={logo}
                    className="logo-img"
                  />
                </Link>
              </div>
              {/* Site title centered */}
              <div className="header-center">
                <span className="site-title">MAHALAXMI HARDWARE</span>
              </div>
              {/* Menu */}
              <div className="header-right">
                <LandingTopMenu />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
