import React, { useEffect, useState, useContext, useCallback } from "react";
import { tokens } from "../../../theme";
import { useTheme } from "@mui/material";
import { Box } from "@mui/material";
import Header from "../../../components/Header";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid';
import { AuthContext } from "../../../contexts/AuthContext";
import UserList from "./UserList";
import ChatBox from "./ChatBox";
import { getAllUsers, getContactedUsers } from "../../../services/userService";
import { getMessagesBetweenUsers, getSentMessagesBetweenUsers, getReceivedMessagesBetweenUsers, sendMessage, editMessageById, deleteMessageById } from "../../../services/messageService";
import { io } from "socket.io-client";

const ChatRoom = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { user } = useContext(AuthContext);
  const [chatUserId, setChatUserId] = useState(null);
  const [users, setUsers] = useState([]); 
  const [contactedUsers, setContactedUsers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const [socket, setSocket] = useState(null);
  // Other state variables...
  const fetchAllUsers = useCallback(async () => {
    try {
      const tmp_data = await getAllUsers();
      // Filter out the current user from the list of users
      const filteredUsers = tmp_data.filter(u => u.id !== user.id);
      setUsers(filteredUsers);
      if (contactedUsers.length === 0 && filteredUsers.length > 0) {
        // If contactedUsers is empty and there are users available, set the chatUserId to the first user
        setChatUserId(filteredUsers[0].id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [contactedUsers, user.id]);

  const fetchContactedUsers = useCallback(async () => {
    try {
      const tmp_data = await getContactedUsers(user.id);
      setContactedUsers(tmp_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [user.id]);

  useEffect(() => {
    // Establish connection to Socket.io server
    const newSocket = io("YOUR_SOCKET_IO_SERVER_URL");
    setSocket(newSocket);

    return () => {
      // Disconnect from Socket.io server when component unmounts
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    if (socket) {
      // Listen for incoming messages
      socket.on("message", (newMessage) => {
        // Update messages state with new message
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });
    }
  }, [socket]);
  

  useEffect(() => {
    fetchAllUsers();
    fetchContactedUsers();
  }, []);

  useEffect(() => {
    if (chatUserId) {
      const fetchMessages = async () => {
        try {
          const tmp_data = await getMessagesBetweenUsers(user.id, chatUserId);
          setMessages(tmp_data);
        } catch (error) {
          console.error("Error fetching messages:", error);
        }
      };
      fetchMessages();
    }
  }, [chatUserId]);

  const handleMessageSend = async () => {
    if (!messageInput.trim()) return; // Prevent sending empty messages
    try {
      const data = {
        toUserId: chatUserId,
        fromUserId: user.id,
        content: messageInput,
        date: new Date().toISOString(),
      };
      await sendMessage(data);
      // Refresh messages after sending the message
      const tmp_data = await getMessagesBetweenUsers(user.id, chatUserId);
      setMessages(prevMessages => [...prevMessages, { ...data, type: 'send' }]);
      setMessageInput(""); // Clear message input field
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box m="20px">
      <Header
        title="ChatRoom"
        subtitle="send message to your doctor"
      />
      <Box height="75vh" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <UserList users={users} contactedUsers={contactedUsers} chatUserId={chatUserId} setChatUserId={setChatUserId} />
          </Grid>
          <Grid item xs={9}>
            <ChatBox messages={messages} editMessageById={editMessageById} deleteMessageById={deleteMessageById} userId={user.id} />
            <Stack direction="row" spacing={2}>
              <TextField
                id="outlined-basic"
                color="success"
                label="Send message"
                variant="outlined"
                fullWidth
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
              />
              <Button
                variant="contained"
                color="success"
                endIcon={<SendIcon />}
                onClick={handleMessageSend}
              >
                Send
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default ChatRoom;
