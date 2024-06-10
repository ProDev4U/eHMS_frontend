import React from "react";
import InformationCard from "./InformationCard";
import { faHeartPulse, faTruckMedical, faTooth } from "@fortawesome/free-solid-svg-icons";
import "./Info.css";

function Info() {
  return (
    <div className="info-section" id="services">
      <div className="info-title-content">
        <h3 className="info-title">
          <span>What We Do</span>
        </h3>
        <p className="info-description">
          We bring healthcare to your convenience, offering a comprehensive
          range of on-demand medical services tailored to your needs. Our
          platform allows you to connect with experienced online doctors who
          provide expert medical advice, issue online prescriptions, and offer
          quick refills whenever you require them.
        </p>
      </div>

      <div className="info-cards-content">
        <InformationCard
          title="Seizure Management"
          description="Our Seizure Management service is dedicated to providing comprehensive care for individuals with seizure disorders. We offer personalized treatment plans tailored to each patient's needs, including medication management, lifestyle adjustments, and ongoing monitoring."
          icon={faTruckMedical}
        />

        <InformationCard
          title="Diagnostic Checkup"
          description="Our Diagnostic Checkup service utilizes advanced medical technology to accurately diagnose and evaluate seizure disorders. From EEGs (electroencephalograms) to MRI scans, our team of specialists ensures thorough and precise assessments to guide treatment decisions."
          icon={faHeartPulse}
        />

        <InformationCard
          title="Medication Therapy"
          description="Our Medication Therapy service aims to optimize seizure control and minimize side effects through carefully managed medication regimens. Our neurologists work closely with patients to prescribe the most effective medications and adjust dosages as needed to achieve optimal outcomes."
          icon={faTooth}
        />
      </div>
    </div>
  );
}

export default Info;
