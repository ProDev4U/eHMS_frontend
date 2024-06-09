import React from "react";
import PropTypes from 'prop-types';
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
// List Components
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

const UserList = ({ users, setChatUserId, colors }) => {
  const theme = useTheme();

  const handleListItemClick = (userId) => {
    setChatUserId(userId);
  };

  return (
    <Box backgroundColor={colors.primary[400]}>
      <Box sx={{ height: '78vh', overflow: 'auto' }}>
        <List sx={{ width: '100%', maxWidth: 360 }}>
          {users && users.map((user) => (
            <ListItem key={user.id} onClick={() => handleListItemClick(user.id)}>
              <ListItemAvatar>
                <Avatar src={user.avatar} />
              </ListItemAvatar>
              <ListItemText primary={user.name} secondary={user.email} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

UserList.propTypes = {
  users: PropTypes.array.isRequired,
  chatUserId: PropTypes.string,
  setChatUserId: PropTypes.func.isRequired,
  colors: PropTypes.object.isRequired,
};

export default UserList;
