import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
// Components
import Header from "../../../components/Header";
import { TableUser } from "./TableUser";
// API Calls
import { getAllDoctors } from "../../../services/userService";

const AdminDoctorManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getAllDoctors();
        setData(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Doctor Manage" subtitle="List of Doctors" />
      <TableUser data={data} setData={setData} colors={colors} />
    </Box>
  );
};

export default AdminDoctorManage;
