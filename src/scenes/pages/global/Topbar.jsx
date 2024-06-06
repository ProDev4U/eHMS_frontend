import { useContext, useState, useEffect } from "react";
import { AuthContext } from '../../../contexts/AuthContext';
import { Box, IconButton, Menu, MenuItem, useTheme, ListItem, ListItemAvatar, ListItemText, Avatar } from "@mui/material";
import { ColorModeContext, tokens } from "../../../theme";
import { useAuth } from '../../../contexts/AuthContext';
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { setAuthToken } from "../../../services/setAuthToken";
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import MailIcon from '@mui/icons-material/Mail';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ResetPasswordDialog from '../../auth/resetPassword/ResetPassword';
// API Calls
import { getUnreadMessages } from "../../../services/messageService";

// const Topbar = () => {
//   const theme = useTheme();
//   const colors = tokens(theme.palette.mode);
//   const { user } = useContext(AuthContext);
//   const colorMode = useContext(ColorModeContext);
//   const { logout } = useAuth();
//   const [dlgOpen, setDlgOpen] = useState(false);
//   const [unreadMessages, setUnreadMessages] = useState([]);
//   const [upcomingEvents, setUpcomingEvents] = useState([]);

//   const [anchorEl, setAnchorEl] = useState(null);

//   useEffect(() => {
//     const fetchUnreadMessages = async () => {
//       try {
//         const tmp_data = await getUnreadMessages(user.id);
//         setUnreadMessages(tmp_data);
//         console.log(tmp_data);
//       } catch (error) {
//         console.error("Error fetching unread messages:", error);
//       }
//     };

//     fetchUnreadMessages();
//   }, []);

//   const handleOpen = () => {
//     setDlgOpen(true);
//   };

//   const handleClose = () => {
//     setDlgOpen(false);
//   };

//   const handleMenuOpen = (event) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleMenuClose = () => {
//     setAnchorEl(null);
//   };

//   const onLogout = () => {
//     setAnchorEl(null);
//     localStorage.clear();
//     setAuthToken('');
//     logout();
//   };  

//   const onResetPassword = () => {
//     setAnchorEl(null);
//     handleOpen();
//   };

//   return (
//     <Box display="flex" justifyContent="space-between" p={2}>
//       {/* SEARCH BAR */}
//       <Box
//         display="flex"
//         backgroundColor={colors.primary[400]}
//         borderRadius="3px"
//       >
//         <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
//         <IconButton type="button" sx={{ p: 1 }}>
//           <SearchIcon />
//         </IconButton>
//       </Box>

//       {/* ICONS */}
//       <Box display="flex">
//         <IconButton onClick={colorMode.toggleColorMode}>
//           {theme.palette.mode === "dark" ? (
//             <DarkModeOutlinedIcon />
//           ) : (
//             <LightModeOutlinedIcon />
//           )}
//         </IconButton>
//         <IconButton>
//           <Badge badgeContent={4} color="secondary">
//             <NotificationsOutlinedIcon  color="action" /> 
//           </Badge>
//         </IconButton>
//         <IconButton>
//           <Badge badgeContent={unreadMessages.length} color="secondary">
//             <ChatBubbleOutlineOutlinedIcon color="action" />
//           </Badge>
//         </IconButton>
//         <IconButton  onClick={handleMenuOpen}>
//           <PersonOutlinedIcon />
//         </IconButton>
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//         >
//           <MenuItem onClick={onResetPassword}>Reset Password</MenuItem>
//           <MenuItem onClick={onLogout}>Logout</MenuItem>
//         </Menu>
//       </Box>
//       <ResetPasswordDialog open={dlgOpen} onClose={handleClose} />
//     </Box>
//   );
// };

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useAuth();
  const [dlgOpen, setDlgOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([
    {
      id: 1,
      title: "New Patient Appointment",
      start: "2023-05-01T00:00:00",
      end: "2023-05-01T00:00:00",
      allDay: true,
      state: "Pending",
      userName: "John Doe",  
      userEmail: "johndoe@gmail.com",
      userAvatar: "/img/avatar/default.png",
    }
  ]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMessages, setAnchorElMessages] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  useEffect(() => {
    const fetchUnreadMessages = async () => {
      try {
        const tmp_data = await getUnreadMessages(user.id);
        setUnreadMessages(tmp_data);
        console.log(tmp_data);
      } catch (error) {
        console.error("Error fetching unread messages:", error);
      }
    };

    const fetchUpcomingEvents = async () => {
      // try {
      //   const events = await getUpcomingEvents(user.id); // Replace with your actual API call
      //   setUpcomingEvents(events);
      // } catch (error) {
      //   console.error("Error fetching upcoming events:", error);
      // }
    };

    fetchUnreadMessages();
    fetchUpcomingEvents();
  }, [user.id]);

  const handleOpen = () => {
    setDlgOpen(true);
  };

  const handleClose = () => {
    setDlgOpen(false);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMessagesMenuOpen = (event) => {
    setAnchorElMessages(event.currentTarget);
  };

  const handleMessagesMenuClose = () => {
    setAnchorElMessages(null);
  };

  const handleNotificationsMenuOpen = (event) => {
    setAnchorElNotifications(event.currentTarget);
  };

  const handleNotificationsMenuClose = () => {
    setAnchorElNotifications(null);
  };

  const onLogout = () => {
    setAnchorEl(null);
    localStorage.clear();
    setAuthToken('');
    logout();
  };

  const onResetPassword = () => {
    setAnchorEl(null);
    handleOpen();
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === 'dark' ? <DarkModeOutlinedIcon /> : <LightModeOutlinedIcon />}
        </IconButton>
        <IconButton onClick={handleNotificationsMenuOpen}>
          <Badge badgeContent={upcomingEvents.length} color="secondary">
            <NotificationsOutlinedIcon color="action" />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorElNotifications}
          open={Boolean(anchorElNotifications)}
          onClose={handleNotificationsMenuClose}
        >
          {upcomingEvents.length === 0 ? (
            <MenuItem>No new notifications</MenuItem>
          ) : (
            upcomingEvents.map((event, index) => (
              <MenuItem key={index} onClick={() => handleNotificationsMenuClose()}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={event.userName} src={event.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={event.userName} secondary="Message" />
                </ListItem>
              </MenuItem>
            ))
          )}
        </Menu>
        <IconButton onClick={handleMessagesMenuOpen}>
          <Badge badgeContent={unreadMessages.length} color="secondary">
            <ChatBubbleOutlineOutlinedIcon color="action" />
          </Badge>
        </IconButton>
        <Menu
          anchorEl={anchorElMessages}
          open={Boolean(anchorElMessages)}
          onClose={handleMessagesMenuClose}
        >
          {unreadMessages.length === 0 ? (
            <MenuItem>No unread messages</MenuItem>
          ) : (
            unreadMessages.map((message, index) => (
              <MenuItem key={index} onClick={() => handleMessagesMenuClose()}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={message.userName} src={message.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={message.userName} secondary={message.content} />
                </ListItem>
              </MenuItem>
            ))
          )}
        </Menu>
        <IconButton onClick={handleMenuOpen}>
          <PersonOutlinedIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={onResetPassword}>Reset Password</MenuItem>
          <MenuItem onClick={onLogout}>Logout</MenuItem>
        </Menu>
        <Menu
          anchorEl={anchorElMessages}
          open={Boolean(anchorElMessages)}
          onClose={handleMessagesMenuClose}
        >
          {unreadMessages.length === 0 ? (
            <MenuItem>No unread messages</MenuItem>
          ) : (
            unreadMessages.map((message, index) => (
              <MenuItem key={index} onClick={() => handleMessagesMenuClose()}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar alt={message.userName} src={message.avatar} />
                  </ListItemAvatar>
                  <ListItemText primary={message.userName} secondary={message.content} />
                </ListItem>
              </MenuItem>
            ))
          )}
        </Menu>
      </Box>
      <ResetPasswordDialog open={dlgOpen} onClose={handleClose} />
    </Box>
  );
};

export default Topbar;
