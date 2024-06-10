import React, { useEffect, useState } from "react";
import DoctorCard from "./DoctorCard";
import "./Doctors.css";

import { getAllDoctors } from "../../../services/userService";

function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getAllDoctors();
        setDoctors(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const getRandomStars = () => {
    return (Math.random() * 2 + 3).toFixed(1);
  };

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
        {doctors.slice(0, 3).map((doctor, index) => (
          <DoctorCard
            key={index}
            img={doctor.avatar}
            name={doctor.name}
            title={doctor.title}
            stars={doctor.stars ? doctor.stars : getRandomStars()}
          />
        ))}
      </div>
    </div>
  );
}

export default Doctors;
