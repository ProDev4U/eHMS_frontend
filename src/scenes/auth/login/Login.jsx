import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authService from '../../../services/authService';
import { useAuth } from '../../../contexts/AuthContext';
import { setAuthToken } from '../../../services/setAuthToken';
import { ToastContainer, toast } from 'react-toastify';

import './login.css'

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.login(formData);
      if (res) {
        toast.info(res.message, { autoClose: 2000 });
        setTimeout(() => {
          // Store token in local storage
          localStorage.setItem('token', res.token);
          // Set token in headers for all requests
          setAuthToken(res.token);
          login(res.user); 
          if (res.user?.role === "Admin")  {
            navigate('/admin/dashboard');
          } else if (res.user?.role === "Doctor") {
            navigate('/doctor/dashboard');
          } else {
            navigate('/patient/relation')
          }
        }, 2000);
      } else {
        toast.warning(res.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="heading">Sign In</div>
      <form onSubmit={handleSubmit} className="form">
        <input required className="input" type="email" name="email" placeholder="E-mail" onChange={handleChange} />
        <input required className="input" type="password" name="password" placeholder="Password" onChange={handleChange} />
        <span><a href="/forgot-password">Forgot Password ?</a></span>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="login-button" onClick={() => navigate('/register')}>I have no account.</button>
          <button className="login-button" type="submit">Sign In</button>
        </div>
      </form>
      <span className="agreement"><a href="#">Copyright@2024 || Johnny Smiss</a></span>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default Login;