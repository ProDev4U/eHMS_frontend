import { useEffect, useState } from "react";
import { Box, Typography, useTheme, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, Avatar } from "@mui/material";
import { tokens } from "../../../theme";
import Header from "../../../components/Header";
import StatBox from "../../../components/StatBox";
import PeopleOutlineOutlinedIcon from '@mui/icons-material/PeopleOutlineOutlined';
import HotelOutlinedIcon from '@mui/icons-material/HotelOutlined';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import SocialDistanceOutlinedIcon from '@mui/icons-material/SocialDistanceOutlined';
// API Calls
import { getDashboardUsersInfo, getUpcomingAppointments } from "../../../services/dashboardService";
import formatDateString from '../../../services/utilService';

const AdminDashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [cntAllUsers, setCntAllUsers] = useState(0);
  const [cntDoctors, setCntDoctors] = useState(0);
  const [patients, setPatients] = useState([]);
  const [newRegisters, setNewRegisters] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getDashboardUsersInfo();
        setCntAllUsers(tmp_data.cntAllUsers);
        setCntDoctors(tmp_data.cntDoctors);
        setPatients(tmp_data.patients);
        setNewRegisters(tmp_data.newRegisters);
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
    fetchUpcomingAppointments();
  }, []);

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header title="Admin Dashboard" subtitle="Have a Nice Day!" />
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
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={cntDoctors}
            subtitle="All Doctors"
            progress={cntDoctors / cntAllUsers}
            increase={`${(cntDoctors / cntAllUsers * 100).toFixed(1)} %`}
            icon={
              <PeopleOutlineOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={patients.length}
            subtitle="All Patients"
            progress={patients.length / cntAllUsers}
            increase={`${(patients.length / cntAllUsers * 100).toFixed(1)} %`}
            icon={
              <HotelOutlinedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={newRegisters.length}
            subtitle="New Registrations"
            progress={newRegisters.length / cntAllUsers}
            increase={`${(newRegisters.length / cntAllUsers * 100).toFixed(1)} %`}
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </Box>
        <Box
          gridColumn="span 3"
          backgroundColor={colors.primary[400]}
          display="flex"
          alignItems="center"
          justifyContent="center"
        >
          <StatBox
            title={appointments.length}
            subtitle="Upcoming Appointments"
            progress=""
            increase={`+ ${appointments.length}`}
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
          gridRow="span 4"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 1050 }} aria-label="upcoming appointments table">
              <TableHead>
                <TableRow sx={{ backgroundColor: colors.primary[400] }}>
                  <TableCell align="left">Doctor</TableCell>
                  <TableCell align="left">Doctor Email</TableCell>
                  <TableCell align="left">Patient</TableCell>
                  <TableCell align="left">Patient Email</TableCell>
                  <TableCell align="left">Date</TableCell>
                  <TableCell align="left">Time</TableCell>
                  <TableCell align="left">Topic</TableCell>
                  <TableCell align="left">Notes</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {appointments.map((appointment) => (
                  <TableRow
                    key={appointment.id}
                    sx={{ backgroundColor: colors.primary[400] }}
                  >
                    <TableCell align="left">{appointment.doctorName}</TableCell>
                    <TableCell align="left">{appointment.doctorEmail}</TableCell>
                    <TableCell align="left">{appointment.patientName}</TableCell>
                    <TableCell align="left">{appointment.patientEmail}</TableCell>
                    <TableCell align="left">{appointment.date}</TableCell>
                    <TableCell align="left">{appointment.from_time}</TableCell>
                    <TableCell align="left">{appointment.topic}</TableCell>
                    <TableCell align="left">{appointment.notes}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <caption style={{ captionSide: "top", color: colors.greenAccent[500], fontWeight: "bold", textAlign: "center", padding: "10px" }}> 
                Upcoming Appointments
              </caption>
            </Table>
          </TableContainer>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 520 }} aria-label="patients table">
              <TableHead>
                <TableRow sx={{ backgroundColor: colors.primary[400] }}>
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
                    sx={{ backgroundColor: colors.primary[400] }}
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
              <caption style={{ captionSide: "top", color: colors.greenAccent[500], fontWeight: "bold", textAlign: "center", padding: "10px" }}> 
                All Patients
              </caption>
            </Table>
          </TableContainer>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          overflow="auto"
        >
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 520 }} aria-label="new registrations table">
              <TableHead>
                <TableRow sx={{ backgroundColor: colors.primary[400] }}>
                  <TableCell></TableCell>
                  <TableCell align="left">Full Name</TableCell>
                  <TableCell align="left">Email</TableCell>
                  <TableCell align="left">Phone</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {newRegisters.map((newRegister) => (
                  <TableRow
                    key={newRegister.id}
                    sx={{ backgroundColor: colors.primary[400] }}
                  >
                    <TableCell>
                      <Avatar alt={newRegister.name} src={newRegister.avatar} />
                    </TableCell>
                    <TableCell align="left">{newRegister.name}</TableCell>
                    <TableCell align="left">{newRegister.email}</TableCell>
                    <TableCell align="left">{newRegister.phoneNumber}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
              <caption style={{ captionSide: "top", color: colors.greenAccent[500], fontWeight: "bold", textAlign: "center", padding: "10px" }}> 
                New Registrations
              </caption>
            </Table>
          </TableContainer>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminDashboard;
