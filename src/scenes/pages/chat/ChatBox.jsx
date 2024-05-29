import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';
import IconButton from '@mui/material/IconButton';

const ChatBox = ({ messages, editMessageById, deleteMessageById, userId, socket }) => {
    const [editMode, setEditMode] = useState(null); // Track which message is in edit mode
    const [editedContent, setEditedContent] = useState(""); // Track edited message content
    const [selectedMessage, setSelectedMessage] = useState(null); // Track selected message

    const handleEditClick = (message) => {
        setEditMode(message.id);
        setEditedContent(message.content);
        setSelectedMessage(message.id);
    };

    const handleSaveEdit = async () => {
        await editMessageById(editMode, editedContent);
        socket.emit('editMessage', { id: editMode, content: editedContent }); // Send edited message via socket
        setEditMode(null);
        setSelectedMessage(null);
    };

    const handleDeleteClick = async (id) => {
        await deleteMessageById(id);
        socket.emit('deleteMessage', id); // Send delete message via socket
        setSelectedMessage(null);
    };

    const handleEditChange = (e) => {
        setEditedContent(e.target.value);
    };

    const isSentMessage = (message) => message.fromUserId === userId;

    const sortedMessages = messages.sort((a, b) => new Date(a.date) - new Date(b.date));

    return (
        <List>
            {sortedMessages.map((message) => (
                <ListItem
                    alignItems="flex-start"
                    key={message.id}
                    onClick={() => setSelectedMessage(message.id)}
                >
                    {isSentMessage(message) ? (
                        <>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            {editMode === message.id ? (
                                <TextField
                                    value={editedContent}
                                    onChange={handleEditChange}
                                    fullWidth
                                />
                            ) : (
                                <ListItemText
                                    primary={message.userName}
                                    secondary={message.content}
                                    style={{ textAlign: 'left' }}
                                />
                            )}
                        </>
                    ) : (
                        <>
                            {editMode === message.id ? (
                                <TextField
                                    value={editedContent}
                                    onChange={handleEditChange}
                                    fullWidth
                                />
                            ) : (
                                <ListItemText
                                    primary={message.userName}
                                    secondary={message.content}
                                    style={{ textAlign: 'right' }}
                                />
                            )}
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                        </>
                    )}
                    {selectedMessage === message.id && isSentMessage(message) && (
                        <div>
                            <IconButton onClick={() => handleEditClick(message)}>
                                {editMode === message.id ? <DoneIcon onClick={handleSaveEdit} /> : <EditIcon />}
                            </IconButton>
                            <IconButton onClick={() => handleDeleteClick(message.id)}>
                                <DeleteIcon />
                            </IconButton>
                        </div>
                    )}
                </ListItem>
            ))}
        </List>
    );
};

export default ChatBox;
