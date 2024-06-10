import React from "react";
import SolutionStep from "./SolutionStep";
import "./About.css";

function About() {
  return (
    <div className="about-section" id="about">
      <div className="about-image-content">
        <img src={'/img/bg/doctor-book-appointment.png'} alt="Doctor Group" className="about-image1" />
      </div>

      <div className="about-text-content">
        <h3 className="about-title">
          <span>About Us</span>
        </h3>
        <p className="about-description">
          Welcome to Health Plus, your trusted partner for accessible and personalized healthcare, including specialized services for seizure patients. Our expert doctors offer online consultations and specialized treatments, prioritizing your well-being. Join us on this journey towards managing and overcoming seizures.
        </p>

        <h4 className="about-text-title">Your Solutions</h4>

        <SolutionStep
          title="Choose a Seizure Specialist"
          description="Find your perfect seizure specialist and book with ease at Health Plus. Our expert doctors prioritize your health, offering tailored care specifically for managing and treating seizures."
        />

        <SolutionStep
          title="Make a Schedule"
          description="Choose the date and time that suits you best, and let our dedicated team of seizure specialists ensure your well-being with personalized care designed to effectively manage and control seizures."
        />

        <SolutionStep
          title="Get Your Solutions"
          description="Our experienced seizure specialists are here to provide expert advice and personalized treatment plans, helping you manage and overcome seizures effectively, improving your quality of life."
        />
      </div>
    </div>
  );
}

export default About;
