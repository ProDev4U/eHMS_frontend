import { useState, useEffect } from "react";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../../theme";
// Components
import Header from "../../../components/Header";
import { TableUser } from "./TableUser";
// API Calls
import { getAllNewUsers } from "../../../services/userService";

const AdminNewUserManage = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const tmp_data = await getAllNewUsers();
        setData(tmp_data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <Box m="20px">
      <Header title="New User Manage" subtitle="List of new users" />
      <TableUser data={data} setData={setData} colors={colors} />
    </Box>
  );
};

export default AdminNewUserManage;
