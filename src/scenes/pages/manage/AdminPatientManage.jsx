import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
// Components
import Header from "../../../components/Header";
import { TableUser } from "./TableUser";
import LoadingComponent from "../../../components/LoadingComponent";
// API Calls
import { getAllPatients } from "../../../services/userService";

const AdminPatientManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getAllPatients();
        console.log(tmp_data);
        setData(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="Patient Manage" subtitle="List of patients" />
      <TableUser data={data} setData={setData} colors={colors} />
    </Box>
  );
};

export default AdminPatientManage;
