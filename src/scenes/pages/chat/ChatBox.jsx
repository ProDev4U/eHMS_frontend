import React, { useState } from "react";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import ImageIcon from '@mui/icons-material/Image';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import DoneIcon from '@mui/icons-material/Done';

const ChatBox = ({ messages, editMessageById, deleteMessageById, userId }) => {
    console.log(messages);
    const [editMode, setEditMode] = useState(null); // Track which message is in edit mode
    const [editedContent, setEditedContent] = useState(""); // Track edited message content
    const [selectedMessage, setSelectedMessage] = useState(null); // Track selected message for editing/deleting

    const handleEditClick = (message) => {
        setSelectedMessage(message.id); // Select the clicked message
        setEditMode(message.id);
        setEditedContent(message.content);
    };

    const handleSaveEdit = () => {
        editMessageById(editMode, editedContent);
        setEditMode(null);
        setSelectedMessage(null); // Deselect the message after editing
    };

    const handleDeleteClick = (id) => {
        deleteMessageById(id);
    };

    const handleEditChange = (e) => {
        setEditedContent(e.target.value);
    };

    const isSentMessage = (message) => message.fromUserId === userId;

    return (
        <List>
            {messages.map((message) => (
                <ListItem alignItems="flex-start" key={message.id} onClick={() => setSelectedMessage(message.id)}>
                    {isSentMessage(message) ? (
                        <>
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={message.userName}
                                secondary={message.content}
                                style={{ textAlign: 'left' }}
                            />
                        </>
                    ) : (
                        <>
                            <ListItemText
                                primary={message.userName}
                                secondary={message.content}
                                style={{ textAlign: 'right' }}
                            />
                            <ListItemAvatar>
                                <Avatar>
                                    <ImageIcon />
                                </Avatar>
                            </ListItemAvatar>
                        </>
                    )}
                    {selectedMessage === message.id && isSentMessage(message) && (
                        <div>
                            <EditIcon onClick={() => handleEditClick(message)} />
                            <DeleteIcon onClick={() => handleDeleteClick(message.id)} />
                        </div>
                    )}
                </ListItem>
            ))}
        </List>
    );
};

export default ChatBox;
