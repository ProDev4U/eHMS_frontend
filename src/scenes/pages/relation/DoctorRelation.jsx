import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
// Components
import Header from "../../../components/Header";
import { DoctorTableRelation } from "./TableRelation";
// API Calls
import { getRelationsByDoctorId } from "../../../services/relationService";

const DoctorRelation = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const colors = tokens(theme.palette.mode);
  const [relations, setRelations] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getRelationsByDoctorId(user.id);
        setRelations(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Doctor Profile" subtitle="Managing the Doctor Identity" />
      <DoctorTableRelation relations={relations} setRelations={setRelations} colors={colors}/>
    </Box>
  );
};

export default DoctorRelation;
