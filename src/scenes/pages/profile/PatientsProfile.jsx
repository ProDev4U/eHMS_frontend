import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import PatientCard from "../../../components/PatientCard";

const PatientsProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  

  return (
    <Box m="20px">
      <Header title="Doctor Profile" subtitle="Managing the Doctor Identity" />
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="15px"
        >
          <PatientCard />
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          padding="15px"
        >
          <PatientCard />
        </Box>
      </Box>
    </Box>
  );
};

export default PatientsProfile;
