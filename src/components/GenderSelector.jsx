import React from 'react';
import './genderSelector.css'

const GenderSelector = ({ selectedGender, onGenderChange }) => {
  const handleGenderChange = (event) => {
    onGenderChange(event.target.value);
  };

  return (
    <div className="radio-input">
      <label>
        <input
          type="radio"
          name="gender"
          className="i_female"
          value="Female"
          checked={selectedGender === "Female"}
          onChange={handleGenderChange}
        />
        <div className="card female">
          <div className="logo">♀️</div>
          <div className="title">Female</div>
        </div>
      </label>

      <label>
        <input
          type="radio"
          name="gender"
          className="i_male"
          value="Male"
          checked={selectedGender === "Male"}
          onChange={handleGenderChange}
        />
        <div className="card male">
          <div className="logo">♂️</div>
          <div className="title">Male</div>
        </div>
      </label>
    </div>
  );
};

export default GenderSelector;
