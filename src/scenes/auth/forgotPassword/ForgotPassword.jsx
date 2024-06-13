import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authService from '../../../services/authService';
import { ToastContainer, toast } from 'react-toastify';

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await authService.forgotPassword(formData);
      if (res) {
        toast.info(res.message, { autoClose: 2000 });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.warning('Failed to send reset link');
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="form-container">
      <div className="heading">Forgot Password</div>
      <form onSubmit={handleSubmit} className="form">
        <input
          required
          className="input"
          type="email"
          name="email"
          placeholder="E-mail"
          onChange={handleChange}
          style={{ marginRight: '200px' }}
        />
        <button className="login-button" type="submit">Send Reset Link</button>
      </form>
      <span className="agreement">
        <a href="#">Copyright@2024 || Johnny Smiss</a>
      </span>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default ForgotPassword;
