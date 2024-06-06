import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from '@mui/material';
import authService from '../../../services/authService';
import { ToastContainer, toast } from 'react-toastify';

const ResetPasswordDialog = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    if (formData.newPassword !== formData.confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    try {
      const res = await authService.resetPassword(formData);
      toast.success(res.message);
      onClose();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Reset Password</DialogTitle>
      <DialogContent>
        <TextField
          required
          margin="dense"
          id="currentPassword"
          label="Current Password"
          type="password"
          fullWidth
          name="currentPassword"
          onChange={handleChange}
          value={formData.currentPassword}
        />
        <TextField
          required
          margin="dense"
          id="newPassword"
          label="New Password"
          type="password"
          fullWidth
          name="newPassword"
          onChange={handleChange}
          value={formData.newPassword}
          inputProps={{
            minLength: 8,
            pattern: "^(?=.*[A-Za-z])(?=.*\\d).{8,}$",
            title: "Password must contain at least one letter, one number, and be at least 8 characters long"
          }}
        />
        <TextField
          required
          margin="dense"
          id="confirmPassword"
          label="Confirm Password"
          type="password"
          fullWidth
          name="confirmPassword"
          onChange={handleChange}
          value={formData.confirmPassword}
          inputProps={{
            minLength: 8,
            pattern: "^(?=.*[A-Za-z])(?=.*\\d).{8,}$",
            title: "Password must contain at least one letter, one number, and be at least 8 characters long"
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary">Confirm</Button>
      </DialogActions>
      <ToastContainer autoClose={2000} />
    </Dialog>
  );
};

export default ResetPasswordDialog;
