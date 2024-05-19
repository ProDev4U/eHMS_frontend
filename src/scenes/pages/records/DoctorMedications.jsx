import React, { useState, useEffect, useContext } from "react";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, MenuItem, FormControl, InputLabel, Select, Button, useTheme } from "@mui/material";
// Components
import Header from "../../../components/Header";
import LoadingComponent from "../../../components/LoadingComponent";
import { TableMedicationsWithActions } from "./TableMedications";
// Call API to fetch seizure data
import { getMedicationByPatientId } from "../../../services/medicationService";
import { getAllPatients } from "../../../services/userService";

const DoctorMedications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const [medicationData, setMedicineData] = useState([]);
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState();
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const tmp_data = await getAllPatients();
        setPatients(tmp_data);
        setPatientId(tmp_data?.[0]?.id);
      } catch (error) {
        console.error("Error fetching patients data:", error);
      }
    };  
    
    fetchPatients();
  }, []);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getMedicationByPatientId(patientId);
        setMedicineData(tmp_data);
      } catch (error) {
        console.error("Error fetching seizure data:", error);
      }
    };
    fetchData();
  }, [patientId]);
  
  const handlePatientChange = (event) => {
    setPatientId(event.target.value);
  };
  
  return (
    <Box m="20px">
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Medication Records" subtitle="List of medications for your patient" />
        <Box>
          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Patient</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={patientId}
              label="Patient"
              onChange={handlePatientChange}
            >
              {
                patients?.map((item) => (
                  <MenuItem key={item.id} value={item.id}>
                    {item.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
      </Box>

      {/* GRID */}
      {medicationData.length ? (
        <TableMedicationsWithActions medicationData={medicationData} colors={colors} setMedicationData={setMedicineData} userId={patientId} />
      ) : (
        <LoadingComponent />
      )}
    </Box>
  );
};

export default DoctorMedications;
