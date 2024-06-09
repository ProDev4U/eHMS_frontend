import React from "react";
import DoctorCard from "./DoctorCard";
import "./Doctors.css";

function Doctors() {
  return (
    <div className="doctor-section" id="doctors">
      <div className="dt-title-content">
        <h3 className="dt-title">
          <span>Meet Our Doctors</span>
        </h3>

        <p className="dt-description">
          Meet our exceptional team of specialist doctors, dedicated to
          providing top-notch healthcare services at Health Plus. Trust in their
          knowledge and experience to lead you towards a healthier and happier
          life.
        </p>
      </div>

      <div className="dt-cards-content">
        <DoctorCard
          img={'/img/avatar/profile-1.png'}
          name="Dr. Kathryn Murphy"
          title="General Surgeons"
          stars="4.9"
          reviews="1800"
        />
        <DoctorCard
          img={'/img/avatar/profile-2.png'}
          name="Dr. Jacob Jones"
          title="Hematologists"
          stars="4.8"
          reviews="700"
        />
        <DoctorCard
          img={'/img/avatar/profile-3.png'}
          name="Dr. Jenny Wilson"
          title="Endocrinologists"
          stars="4.7"
          reviews="450"
        />
        <DoctorCard
          img={'/img/avatar/profile-4.png'}
          name="Dr. Albert Flores"
          title="Hematologists"
          stars="4.8"
          reviews="500"
        />
      </div>
    </div>
  );
}

export default Doctors;
