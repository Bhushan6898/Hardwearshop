import React from 'react'
import './loading.css'
import { BlinkBlur } from 'react-loading-indicators'
const lodingPage = () => {
  return (
    <div className="loading-container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <BlinkBlur color="#32cd32" size="medium" text="Loading" textColor="" />
      </div>
    </div>

  )
}

export default lodingPage




{/* <div className="loading-container">
    <div
      aria-label="Orange and tan hamster running in a metal wheel"
      role="img"
      className="wheel-and-hamster"
    >
      <div className="wheel"></div>
      <div className="hamster">
        <div className="hamster__body">
          <div className="hamster__head">
            <div className="hamster__ear"></div>
            <div className="hamster__eye"></div>
            <div className="hamster__nose"></div>
          </div>
          <div className="hamster__limb hamster__limb--fr"></div>
          <div className="hamster__limb hamster__limb--fl"></div>
          <div className="hamster__limb hamster__limb--br"></div>
          <div className="hamster__limb hamster__limb--bl"></div>
          <div className="hamster__tail"></div>
        </div>
      </div>
      <div className="spoke"></div>
      <h3 className="loading-text">Loading...</h3> {/* Loading Text Positioned at Bottom of Circle */}
   // </div >
  //</div > */}