import { useState, useEffect, useContext } from "react";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, MenuItem, FormControl, InputLabel, Select, Button, useTheme } from "@mui/material";
// Components
import Header from "../../../components/Header";
import { TableSeizures } from "./TableSeizures";
import LoadingComponent from "../../../components/LoadingComponent";
// Call API to fetch seizure data
import { getSeizuresByPatientId } from "../../../services/seizureService";
import { getRelationsByDoctorId } from "../../../services/relationService";

const DoctorSeizures = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const [seizureData, setSeizureData] = useState([]);
  const [patientId, setPatientId] = useState();
  const [patients, setPatients] = useState([]);
  
  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const tmp_data = await getRelationsByDoctorId(user.id);
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
          const tmp_data = await getSeizuresByPatientId(patientId);
          setSeizureData(tmp_data);
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
        <Header title="Seizure Records" subtitle="List of seizures for your patient" />

        <Box width={200}>
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
                  <MenuItem key={item.patientId} value={item.patientId}>
                    {item.name}
                  </MenuItem>
                ))
              }
            </Select>
          </FormControl>
        </Box>
      </Box>
      {/* GRID */}
      <TableSeizures seizureData={seizureData} colors={colors} userId={patientId} setSeizureData={setSeizureData} />
    </Box>
  );
};

export default DoctorSeizures;
