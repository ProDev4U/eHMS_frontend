import { useEffect, useState, useContext } from "react";
import { tokens } from "../../../theme";
import { useTheme, Box } from "@mui/material";
import { AuthContext } from "../../../contexts/AuthContext";
// Components
import Header from "../../../components/Header";
import { TableAppointmentsWithPatientActions } from "./TableAppointments";
import LoadingComponent from "../../../components/LoadingComponent";
// API Calls
import { getAppontmentsByPatientId } from "../../../services/appointmentService";
import { getAllDoctors } from "../../../services/userService";
import { getRelationsByPatientId } from "../../../services/relationService";

const PatientAppointment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);

  const [appointmentData, setAppointmentData] = useState([]);
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchAllDoctors = async () => {
      try {
        const tmp_data = await getRelationsByPatientId(user.id);
        setDoctors(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const fetchData = async () => {
      try {
        const tmp_data = await getAppontmentsByPatientId(user.id);
        setAppointmentData(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    
    fetchAllDoctors();
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Appointment"
        subtitle="List of Contacts for Future Reference"
      />
      {/* GRID */}
      <TableAppointmentsWithPatientActions appointmentData={appointmentData} colors={colors} setAppointmentData={setAppointmentData} userId={user.id} doctors={doctors} />
    </Box>
  );
};

export default PatientAppointment;
