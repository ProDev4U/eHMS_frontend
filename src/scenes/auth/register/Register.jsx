// Register.js
import React, { useState } from 'react';
import { useNavigate  } from "react-router-dom";
import authService from '../../../services/authService';
import GenderSelector from '../../../components/GenderSelector';

import './register.css'
import { toast, ToastContainer } from 'react-toastify';

const Register = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    gender: '',
    email: '',
    password: '',
    passwordConfirm: '',
    phoneNumber: '',
    postalCode: '',
    address: '',
    addressOther: '',
    policy: false
  });

  const [selectedGender, setSelectedGender] = useState(null);

  const handleGenderChange = (gender) => {
    setSelectedGender(gender);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handlePolicyChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(selectedGender === null){
      toast.error("Please select gender");
      return;
    }   
    if(formData.password !== formData.passwordConfirm){
      toast.error("Password and Confirm Password must be same");
      return;
    }
    if(formData.policy !== true){
      toast.error("You must agree to the terms of service and privacy policy");
      return;
    }
    if(formData.addressOther !== ''){
      formData.address = formData.address + ':::' + formData.addressOther;
    }
    try {
      const res = await authService.register({
        ...formData,
        gender : selectedGender
      });
      if(res) {
        toast.success(res.message, { autoClose: 3000 })
        setTimeout(() => {
          // Redirect to login page or display success message
          navigate("/login")
        }, 3000);
      }
      toast.warning(res.message);
    } catch (error) {
      // Handle registration error
      toast.error(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="heading">Sign Up</div>
      <form onSubmit={handleSubmit} className="form">
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            required
            className="input"
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="First Name"
          />
          <input
            required
            className="input"
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Last Name"
          />
        </div>
        <div className='row'>
          <div className='col'>
            <input required className="input" type="number" name="age" min='1' max='100' value={formData.age} onChange={handleChange} placeholder="Age" />
          </div>
          <div className='col pull-right'>
            <GenderSelector selectedGender={selectedGender} onGenderChange={handleGenderChange} />
          </div>
        </div>
        <input required className="input" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="E-mail" />  
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            required
            className="input"
            type="password"
            name="password"
            minLength={8}
            value={formData.password}
            onChange={handleChange}
            pattern="^(?=.*[A-Za-z])(?=.*\d).{8,}$"
            title="Password must contain at least one letter, one number, and one special character, and be at least 8 characters long"
            placeholder="Password"
          />
          <input required className="input" type="password" name="passwordConfirm" value={formData.passwordConfirm} onChange={handleChange} placeholder="Password Confirm" />
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <input
            required
            className="input"
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Phone Number"
          />  
          <input
            required
            className="input"
            type="text"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
            placeholder="Postal Code"
          />
        </div>
        <input required className="input" type="text" name="address" value={formData.address} onChange={handleChange} placeholder="Address" />
        <input className="input" type="text" name="addressOther" value={formData.addressOther} onChange={handleChange} placeholder="Other Address" />
        <div>
          <div class="remember-me">
            <label class="custom_check mr-2 mb-0 d-inline-flex remember-me"> 
              <input type="checkbox" name="policy" value={formData.policy} onChange={handlePolicyChange} />
              <span class="checkmark"></span>
              <small>I agree to the <a href="javascript:;">&nbsp; terms of service </a>&nbsp; and <a href="javascript:;">&nbsp; privacy policy </a></small>
            </label>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="login-button" onClick={() => navigate('/login')}>I have already account.</button>
          <button className="login-button" type="submit">Sign Up</button>
        </div>
      </form>
      <span className="agreement"><a href="#">Copyright@2024 || Johnny Smiss</a></span>
      <ToastContainer autoClose={3000} />
    </div>
  );
};

export default Register;
