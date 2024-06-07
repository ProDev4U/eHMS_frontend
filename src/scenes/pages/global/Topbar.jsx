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
import AssignmentIcon from '@mui/icons-material/Assignment';
import { green, pink } from '@mui/material/colors';
import { setAuthToken } from "../../../services/setAuthToken";
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import ChatBubbleOutlineOutlinedIcon from '@mui/icons-material/ChatBubbleOutlineOutlined';
import ResetPasswordDialog from '../../auth/resetPassword/ResetPassword';
// API Calls
import { getUnreadMessages } from "../../../services/messageService";
import { getAppointmentsByUserId } from "../../../services/appointmentService";
import { Link } from 'react-router-dom';

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const { logout } = useAuth();
  const [dlgOpen, setDlgOpen] = useState(false);
  const [unreadMessages, setUnreadMessages] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  const [anchorEl, setAnchorEl] = useState(null);
  const [anchorElMessages, setAnchorElMessages] = useState(null);
  const [anchorElNotifications, setAnchorElNotifications] = useState(null);

  const [searchQuery, setSearchQuery] = useState('');

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
      try {
        const events = await getAppointmentsByUserId(user.id); // Replace with your actual API call
        setUpcomingEvents(events);
        console.log(events);
      } catch (error) {
        console.error("Error fetching upcoming events:", error);
      }
    };

    // Initial fetch
    fetchUnreadMessages();
    fetchUpcomingEvents();

    // Fetch every minute
    const interval = setInterval(() => {
      fetchUnreadMessages();
      fetchUpcomingEvents();
    }, 60000); // 60000 milliseconds = 1 minute

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
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

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const removeHighlights = () => {
    const highlightedElements = document.querySelectorAll('mark.highlight');
    highlightedElements.forEach(element => {
      const parent = element.parentNode;
      parent.replaceChild(document.createTextNode(element.textContent), element);
      parent.normalize();
    });
  };

  const highlightMatches = (query) => {
    removeHighlights();
    if (!query) return;

    const textNodes = [];
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    let node;

    while (node = walker.nextNode()) {
      textNodes.push(node);
    }

    textNodes.forEach(node => {
      const parentNode = node.parentNode;
      const text = node.nodeValue;
      const regex = new RegExp(`(${query})`, 'gi');
      if (text.match(regex)) {
        const newNode = document.createElement('span');
        newNode.innerHTML = text.replace(regex, '<mark class="highlight">$1</mark>');
        parentNode.replaceChild(newNode, node);
      }
    });
  };

  const handleSearch = () => {
    highlightMatches(searchQuery);
  };

  return (
    <Box display="flex" justifyContent="space-between" p={2}>
      {/* SEARCH BAR */}
      <Box display="flex" backgroundColor={colors.primary[400]} borderRadius="3px">
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" value={searchQuery} onChange={handleSearchChange} />
        <IconButton type="button" sx={{ p: 1 }} onClick={handleSearch}>
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
          {upcomingEvents.slice(0, 7).map((event, index) => (
            <MenuItem key={index} onClick={() => handleNotificationsMenuClose()}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: green[500] }}>
                    <AssignmentIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary={event.topic} secondary={event.date + event.from_time} />
              </ListItem>
            </MenuItem>
          ))}
          {upcomingEvents.length > 7 && (
            <MenuItem>
              More...
            </MenuItem>
          )}
          
          <MenuItem component={Link} to={`/${user.role}/appointment`} onClick={handleMessagesMenuClose}>
            View All
          </MenuItem>
        </Menu>
        <IconButton onClick={handleMessagesMenuOpen}>
          <Badge badgeContent={unreadMessages.length} color="secondary">
            <ChatBubbleOutlineOutlinedIcon color="action" />
          </Badge>
        </IconButton>
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
          {unreadMessages.slice(0, 7).map((message, index) => (
            <MenuItem key={index} onClick={() => handleMessagesMenuClose()}>
              <ListItem>
                <ListItemAvatar>
                  <Avatar alt={message.userName} src={message.avatar} />
                </ListItemAvatar>
                <ListItemText primary={message.userName} secondary={message.content.length > 10 ? message.content.substring(0, 10) + " ..." : message.content} />
              </ListItem>
            </MenuItem>
          ))}
          {unreadMessages.length > 7 && (
            <MenuItem sx={{ textAlign: "center" }}>
              More ...
            </MenuItem>
          )}
          <MenuItem component={Link} to={`/${user.role}/chat`} onClick={handleMessagesMenuClose}>
            View All
          </MenuItem>
        </Menu>
      </Box>
      <ResetPasswordDialog open={dlgOpen} onClose={handleClose} />
    </Box>
  );
};

export default Topbar;
