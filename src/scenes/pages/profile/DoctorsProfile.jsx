import React, { useEffect, useState } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
// API Calls
import { getAllDoctors } from "../../../services/userService";  

const DoctorsProfile = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getAllDoctors();
        setDoctors(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Doctor Profile" subtitle="Managing the Doctor Identity" />
      <Box
        height="75vh"
      >
        
      </Box>
    </Box>
  );
};

export default DoctorsProfile;
