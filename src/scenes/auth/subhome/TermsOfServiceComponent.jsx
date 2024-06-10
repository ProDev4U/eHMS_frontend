import React, { useState } from "react";
import { TermsOfService } from "./service_policy"; // Import Terms of Service data
import "./service_policy.css";

function TermsOfServiceComponent() {
  const [sectionIndex, setSectionIndex] = useState(0);
  const numSections = TermsOfService.length;

  // Navigate to the previous section
  const handlePrevSection = () => {
    setSectionIndex((prevIndex) => (prevIndex === 0 ? numSections - 1 : prevIndex - 1));
  };

  // Navigate to the next section
  const handleNextSection = () => {
    setSectionIndex((prevIndex) => (prevIndex === numSections - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="review-section" id="terms-of-service">
      <div className="rw-text-content">
        <p className="rw-text-title">
          <span className="rw-text-num">Terms of Service</span>
        </p>
        <div className="rw-text-desc">{TermsOfService[sectionIndex].title}</div>
        <div className="rw-text-format">
          <p className="rw-review">{TermsOfService[sectionIndex].content}</p>
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

export default TermsOfServiceComponent;
