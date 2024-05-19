import { useState } from "react";
import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Dialog, DialogTitle,DialogContent, DialogActions,  DialogContentText, Button, TextField } from "@mui/material";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { GridActionsCellItem } from '@mui/x-data-grid';
import { ToastContainer, toast } from 'react-toastify';
// Components
import { TableColumnUser } from "./TableColumnUser";
// API Calls
import { updateUserById, deleteUserById } from "../../../services/userService";

export const TableUser = ({ data, setData, colors }) => {
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [editedItem, setEditedItem] = useState({});
    const [isEditDialog, setIsEditDialog] = useState(false);
    const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);

    const handleEditClick = (id) =>  {
        setSelectedItemId(id);
        setEditedItem(data.find((item) => item.id === id));
        setIsEditDialog(true);
    }
    
    const handleEditChange = (e) => {
        const {name, value} = e.target;
        setEditedItem({...editedItem, [name]: value});
    }

    const SaveEditDialog = async () => {
        onSave(selectedItemId, editedItem);
        setIsEditDialog(false);
    };
    
    const onSave = async (id, data) => {
        data.firstName = data.name.split(' ')[0];
        data.lastName = data.name.split(' ')[1];
        delete data.name;   
        delete data.control;
        try {
            const res = await updateUserById(id, data);
            if(res.status === 200){
                toast.success("Saved successfully.");
                // Update editedItem in data
                setData(data.map(item => {
                    if (item.id === id) {
                        return { ...item, ...data }; // Merge edited data into the item
                    }
                    return item;
                }));
            } else {
                toast.warning("Save Failed.");
            }
        } catch (error) {
                console.error("Server Error:", error);
                toast.error("Server Error");
        }
    };

    const handleDeleteClick = (id)  => {
        setSelectedItemId(id);
        setIsDeleteConfirm(true);
    };

    const AgreeDeleteConfirm  = () => {
        setIsDeleteConfirm(false);
        onDelete(selectedItemId)
    };  

    const onDelete = async (id) => {
        try {
            const res = await deleteUserById(id);
            if(res.status === 200){
                toast.success("Deteled successfully.");
                setData(data.filter((item) => item.id !== id));
            } else {
                toast.warning("Delete Failed.");
            }
        } catch (error) {
              console.error("Server Error:", error);
              toast.error("Server Error");
        }
    }

    return ( 
        <Box
            m="40px 0 0 0"
            height="75vh"
            sx={{
            "& .MuiDataGrid-root": {
                border: "none",
            },
            "& .MuiDataGrid-cell": {
                borderBottom: "none",
            },
            "& .name-column--cell": {
                color: colors.greenAccent[300],
            },
            "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
            },
            "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
            },
            "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
            },
            }}
        >
            <DataGrid 
            rows={data}
            columns={TableColumnUser.map((column) =>
                column.field === "actions"
                ? {
                    ...column,
                    getActions: ({ id }) => [
                        <GridActionsCellItem
                            icon={<EditOutlinedIcon />}
                            label="Edit"
                            className="textPrimary"
                            onClick={() => handleEditClick(id)}
                            color="inherit"
                        />,
                        <GridActionsCellItem
                            icon={<DeleteForeverOutlinedIcon />}
                            label="Delete"
                            onClick={() => handleDeleteClick(id)}
                            color="inherit"
                        />,
                    ],   
                    }
                : column
            )}
            components={{ Toolbar: GridToolbar }} />
            <Dialog
                open={isEditDialog}
                onClose={() => setIsEditDialog(false)}
                aria-labelledby="edit-dialog-title"
                aria-describedby="edit-dialog-description"
            >
                <DialogTitle id="edit-dialog-title">
                    {"Edit User Data"}
                </DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        name="name"
                        label="Full Name"
                        fullWidth
                        value={editedItem.name}
                        onChange={handleEditChange}
                        className="name-column--cell"
                    />
                    <TextField
                        margin="dense"
                        name="email"
                        label="Email"
                        fullWidth
                        value={editedItem.email}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="gender"
                        label="Gender"
                        fullWidth
                        value={editedItem.gender}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="age"
                        label="Age"
                        fullWidth
                        value={editedItem.age}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="phoneNumber"
                        label="Phone Number"
                        fullWidth
                        value={editedItem.phoneNumber}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="postalCode"
                        label="Post Code"
                        fullWidth
                        value={editedItem.postalCode}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="address"
                        label="Address"
                        fullWidth
                        value={editedItem.address}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="role"
                        label="Role"
                        fullWidth
                        value={editedItem.role}
                        onChange={handleEditChange}
                    />
                    <TextField
                        margin="dense"
                        name="permission"
                        label="Permission"
                        fullWidth
                        value={editedItem.permission}
                        onChange={handleEditChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setIsEditDialog(false)}>Cancel</Button>
                    <Button onClick={() => SaveEditDialog()} autoFocus>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog
                open={isDeleteConfirm}
                onClose={() => setIsDeleteConfirm(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                {"Confirm Delete"}
                </DialogTitle>
                <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Are you sure you want to delete this item?
                </DialogContentText>
                </DialogContent>
                <DialogActions>
                <Button onClick={() => setIsDeleteConfirm(false)}>Disagree</Button>
                <Button onClick={() => AgreeDeleteConfirm()} autoFocus>
                    Agree
                </Button>
                </DialogActions>
            </Dialog>
            <ToastContainer autoClose={3000} />
        </Box>
    );
};
