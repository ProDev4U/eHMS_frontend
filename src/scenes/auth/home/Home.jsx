// pages/Home.js

import React, { useState } from 'react';
import Navbar from '../subhome/Navbar';
import Hero from "../subhome/Hero";
import Info from "../subhome/Info";
import About from "../subhome/About";
import TermsOfServiceComponent from "../subhome/TermsOfServiceComponent";
import PrivacyPolicyComponent from "../subhome/PrivacyPolicyComponent";
import Doctors from "../subhome/Doctors";
import Footer from "../subhome/Footer";
import Login from "../../auth/login/Login";
import Register from "../../auth/register/Register";
import "./home.css";  // Ensure CSS for styling the modal

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleCloseModal = () => {
    setIsLoginOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  return (
    <div className="home-section">
      <Navbar onLoginClick={handleLoginClick} onRegisterClick={handleRegisterClick} />
      <Hero />
      <Info />
      <About />
      <TermsOfServiceComponent />
      <PrivacyPolicyComponent />
      <Doctors />
      <Footer />

      {isLoginOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>
              &times;
            </button>
            <Login />
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseRegisterModal}>
              &times;
            </button>
            <Register />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
