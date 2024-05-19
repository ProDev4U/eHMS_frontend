import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";

const PatientProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  return (
    <Box m="20px">
      <Header title="My Profile" subtitle="Managing your private information" />
      Here is Patient Profile
    </Box>
  );
};

export default PatientProfile;
