import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, Grid, useTheme, TextField } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import AvatarEditor from "../../../components/AvatarEditor";
// API Calls
import { getUserById } from "../../../services/userService";

const Profile = () => {
  const theme = useTheme();
  const user = useContext(AuthContext);
  const colors = tokens(theme.palette.mode);
  const [imgContent, setImgContent] = useState("");
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    gender: "",
    age: 18,
    phoneNumber: "",
    postalCode: "",
    address1: "",
    address2: "",
    rank: "",
    avatar: "",
    note: ""
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (user?.id) {
          console.log(user);
          const tmp_data = await getUserById(user.id);
          setUserInfo(tmp_data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
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
                '& .MuiTextField-root': { m: 3, width: '40%' },
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
                <TextField
                  required
                  id="gender"
                  label="Gender"
                  variant="standard"
                  name="gender"
                  onChange={handleChange}
                  value={userInfo.gender}
                />
                <TextField
                  id="age"
                  label="Age"
                  variant="standard"
                  type="number"
                  name="age"
                  onChange={handleChange}
                  value={userInfo.age}
                  InputLabelProps={{
                    shrink: true,
                  }}
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
              <div>
                <TextField
                  required
                  id="rank"
                  label="Rank"
                  variant="standard"
                  name="rank"
                  onChange={handleChange}
                  value={userInfo.rank}
                />
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <AvatarEditor avatar={imgContent} setImgContent={setImgContent} />
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
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Profile;
