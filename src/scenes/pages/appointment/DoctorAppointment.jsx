import { useEffect, useState, useContext } from "react";
import { useTheme, Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";
// Components
import Header from "../../../components/Header";
// API Calls
import { getAppontmentsByDoctorId } from "../../../services/appointmentService";

const columns = [
  {
    field: "patientName",
    headerName: "Patient Name",
    flex: 1,
    cellClassName: "name-column--cell",
  },
  {
    field: "email",
    headerName: "Email",
    type: "number",
    headerAlign: "left",
    align: "left",
  },
  {
    field: "date",
    headerName: "Date",
    flex: 1,
  },
  {
    field: "from_time",
    headerName: "Start Time",
    flex: 1,
  },
  {
    field: "end_time",
    headerName: "End Time",
    flex: 1,
  },
  {
    field: "topic",
    headerName: "Topic",
    flex: 1,
  },
  {
    field: "notes",
    headerName: "Notes",
    flex: 1,
  },
  {
    field: "state",
    headerName: "State",
    flex: 1,
  },
];

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
      <Box
        m="40px 0 0 0"
        height="75vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={data}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
        />
      </Box>
    </Box>
  );
};

export default DoctorAppointment;
