import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const NewPassword = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: '',
  });

  // Parse the query parameters from the URL
  const query = new URLSearchParams(location.search);
  const token = query.get('token');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePasswordReset = async (e) => {
    e.preventDefault();
    const { password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/api/auth/new-password', { token, password });
      if (response.data.success) {
        toast.success("Password reset successfully!", { autoClose: 2000 });
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        toast.warning('Sorry. Your action didn\'t work. \nTry again.');
      }
    } catch (error) {
      toast.error('Network Error!');
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
      <div className="heading">Reset Password</div>
      <form onSubmit={handlePasswordReset} className="form">
        <input
          required
          className="input"
          type="password"
          name="password"
          pattern="^(?=.*[A-Za-z])(?=.*\d).{8,}$"
          title="Password must contain at least one letter, one number, and one special character, and be at least 8 characters long"
          placeholder="New Password"
          onChange={handleChange}
        />
        <input
          required
          className="input"
          type="password"
          name="confirmPassword"
          pattern="^(?=.*[A-Za-z])(?=.*\d).{8,}$"
          title="Password must contain at least one letter, one number, and one special character, and be at least 8 characters long"
          placeholder="Confirm New Password"
          onChange={handleChange}
        />
        <div style={{ display: 'flex', gap: '10px' }}>
          <button className="login-button" type="submit">Reset Password</button>
        </div>
      </form>
      <ToastContainer autoClose={2000} />
    </div>
  );
};

export default NewPassword;
