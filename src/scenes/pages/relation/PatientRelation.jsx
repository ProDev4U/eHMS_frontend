import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
// Components
import Header from "../../../components/Header";
import { PatientTableRelation } from "./TableRelation";
// API Calls
import { getRelationsByPatientId } from "../../../services/relationService";
import { getAllDoctors } from "../../../services/userService";

const PatientRelation = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const colors = tokens(theme.palette.mode);
  const [relations, setRelations] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getRelationsByPatientId(user.id);
        setRelations(tmp_data);
        console.log("relations => ",tmp_data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchDoctors = async () => {
      try {
        const tmp_data = await getAllDoctors();
        setDoctors(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchDoctors();
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="My Doctors" subtitle="List of contacted doctors. Here you can show their information." />
      <PatientTableRelation relations={relations} setRelations={setRelations} colors={colors} doctors={doctors} userId={user.id} />
    </Box>
  );
};

export default PatientRelation;
