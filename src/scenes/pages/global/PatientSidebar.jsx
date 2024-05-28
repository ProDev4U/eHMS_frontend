import { useState, useContext } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../../../theme";
import { AuthContext } from "../../../contexts/AuthContext";

import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PersonPinCircleOutlinedIcon from '@mui/icons-material/PersonPinCircleOutlined';
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import AddTaskOutlinedIcon from '@mui/icons-material/AddTaskOutlined';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import MedicationLiquidOutlinedIcon from '@mui/icons-material/MedicationLiquidOutlined';
import BloodtypeOutlined from "@mui/icons-material/BloodtypeOutlined";
import BookOnlineOutlined from "@mui/icons-material/BookOnlineOutlined";
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined';
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import Logo from "../../../assets/logo.png";
import Nick from "../../../assets/img/avatar/defualt_patient.png";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const PatientSidebar = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const colors = tokens(theme.palette.mode);
  const avatarSrc = user.avatar ? '/img/avatar/'+user.avatar : Nick;
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");

  return (
    <Box
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <img
                  alt="logo"
                  width="50px"
                  height="50px"
                  src={Logo}
                />
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={avatarSrc}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h2"
                  color={colors.grey[100]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user.firstName} {user.lastName}
                </Typography>
                <Typography variant="h5" color={colors.greenAccent[500]}>
                  Patient
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title="Dashboard"
              to="/patient/dashboard"
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Patient
            </Typography>
            <Item
              title="Profile"
              to="/patient/profile"
              icon={<PersonPinCircleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Doctors"
              to="/patient/relation"
              icon={<AddTaskOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Seizures"
              to="/patient/seizures"
              icon={<HealingOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Medications"
              to="/patient/medications"
              icon={<MedicationLiquidOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Checkups"
              to="/patient/checkups"
              icon={<BloodtypeOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Appointments
            </Typography>
            <Item
              title="Lists"
              to="/patient/appointment"
              icon={<BookOnlineOutlined />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Schedule"
              to="/patient/schedule"
              icon={<CalendarMonthOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Chat
            </Typography>
            <Item
              title="Chat"
              to="/patient/chat"
              icon={<ChatOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default PatientSidebar;
