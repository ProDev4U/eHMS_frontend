// pages/Home.js

import React from 'react';
import Navbar from '../subhome/Navbar';
import Hero from "../subhome/Hero";
import Info from "../subhome/Info";
import About from "../subhome/About";
import TermsOfServiceComponent from "../subhome/TermsOfServiceComponent";
import PrivacyPolicyComponent from "../subhome/PrivacyPolicyComponent";
import Doctors from "../subhome/Doctors";
import Footer from "../subhome/Footer";

const Home = () => {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      <Info />
      <About />
      <TermsOfServiceComponent />
      <PrivacyPolicyComponent />
      <Doctors />
      <Footer />
    </div>
  );
};

export default Home;
