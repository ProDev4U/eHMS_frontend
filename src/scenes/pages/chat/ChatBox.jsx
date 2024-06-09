import React, { useState, useRef, useEffect } from "react";
import { Box, List, ListItem, ListItemText, ListItemAvatar, Avatar, TextField, IconButton } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import PendingOutlinedIcon from '@mui/icons-material/PendingOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// import { editMessageById, deleteMessageById } from "../../../services/messageService";

const ChatBox = ({ messages, user, socket, colors, updateMessageStatus }) => {
    const [editMode, setEditMode] = useState(null); // Track which message is in edit mode
    const [editedContent, setEditedContent] = useState(""); // Track edited message content
    const [selectedMessage, setSelectedMessage] = useState(null); // Track selected message
    const editFieldRef = useRef(null); // Reference to the edit field

    useEffect(() => {
        // Event listener for clicks outside the edit field
        const handleClickOutside = (event) => {
            if (editFieldRef.current && !editFieldRef.current.contains(event.target)) {
                setEditMode(null);
                setSelectedMessage(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // const handleEditClick = (message) => {
    //     setEditMode(message.id);
    //     setEditedContent(message.content);
    //     setSelectedMessage(message.id);
    // };

    // const handleSaveEdit = async () => {
    //     try {
    //         const res = await editMessageById(editMode, editedContent);
    //         console.log(res); // Log response
    //         if (res.status === 200) {
    //             socket.emit('editMessage', { id: editMode, content: editedContent });
    //             toast.success("Message edited successfully");
    //             setEditMode(null);
    //             setSelectedMessage(null);
    //         } else {
    //             toast.warning("Sorry. Your action didn't work. \nTry again.");
    //         }
    //     } catch (error) {
    //         console.error(error); // Log error
    //         toast.error("Failed to edit message");
    //     }
    // };
    
    // const handleDeleteClick = async (id) => {
    //     console.log(id);
    //     try {
    //         const res = await deleteMessageById(id);
    //         console.log(res); // Log response
    //         if (res.status === 200) {
    //             toast.success("Message deleted successfully");
    //             socket.emit('deleteMessage', id);
    //             setSelectedMessage(null);
    //         } else {
    //             toast.warning("Sorry. Your action didn't work. \nTry again.");
    //         }
    //     } catch (error) {
    //         console.error(error); // Log error
    //         toast.error("Failed to delete message");
    //     }
    // };

    // const handleEditChange = (e) => {
    //     setEditedContent(e.target.value);
    // };

    const handleUnreadClick = async (message) => {
        if (message.state === 0 && !isSentMessage(message)) {
            try {
                await updateMessageStatus(message.id, { state: 1 });
                socket.emit('updateMessageStatus', { id: message.id, state: 1 });
                messages.map((item) => {
                    if (item.id === message.id) {
                        item.state = 1;
                    }
                    return item;
                });
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
                        sx={{ padding: '8px 16px' }}
                        onClick={() => handleUnreadClick(message)} // Handle unread click
                    >
                        {isSentMessage(message) ? (
                            <Box 
                                sx={{ display: 'flex', alignItems: 'center', width: '100%' }}
                                // onClick={() => handleEditClick(message)} // Enable editing on click
                            >
                                <ListItemAvatar sx={{ marginRight: '8px' }}>
                                    <Avatar src={message.userAvatar} />
                                </ListItemAvatar>
                                {editMode === message.id ? (
                                    <TextField
                                        value={editedContent}
                                        // onChange={handleEditChange}
                                        autoFocus
                                        sx={{ flexGrow: 1 }}
                                        ref={editFieldRef} // Reference for detecting outside clicks
                                    />
                                ) : (
                                    <ListItemText
                                        primary={message.userName}
                                        secondary={message.content}
                                        sx={{ textAlign: 'left', flexGrow: 1 }}
                                    />
                                )}
                                {/* {selectedMessage === message.id && (
                                    <Box sx={{ marginLeft: '8px' }}>
                                        {editMode === message.id ? (
                                            <IconButton onClick={handleSaveEdit}>
                                                <DoneIcon />
                                            </IconButton>
                                        ) : (
                                            <IconButton onClick={() => handleEditClick(message)}>
                                                <EditIcon />
                                            </IconButton>
                                        )}
                                        <IconButton onClick={() => handleDeleteClick(message.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                )} */}
                            </Box>
                        ) : (
                            <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'flex-end' }}>
                                <ListItemText
                                    primary={message.userName}
                                    secondary={message.content}
                                    sx={{ textAlign: 'right', flexGrow: 1 }}
                                />
                                <ListItemAvatar sx={{ marginLeft: '20px' }}>
                                    <Avatar src={message.userAvatar} />
                                </ListItemAvatar>
                                {message.state === 0 && (
                                    <IconButton onClick={() => handleUnreadClick(message)}>
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
