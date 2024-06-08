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
import { getMessagesBetweenUsers, sendMessage, editMessageById, deleteMessageById } from "../../../services/messageService";
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

  const fetchAllUsers = useCallback(async () => {
    try {
      const tmp_data = await getAllUsers();
      const filteredUsers = tmp_data.filter(u => u.id !== user.id);
      setUsers(filteredUsers);
      if (contactedUsers.length === 0 && filteredUsers.length > 0) {
        setChatUserId(filteredUsers[0].id);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [contactedUsers.length, user.id]);

  const fetchContactedUsers = useCallback(async () => {
    try {
      const tmp_data = await getContactedUsers(user.id);
      setContactedUsers(tmp_data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, [user.id]);

  useEffect(() => {
    const newSocket = io("http://localhost:5000"); // Your backend URL
    setSocket(newSocket);

    newSocket.on("newMessage", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    newSocket.on("editMessage", (message) => {
      setMessages((prevMessages) =>
        prevMessages.map((msg) => (msg.id === message.id ? { ...msg, content: message.content } : msg))
      );
    });

    newSocket.on("deleteMessage", (id) => {
      setMessages((prevMessages) => prevMessages.filter((msg) => msg.id !== id));
    });

    return () => {
      newSocket.disconnect();
    };
  }, []);

  useEffect(() => {
    fetchAllUsers();
    fetchContactedUsers();
  }, [fetchAllUsers, fetchContactedUsers]);

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
  }, [chatUserId, user.id]);

  const handleMessageSend = async () => {
    if (!messageInput.trim()) return;
    try {
      const data = {
        toUserId: chatUserId,
        fromUserId: user.id,
        content: messageInput,
        date: new Date().toISOString(),
      };
      await sendMessage(data);
      socket.emit("newMessage", data); // Send new message via socket
      setMessageInput("");
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <Box m="20px">
      <Header title="ChatRoom" subtitle="send message to your doctor" />
      <Box height="75vh" borderRadius="4px" sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <UserList users={users} contactedUsers={contactedUsers} chatUserId={chatUserId} setChatUserId={setChatUserId} colors={colors} />
          </Grid>
          <Grid item xs={9}>
            <ChatBox messages={messages} editMessageById={editMessageById} deleteMessageById={deleteMessageById} user={user} socket={socket} colors={colors} avatar={user.avatar} />
            <Stack direction="row" spacing={2}>
              <TextField
                label="Type your message"
                variant="outlined"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                fullWidth
              />
              <Button variant="contained" color="primary" endIcon={<SendIcon />} onClick={handleMessageSend}>
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
