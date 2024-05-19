import React from "react";
import "./profile.css";

import Avatar from "../assets/img/avatar/patient.png";

const PatientCard = () => {
  return (
    <div className="flip-card">
      <div className="flip-card-inner">
        <div className="flip-card-front">
          <div>
            <img
              alt="avatar"
              width="180px"
              height="180px"
              style={{ borderRadius: '50%' }}
              src={Avatar}
            />
          </div>
          <p className="card-title">Bruno Sennar</p>
          <p>Male</p>
        </div>
        <div className="flip-card-back">
          <p>Email: johndoe@gmail.com</p>
          <p>Phone: +022 5454 5252</p>
          <p>Address: 0912 Won Street, Alabama, SY 10001</p>  
        </div>
      </div>
    </div>
  );
};

export default PatientCard;
