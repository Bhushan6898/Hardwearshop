import React, { Suspense, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.js";
import "bootstrap-icons/font/bootstrap-icons.css";
import TopMenu from "./components/TopMenu";
import Header from "./components/Header";
import Footer from "./components/Footer";
import "./App.min.css";
import { appRoutes } from "./routes";
import { useSelector } from "react-redux";
import SignInView from "./views/account/SignIn";
import SignUpView from "./views/account/SignUp";
import LandingPage from "./components/landingpage";
import { OrbitProgress } from "react-loading-indicators";
import SmartTalkIcon from "./components/SmartTalkIcon";

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // Loading state to track the authentication check and delay
  const [loading, setLoading] = useState(true);
  const [showSidebarAndNavbar, setShowSidebarAndNavbar] = useState(false);

  useEffect(() => {
    // Simulate a delay for checking authentication
    const timeout = setTimeout(() => {
      setShowSidebarAndNavbar(isAuthenticated); // Update visibility of sidebar and navbar
      setLoading(false);  // Once the check is done, set loading to false
    }, 1000); // 2 seconds delay

    return () => clearTimeout(timeout); // Clean up the timeout on unmount
  }, [isAuthenticated]);

  // Show loading spinner while checking authentication status with delay
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
         <OrbitProgress color="#32cd32" size="medium" text="Loading" textColor="" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <React.Fragment>
        {/* Show header and top menu if authenticated */}
        {showSidebarAndNavbar && (
          <>
            <Header />
            <TopMenu />
           
          </>
        )}
        <Suspense fallback={<div className="text-white text-center mt-3">Loading...</div>}>
          <Routes>
            <Route path="/account/signup" element={<SignUpView />} />
            <Route path="/signin" element={<SignInView />} />
            {/* If not authenticated, show LandingPage for any route */}
            {!isAuthenticated ? (
              <Route path="*" element={<LandingPage />} />
            ) : (
              appRoutes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))
            )}
            {/* Redirect to home if authenticated, otherwise show LandingPage */}
            <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
            <Route path="" element={isAuthenticated ? <Navigate to="/home" /> : <LandingPage />} />
          </Routes>
        </Suspense>
        {/* Show footer if authenticated */}
        {showSidebarAndNavbar && <Footer />}
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
