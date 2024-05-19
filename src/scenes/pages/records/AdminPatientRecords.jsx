import React, { useState, useEffect, useContext } from "react";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, Typography, Tabs, Tab, useTheme, MenuItem, FormControl, InputLabel, Select } from "@mui/material";
import PropTypes from 'prop-types';
// Components
import Header from "../../../components/Header";
import { TableSeizures } from "./TableSeizures";
import { TableMedications } from "./TableMedications";
import { TableCheckups } from "./TableCheckups";
import LoadingComponent from "../../../components/LoadingComponent";
// Call API to fetch seizure data
import { getAllPatients } from "../../../services/userService";
import { getSeizuresByPatientId } from "../../../services/seizureService";
import { getMedicationByPatientId } from "../../../services/medicationService";
import { getCheckupsByPatientId } from "../../../services/checkupService";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const AdminPatientRecords = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const [selectedTab, setSelectedTab] = useState(0);
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState();
  const [seizureData, setSeizureData] = useState([]);
  const [medicationData, setMedicationData] = useState([]);
  const [checkupData, setCheckupData] = useState([]);

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
    const fetchSeizureData = async () => {
      try {
        const tmp_data = await getSeizuresByPatientId(patientId);
        setSeizureData(tmp_data);
      } catch (error) {
        console.error("Error fetching seizure data:", error);
      }
    };

    const fetchMedicationData = async () => {
      try {
        const tmp_data = await getMedicationByPatientId(patientId);
        setMedicationData(tmp_data);
      } catch (error) {
        console.error("Error fetching medication data:", error);
      }
    };  

    const fetchCheckupData = async () => {
      try {
        const tmp_data = await getCheckupsByPatientId(patientId);
        setCheckupData(tmp_data);
      } catch (error) {
        console.error("Error fetching checkup data:", error); 
      }
    };
    
    fetchSeizureData(); 
    fetchMedicationData();
    fetchCheckupData();
  }, [patientId]);
  
  const handleTabChange = (event, newTab) => {
    setSelectedTab(newTab);
  };

  const handlePatientChange = (event) => {
    setPatientId(event.target.value);
  };
  
  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Patient Records" subtitle="Have a nice Day!" />
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

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="basic tabs example">
          <Tab label="Seizures" {...a11yProps(0)} />
          <Tab label="Medications" {...a11yProps(1)} />
          <Tab label="Checkups" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <CustomTabPanel value={selectedTab} index={0}>
        <TableSeizures seizureData={seizureData} colors={colors} setSeizureData={setSeizureData} userId={patientId} />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={1}>
        <TableMedications medicationData={medicationData} colors={colors} setMedicationData={setMedicationData} userId={patientId} />
      </CustomTabPanel>
      <CustomTabPanel value={selectedTab} index={2}>
        <TableCheckups checkupData={checkupData} colors={colors} setCheckupData={setCheckupData} userId={patientId} />
      </CustomTabPanel>
    </Box>
  );
};

export default AdminPatientRecords;
