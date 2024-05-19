import React from "react";
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
// Tabs Components
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
// List Components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 2 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const UserList = ({users, contactedUsers, chatUserId, setChatUserId}) => {
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const handleListItemClick = (userId) => {
    setChatUserId(userId);
  };

  return (
    <Box sx={{ bgcolor: 'background.paper' }}>
        <AppBar position="static">
            <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="success"
                textColor="inherit"
                variant="fullWidth"
                aria-label="User List Tabs"
            >
                <Tab label="Global" {...a11yProps(0)} />
                <Tab label="Private" {...a11yProps(1)} />
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={value}
            onChangeIndex={handleChangeIndex}
        >
            <TabPanel value={value} index={0} dir={theme.direction}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {users && users?.map((user) => (
                    <ListItem key={user.id} onClick={() => handleListItemClick(user.id)}>
                        <ListItemAvatar>
                            <Avatar src="/broken-image.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary={user.name} secondary={user.email} />
                    </ListItem>
                ))}
                </List>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                {contactedUsers && contactedUsers?.map((contactedUser) => (
                    <ListItem key={contactedUser.id} onClick={() => handleListItemClick(contactedUser.id)}>
                        <ListItemAvatar>
                            <Avatar src="/broken-image.jpg" />
                        </ListItemAvatar>
                        <ListItemText primary={contactedUser.firstName + " " + contactedUser.lastName} secondary={contactedUser.email} />
                    </ListItem>
                ))}
                </List>
            </TabPanel>
        </SwipeableViews>
    </Box>
  );
};

export default UserList;
