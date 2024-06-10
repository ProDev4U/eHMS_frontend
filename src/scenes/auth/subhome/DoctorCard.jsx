import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";

function DoctorCard(props) {
  const renderStars = (stars) => {
    const starElements = [];
    for (let i = 0; i < stars; i++) {
      starElements.push(
        <FontAwesomeIcon
          key={i}
          icon={faStar}
          style={{ color: "#F7BB50" }}
        />
      );
    }
    return starElements;
  };

  return (
    <div className="dt-card" style={{ margin: '20px' }}>
      <img src={props.img} alt={props.name} className="dt-card-img" />
      <p className="dt-card-name">{props.name}</p>
      <p className="dt-card-title">{props.title}</p>
      <div className="dt-card-stars">
        {renderStars(Math.round(props.stars))}
      </div>
    </div>
  );
}

export default DoctorCard;
