import { useState, useEffect, useContext } from "react";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, useTheme } from "@mui/material";
// Components
import Header from "../../../components/Header";
import LoadingComponent from "../../../components/LoadingComponent";
// Call API to fetch seizure data
import { getMedicationByPatientId } from "../../../services/medicationService";
import { TableMedicationsWithActions } from "./TableMedications";

const PatientMedications = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const [medicationData, setMedicineData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const tmp_data = await getMedicationByPatientId(user.id);
          setMedicineData(tmp_data);
      } catch (error) {
          console.error("Error fetching seizure data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
        <Header
        title="Medication Records"
        subtitle="List of medications for your treatment"
        />

        {/* GRID */}
        {medicationData.length ? (
          <TableMedicationsWithActions medicationData={medicationData} colors={colors} setMedicationData={setMedicineData} userId={user.id} />
        ) : (
          <LoadingComponent />
        )}
    </Box>
  );
};

export default PatientMedications;
