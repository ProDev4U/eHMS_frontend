import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, Button, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
import { mockTransactions } from "../../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import SocialDistanceOutlinedIcon from '@mui/icons-material/SocialDistanceOutlined';
import TrafficIcon from "@mui/icons-material/Traffic";
import Header from "../../../components/Header";
import TextField from "@mui/material/TextField";
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import StatBox from "../../../components/StatBox";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
// API Calls
import { getDashboardUsersInfo, getUpcomingAppointments, getPatientsByDoctorId } from "../../../services/dashboardService";

const DoctorDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const [cntAllUsers, setCntAllUsers] = useState(0);
  const [patients, setPatients] = useState([]);
  const [newRegisters, setNewRegisters] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getDashboardUsersInfo();
       setCntAllUsers(tmp_data.cntAllUsers);
       setNewRegisters(tmp_data.newRegisters);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    const  fetchPatients = async () => {
      try {
        const tmp_data = await getPatientsByDoctorId(user.id);
        setPatients(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    const fetchUpcomingAppointments = async () => {
      try {
        const tmp_data = await getUpcomingAppointments();
        setAppointments(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
    fetchPatients();
    fetchUpcomingAppointments();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Doctor Dashboard" subtitle="Have a Nice Day!" />
      </Box>

      {/* GRID */} 
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ROW 1 */}
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={patients.length}
            subtitle="My Patients"
            progress={patients.length / cntAllUsers}
            increase={`${(patients.length / cntAllUsers * 100).toFixed(1)} %`}
            icon={
              <PeopleOutlineOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newRegisters.length}
            subtitle="New Patients"
            progress={newRegisters.length / cntAllUsers}
            increase={`${(newRegisters.length / cntAllUsers * 100).toFixed(1)} %`}
            icon={
              <PeopleOutlineOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 4"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={appointments.filter((item) => item.doctorEmail === user.email).length}
            subtitle="Upcoming Appointments"
            progress=""
            increase={`+ ${appointments.filter((item) => item.doctorEmail === user.email).length}`}
            icon={
              <SocialDistanceOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>

        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          height="60vh"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <TableContainer component={Paper}>
            <Table sx={{ width: 1050 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="left">Patient</TableCell>
                  <TableCell align="left">Patient Email</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="left">Topic</TableCell>
                  <TableCell align="left">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.filter((item) => item.doctorEmail === user.email).map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell align="left">{appointment.patientName}</TableCell>
                    <TableCell align="left">{appointment.patientEmail}</TableCell>
                    <TableCell align="left">{appointment.date}</TableCell>
                    <TableCell align="left">{appointment.from_time}</TableCell>
                    <TableCell align="left">{appointment.topic}</TableCell>
                    <TableCell align="left">{appointment.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box
          gridColumn="span 4"          
          height="60vh"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <TableContainer component={Paper}>
            <Table sx={{ width: 520 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell></TableCell>
                  <TableCell align="left">Full Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {patients.map((patient) => (
                  <TableRow
                    key={patient.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell>
                      <Avatar alt={patient.name} src={patient.avatar} />
                    </TableCell>
                    <TableCell align="left">{patient.name}</TableCell>
                    <TableCell align="left">{patient.email}</TableCell>
                    <TableCell align="left">{patient.phoneNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default DoctorDashboard;
