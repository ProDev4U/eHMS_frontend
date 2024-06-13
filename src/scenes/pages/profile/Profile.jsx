import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, Grid, TextField, Button, MenuItem, FormControl, Select, InputLabel } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import Header from "../../../components/Header";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Avatar from "react-avatar-edit";
import { updateUserInfoById } from "../../../services/userService";

const Profile = () => {
  const { user, updateUser } = useContext(AuthContext);
  const [birthDate, setBirthDate] = useState(null);
  const avatarSrc = user.avatar ? '/img/avatar/' + user.avatar : '';
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    gender: '',
    birthday: null,
    phoneNumber: '',
    postalCode: '',
    address: '',
    address1: '',
    address2: '',
    avatar: '',
    note: '',
    content: '',
  });

  useEffect(() => {
    if (user) {
      const addressParts = user.address?.split(":::") || ['', ''];
      setBirthDate(user.birthday ? new Date(user.birthday) : null);
      setUserInfo({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        gender: user.gender || '',
        birthday: user.birthday ? new Date(user.birthday) : null,
        phoneNumber: user.phoneNumber || '',
        postalCode: user.postalCode || '',
        address: user.address || '',
        address1: addressParts[0],
        address2: addressParts[1],
        avatar: user.avatar || '',
        note: user.note || '',
        content: '',
      });
    }
  }, [user]);

  const handleClick = async () => {
    const calculatedAge = birthDate ? new Date().getFullYear() - birthDate.getFullYear() : 0;
    const updatedUserInfo = { ...userInfo, age: calculatedAge, birthday: birthDate };
    console.log(updatedUserInfo);
    const res = await updateUserInfoById(user.id, updatedUserInfo);
    if (res.status === 200) {
      toast.success(res.data.message);
      updateUser({...user, ...updatedUserInfo});
    } else {
      toast.warning("Sorry. Your action didn't work. \nTry again.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'address1' || name === 'address2') {
      setUserInfo(prevState => ({
        ...prevState,
        address: prevState.address1 + ':::' + prevState.address2,
        [name]: value
      }));
    } else {
      setUserInfo(prevState => ({ ...prevState, [name]: value }));
    }
  };

  const handleBirthdayChange = (date) => {
    setBirthDate(date);
    setUserInfo(prevState => ({ ...prevState, birthday: date }));
  };

  const onBeforeFileLoad = (elem) => {
    if (elem.target.files[0].size > 11680) {
      alert("File is too big!");
      elem.target.value = "";
    }
  };

  const onImgClose = () => {
    setUserInfo(prevState => ({ ...prevState, content: '' }));
  };

  const onImgCrop = (preview) => {
    setUserInfo(prevState => ({ ...prevState, content: preview }));
  };

  return (
    <Box m="20px">
      <Header title="My Profile" subtitle="Managing your private information" />
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 3, width: '45%' },
              }}
              noValidate
              autoComplete="on"
            >
              <div>
                <TextField
                  required
                  id="firstName"
                  label="First Name"
                  variant="standard"
                  name="firstName"
                  onChange={handleChange}
                  value={userInfo.firstName}
                />
                <TextField
                  required
                  id="lastName"
                  label="Last Name"
                  variant="standard"
                  name="lastName"
                  onChange={handleChange}
                  value={userInfo.lastName}
                />
              </div>
              <div>
                <FormControl variant="standard" sx={{ m: 3, width: '45%' }}>
                  <InputLabel id="gender-label">Gender</InputLabel>
                  <Select
                    labelId="gender-label"
                    id="gender"
                    name="gender"
                    value={userInfo.gender}
                    onChange={handleChange}
                    label="Gender"
                  >
                    <MenuItem value="Male">Male</MenuItem>
                    <MenuItem value="Female">Female</MenuItem>
                  </Select>
                </FormControl>
                <DatePicker
                  selected={birthDate}
                  onChange={handleBirthdayChange}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="Select birth date"
                  customInput={
                    <TextField
                      label="Birth Day"
                      variant="standard"
                      fullWidth
                    />
                  }
                />
              </div>
              <div>
                <TextField
                  required
                  id="phoneNumber"
                  label="Phone Number"
                  variant="standard"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={userInfo.phoneNumber}
                />
                <TextField
                  required
                  id="postalCode"
                  label="Postal Code"
                  variant="standard"
                  name="postalCode"
                  onChange={handleChange}
                  value={userInfo.postalCode}
                />
              </div>
              <div>
                <TextField
                  required
                  id="address1"
                  label="Address"
                  variant="standard"
                  name="address1"
                  onChange={handleChange}
                  value={userInfo.address1}
                />
                <TextField
                  required
                  id="address2"
                  label="Address"
                  variant="standard"
                  name="address2"
                  onChange={handleChange}
                  value={userInfo.address2}
                />
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '80px' }}>
              <Avatar
                width={390}
                height={250}
                onCrop={onImgCrop}
                onClose={onImgClose}
                src={avatarSrc}
                onBeforeFileLoad={onBeforeFileLoad}
              />
            </div>
          </Grid>
          <Grid item xs={12}>
            <Box
              component="form"
              sx={{
                '& .MuiTextField-root': { m: 3, width: '95%' },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                id="outlined-multiline-static"
                label="About Me"
                multiline
                rows={7}
                name="note"
                onChange={handleChange}
                value={userInfo.note}
              />
            </Box>

            <Button variant="contained" color="success" onClick={handleClick} className="pull-right" style={{ marginRight: '60px' }}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Box>
      <ToastContainer autoClose={3000} />
    </Box>
  );
};

export default Profile;
