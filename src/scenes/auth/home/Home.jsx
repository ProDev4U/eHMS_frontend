import React, { useState, useEffect, useRef } from 'react';
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
import ForgotPassword from "../../auth/forgotPassword/ForgotPassword";
import "./home.css";  // Ensure CSS for styling the modal

const Home = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const modalRef = useRef();

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseAllModals();
      }
    };

    if (isLoginOpen || isRegisterOpen || isForgotPasswordOpen) {
      document.addEventListener('mousedown', handleOutsideClick);
    } else {
      document.removeEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [isLoginOpen, isRegisterOpen, isForgotPasswordOpen]);

  const handleLoginClick = () => {
    setIsLoginOpen(true);
  };

  const handleCloseLoginModal = () => {
    setIsLoginOpen(false);
  };

  const handleRegisterClick = () => {
    setIsRegisterOpen(true);
  };

  const handleCloseRegisterModal = () => {
    setIsRegisterOpen(false);
  };

  const handleForgotPasswordClick = () => {
    setIsLoginOpen(false); // Close the login modal
    setIsForgotPasswordOpen(true);
  };

  const handleCloseForgotPasswordModal = () => {
    setIsForgotPasswordOpen(false);
  };

  const handleCloseAllModals = () => {
    setIsLoginOpen(false);
    setIsRegisterOpen(false);
    setIsForgotPasswordOpen(false);
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
          <div className="modal-content" ref={modalRef}>
            <button className="close-button" onClick={handleCloseLoginModal}>
              &times;
            </button>
            <Login onForgotPasswordClick={handleForgotPasswordClick} />
          </div>
        </div>
      )}

      {isRegisterOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <button className="close-button" onClick={handleCloseRegisterModal}>
              &times;
            </button>
            <Register />
          </div>
        </div>
      )}

      {isForgotPasswordOpen && (
        <div className="modal-overlay">
          <div className="modal-content" ref={modalRef}>
            <button className="close-button" onClick={handleCloseForgotPasswordModal}>
              &times;
            </button>
            <ForgotPassword />
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
