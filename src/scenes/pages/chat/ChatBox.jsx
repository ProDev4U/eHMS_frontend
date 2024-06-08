import React, { useState } from "react";
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import MailIcon from '@mui/icons-material/Mail';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ChatBox = ({ messages, editMessageById, deleteMessageById, user, socket, colors, updateMessageStatus }) => {
    const [editMode, setEditMode] = useState(null); // Track which message is in edit mode
    const [editedContent, setEditedContent] = useState(""); // Track edited message content
    const [selectedMessage, setSelectedMessage] = useState(null); // Track selected message

    const handleEditClick = (message) => {
        setEditMode(message.id);
        setEditedContent(message.content);
        setSelectedMessage(message.id);
    };

    const handleSaveEdit = async () => {
        try {
            await editMessageById(editMode, editedContent);
            socket.emit('editMessage', { id: editMode, content: editedContent }); // Send edited message via socket
            toast.success("Message edited successfully");
            setEditMode(null);
            setSelectedMessage(null);
        } catch (error) {
            toast.error("Failed to edit message");
        }
    };

    const handleDeleteClick = async (id) => {
        try {
            await deleteMessageById(id);
            socket.emit('deleteMessage', id); // Send delete message via socket
            toast.success("Message deleted successfully");
            setSelectedMessage(null);
        } catch (error) {
            toast.error("Failed to delete message");
        }
    };

    const handleEditChange = (e) => {
        setEditedContent(e.target.value);
    };

    const handleUnreadClick = async (message) => {
        if (message.state === 0) {
            try {
                await updateMessageStatus(message.id, { state: 1 });
                socket.emit('updateMessageStatus', { id: message.id, state: 1 });
                toast.success("Message marked as read");
            } catch (error) {
                toast.error("Failed to update message status");
            }
        }
    };

    const isSentMessage = (message) => message.fromUserId === user.id;

    const sortedMessages = messages.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <Box borderRadius="4px" backgroundColor={colors.primary[400]} sx={{ height: '69vh', overflow: 'auto', marginBottom: '25px' }}>
            <List>
                {sortedMessages.map((message) => (
                    <ListItem 
                        alignItems="flex-start" 
                        key={message.id} 
                        onClick={() => {
                            setSelectedMessage(message.id);
                            handleUnreadClick(message);
                        }}
                        sx={{ padding: '8px 16px' }}
                    >
                        {isSentMessage(message) ? (
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                                <ListItemAvatar sx={{ marginRight: '8px' }}>
                                    <Avatar src={message.avatar ? `/img/avatar/${message.avatar}` : null} />
                                </ListItemAvatar>
                                {editMode === message.id ? (
                                    <TextField
                                        value={editedContent}
                                        onChange={handleEditChange}
                                        onBlur={handleSaveEdit} // Save on blur
                                        autoFocus
                                        sx={{ flexGrow: 1 }}
                                    />
                                ) : (
                                    <ListItemText
                                        primary={message.userName}
                                        secondary={message.content}
                                        sx={{ textAlign: 'left', flexGrow: 1 }}
                                    />
                                )}
                                {selectedMessage === message.id && (
                                    <Box sx={{ marginLeft: '8px' }}>
                                        <IconButton onClick={() => handleEditClick(message)}>
                                            <EditIcon />
                                        </IconButton>
                                        <IconButton onClick={() => handleDeleteClick(message.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        {editMode === message.id && (
                                            <IconButton onClick={handleSaveEdit}>
                                                <DoneIcon />
                                            </IconButton>
                                        )}
                                    </Box>
                                )}
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
                                <ListItemText
                                    primary={message.userName}
                                    secondary={message.content}
                                    sx={{ textAlign: 'right', flexGrow: 1 }}
                                />
                                <ListItemAvatar sx={{ marginLeft: '20px' }}>
                                    <Avatar src={message.avatar ? `/img/avatar/${message.avatar}` : null} />
                                </ListItemAvatar>
                                {message.state === 0 && (
                                    <IconButton>
                                        <PendingOutlinedIcon sx={{ marginLeft: '-20px' }} style={{ color: 'red' }} />
                                    </IconButton>
                                )}
                            </Box>
                        )}
                    </ListItem>
                ))}
            </List>
            <ToastContainer autoClose={3000} />
        </Box>
    );
};

export default ChatBox;
