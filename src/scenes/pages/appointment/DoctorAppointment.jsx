import { useEffect, useState, useContext } from "react";
import { useTheme, Box, Table } from "@mui/material";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";
// Components
import Header from "../../../components/Header";
import { TableAppointmentsWithDoctorActions } from "./TableAppointments";
// API Calls
import { getAppontmentsByDoctorId } from "../../../services/appointmentService";

const DoctorAppointment = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getAppontmentsByDoctorId(user.id);
        setData(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header
        title="Appointment"
        subtitle="List of Contacts for Future Reference"
      />
      <TableAppointmentsWithDoctorActions appointmentData={data} colors={colors} setAppointmentData={setData} />
    </Box>
  );
};

export default DoctorAppointment;
