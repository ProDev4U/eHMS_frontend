import React, { useState, useEffect, useContext } from "react";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, useTheme } from "@mui/material";
// Components
import Header from "../../../components/Header";
import { TableSeizuresWithActions } from "./TableSeizures";
import LoadingComponent from "../../../components/LoadingComponent";
// Call API to fetch seizure data
import { getSeizuresByPatientId } from "../../../services/seizureService";

const PatientSeizures = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const [seizureData, setSeizureData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          try {
            const tmp_data = await getSeizuresByPatientId(user.id);
            setSeizureData(tmp_data);
          } catch (error) {
              console.error("Error fetching seizure data:", error);
          }
      };

      fetchData();
  }, []);

  return (
    <Box m="20px">
        <Header
        title="Seizure Records"
        subtitle="List of seizures of your treatment"
        />

        {/* GRID */}
        {seizureData.length ? (
          <TableSeizuresWithActions seizureData={seizureData} colors={colors} setSeizureData={setSeizureData} userId={user.id} />
        ) : (
          <LoadingComponent />
        )}
    </Box>
  );
};

export default PatientSeizures;

