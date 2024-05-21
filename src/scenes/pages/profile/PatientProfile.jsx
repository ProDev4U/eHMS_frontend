import React, { useState } from "react";
import { Box, Grid, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import TextField from '@mui/material/TextField';
import AvatarEditor from "../../../components/AvatarEditor";

const PatientProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [avatarUrl, setAvatarUrl] = useState("");
  
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
                  defaultValue="" 
                  variant="standard"
                />
                <TextField
                  required
                  id="lastName"
                  label="Last Name"
                  defaultValue=""
                  variant="standard"
                />
              </div>
              <div>
                <TextField
                  required
                  id="gender"
                  label="Gender"
                  defaultValue=""
                  variant="standard"
                />
                <TextField
                  id="age"
                  label="Age"
                  defaultValue={"18"}
                  variant="standard"
                  type="number"
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
                  defaultValue=""
                  variant="standard"
                />
                <TextField
                  required
                  id="postalCode"
                  label="Postal Code"
                  defaultValue=""
                  variant="standard"
                />
              </div>
              <div>
                <TextField
                  required
                  id="address"
                  label="Address"
                  defaultValue=""
                  variant="standard"
                />
                <TextField
                  required
                  id="addressOther"
                  label="Address"
                  defaultValue=""
                  variant="standard"
                />
              </div>
              <div>
                <TextField
                  required
                  id="Rank"
                  label="Rank"
                  defaultValue=""
                  variant="standard"
                />
              </div>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <AvatarEditor avatarUrl={avatarUrl} setAvatarUrl={setAvatarUrl} />
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
                defaultValue=""
              />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default PatientProfile;
