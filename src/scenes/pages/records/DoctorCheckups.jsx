import { useState, useEffect, useContext } from "react";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, MenuItem, FormControl, InputLabel, Select, Button, useTheme } from "@mui/material";
// Components
import Header from "../../../components/Header";
import LoadingComponent from "../../../components/LoadingComponent";
import { TableCheckups } from "./TableCheckups";
// Call API to fetch seizure data
import { getCheckupsByPatientId } from "../../../services/checkupService";
import { getRelationsByDoctorId } from "../../../services/relationService";

const DoctorCheckups = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const [checkupData, setCheckupData] = useState([]);
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
          const tmp_data = await getCheckupsByPatientId(patientId);
          setCheckupData(tmp_data);
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
          <Header title="Checkup Records" subtitle="List of checkups for your patient" />
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
                    <MenuItem key={item.pat} value={item.patientId}>
                      {item.name}
                    </MenuItem>
                  ))
                }
              </Select>
            </FormControl>
          </Box>
        </Box>
        {/* GRID */}
        <TableCheckups checkupData={checkupData} colors={colors} setCheckupData={setCheckupData} userId={patientId} />
    </Box>
  );
};

export default DoctorCheckups;
