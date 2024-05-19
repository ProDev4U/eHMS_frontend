import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import TextField from '@mui/material/TextField';

const DoctorProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  return (
    <Box m="20px">
      <Header title="My Profile" subtitle="Manage your private information" />
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2.5, width: '60ch' },
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
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2.5, width: '60ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <div>
          <TextField
            id="outlined-multiline-static"
            label="About Me"
            multiline
            rows={4}
            defaultValue=""
          />
        </div>
      </Box>
      <Box
        component="form"
        sx={{
          '& .MuiTextField-root': { m: 2.5, width: '60ch' },
        }}
        noValidate
        autoComplete="on"
      >
        <TextField
          id="outlined-controlled"
          label="Controlled"
        />
        <TextField
          id="outlined-uncontrolled"
          label="Uncontrolled"
          defaultValue="foo"
        />
      </Box>
    </Box>
  );
};

export default DoctorProfile;
