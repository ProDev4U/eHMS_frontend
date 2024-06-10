import React, { useState } from "react";
import { PrivacyPolicy } from "./service_policy"; // Import Privacy Policy data
import "./service_policy.css";

function PrivacyPolicyComponent() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const numSections = PrivacyPolicy.length;

  // Navigate to the previous section
  const handlePrevSection = () => {
    setSectionIndex((prevIndex) => (prevIndex === 0 ? numSections - 1 : prevIndex - 1));
  };

  // Navigate to the next section
  const handleNextSection = () => {
    setSectionIndex((prevIndex) => (prevIndex === numSections - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="review-section" id="privacy-policy">
      <div className="rw-text-content">
        <p className="rw-text-title">
          <span className="rw-text-num">Privacy Policy</span>
        </p>
        <div className="rw-text-desc">{PrivacyPolicy[sectionIndex].title}</div>
        <div className="rw-text-format">
          <p className="rw-review">{PrivacyPolicy[sectionIndex].content}</p>
        </div>
        <div className="rw-authors">
          <div className="rw-btns">
            <button className="rw-next-btn" onClick={handlePrevSection}>
              ←
            </button>
            <button className="rw-next-btn" onClick={handleNextSection}>
              →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPolicyComponent;
