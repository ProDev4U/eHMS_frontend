import { useState, useEffect, useContext } from "react";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";
import { Box, useTheme } from "@mui/material";
// Components
import Header from "../../../components/Header";
import LoadingComponent from "../../../components/LoadingComponent";
// Call API to fetch seizure data
import { getCheckupsByPatientId } from "../../../services/checkupService";
import { TableCheckupsWithActions } from "./TableCheckups";

const PaitientCheckups = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const [checkupData, setCheckupData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const tmp_data = await getCheckupsByPatientId(user.id);
          setCheckupData(tmp_data);
      } catch (error) {
          console.error("Error fetching seizure data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Box m="20px">
        <Header
        title="Checkup Records"
        subtitle="List of checkup for your treatment"
        />

        {/* GRID */}
        {checkupData.length ? (
          <TableCheckupsWithActions checkupData={checkupData} colors={colors} userId={user.id} setCheckupData={setCheckupData} />
        ) : (
          <LoadingComponent />
        )}
    </Box>
  );
};

export default PaitientCheckups;
