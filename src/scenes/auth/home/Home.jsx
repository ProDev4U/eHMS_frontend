// pages/Home.js

import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../subhome/Navbar';
import Hero from "../subhome/Hero";
import Info from "../subhome/Info";
import About from "../subhome/About";
import BookAppointment from "../subhome/BookAppointment";
import Reviews from "../subhome/Reviews";
import Doctors from "../subhome/Doctors";
import Footer from "../subhome/Footer";

const Home = () => {
  return (
    <div className="home-section">
      <Navbar />
      <Hero />
      <Info />
      <About />
      <BookAppointment />
      <Reviews />
      <Doctors />
      <Footer />
    </div>
  );
};

export default Home;
